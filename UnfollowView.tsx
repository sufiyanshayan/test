import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserMinus, 
  AlertTriangle, 
  Play, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  Activity
} from 'lucide-react';
import { FollowingAccount } from '../types';

interface UnfollowViewProps {
  accounts: FollowingAccount[];
  selectedIds: string[];
  onUnfollowSuccess: (results: Array<{ id: string; status: 'Success' | 'Failed' }>) => void;
  onClearSelection: () => void;
  onNavigate: (tabId: string) => void;
}

export default function UnfollowView({
  accounts,
  selectedIds,
  onUnfollowSuccess,
  onClearSelection,
  onNavigate
}: UnfollowViewProps) {
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [processingIndex, setProcessingIndex] = useState(-1);
  const [successCount, setSuccessCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  // Maintain local tracking statuses for the selected accounts during execution
  const [localStatuses, setLocalStatuses] = useState<Record<string, 'pending' | 'processing' | 'success' | 'failed'>>({});

  const selectedAccounts = accounts.filter(acc => selectedIds.includes(acc.id));

  // Limit Check
  const BATCH_LIMIT = 50;
  const isOverLimit = selectedIds.length > BATCH_LIMIT;

  // Initialize status map
  useEffect(() => {
    const map: Record<string, 'pending'> = {};
    selectedIds.forEach(id => {
      map[id] = 'pending';
    });
    setLocalStatuses(map);
  }, [selectedIds]);

  const handleStartUnfollow = () => {
    if (selectedIds.length === 0) return;
    if (isOverLimit) return;
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    setIsProcessing(true);
    setProcessingIndex(0);
    setSuccessCount(0);
    setFailedCount(0);
    setCurrentProgress(0);

    // Copy selected accounts list for sequenced emulation processing
    const total = selectedAccounts.length;
    let successful = 0;
    let failed = 0;
    const results: Array<{ id: string; status: 'Success' | 'Failed' }> = [];

    for (let i = 0; i < total; i++) {
      const currentAcc = selectedAccounts[i];
      setProcessingIndex(i);
      
      // Update state to 'processing'
      setLocalStatuses(prev => ({ ...prev, [currentAcc.id]: 'processing' }));
      
      // Simulate safe, human-like execution delay (600ms - 1500ms)
      const delay = 600 + Math.random() * 900;
      await new Promise(resolve => setTimeout(resolve, delay));

      // Emulate success or fail (approx. 90% success rate under sandbox)
      const isSuccess = Math.random() > 0.08;
      
      if (isSuccess) {
        successful++;
        setSuccessCount(successful);
        setLocalStatuses(prev => ({ ...prev, [currentAcc.id]: 'success' }));
        results.push({ id: currentAcc.id, status: 'Success' });
      } else {
        failed++;
        setFailedCount(failed);
        setLocalStatuses(prev => ({ ...prev, [currentAcc.id]: 'failed' }));
        results.push({ id: currentAcc.id, status: 'Failed' });
      }

      const percent = Math.round(((i + 1) / total) * 100);
      setCurrentProgress(percent);
    }

    // Trigger secure server endpoint update to store logs and sync state
    try {
      const res = await fetch('/api/unfollow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds })
      });
      if (res.ok) {
        onUnfollowSuccess(results);
      } else {
        console.error("Backend validation error on batch unfollow processing.");
      }
    } catch (err) {
      console.error("Failed to sync unfollow progress to backend API:", err);
    }

    setIsProcessing(false);
    setProcessingIndex(-1);
    setShowSummary(true);
  };

  const handleFinish = () => {
    onClearSelection();
    setShowSummary(false);
    onNavigate('dashboard');
  };

  if (selectedAccounts.length === 0 && !showSummary) {
    return (
      <div id="unfollow-empty-state" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-sm">
        <UserMinus className="h-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
        <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">Queue is Empty</h3>
        <p className="text-xs text-slate-500 mb-6">No accounts selected for unfollow. Go to the Following page to select accounts first.</p>
        <button
          id="navigate-following-btn"
          onClick={() => onNavigate('following')}
          className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-semibold hover:bg-purple-700 transition-all flex items-center justify-center gap-1.5 mx-auto shadow-sm"
        >
          <span>Browse Following List</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div id="unfollow-view-container" className="max-w-3xl mx-auto space-y-6">
      
      {/* 1. Batch Execution Status View */}
      {!isProcessing && !showSummary && (
        <div id="batch-queue-card" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <Users className="h-5 w-5 text-purple-500" />
              <h2 className="font-bold text-base text-slate-800 dark:text-white">Batch Unfollow Queue</h2>
            </div>
            <div className="flex items-baseline gap-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-1 rounded-lg">
              <span className="text-xs font-medium text-slate-400">Total:</span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                {selectedAccounts.length} <span className="text-xs font-normal text-slate-400">/ 50</span>
              </span>
            </div>
          </div>

          {/* Overlimit security warnings */}
          {isOverLimit && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-xl text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-500 flex-shrink-0" />
              <span>
                <strong>Limit Violation:</strong> Batch size is locked at 50 accounts max to comply with Instagram safety guidelines. Please reduce your selection.
              </span>
            </div>
          )}

          {/* Scrollable list of selected accounts */}
          <div className="max-h-72 overflow-y-auto border border-slate-100 dark:border-slate-800/80 rounded-xl divide-y divide-slate-100 dark:divide-slate-800">
            {selectedAccounts.map(account => (
              <div key={account.id} className="flex items-center justify-between p-3.5 hover:bg-slate-50/40 dark:hover:bg-slate-800/10">
                <div className="flex items-center gap-3">
                  <img
                    src={account.profilePicture}
                    alt={account.username}
                    className="h-8 w-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-white block">@{account.username}</span>
                    <span className="text-xs text-slate-400">{account.displayName}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-300" />
                  <span>Queued</span>
                </div>
              </div>
            ))}
          </div>

          <button
            id="start-unfollow-btn"
            onClick={handleStartUnfollow}
            disabled={isOverLimit || selectedAccounts.length === 0}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-semibold text-sm rounded-xl hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Play className="h-4 w-4" />
            <span>UNFOLLOW SELECTED ACCOUNTS</span>
          </button>
        </div>
      )}

      {/* 2. Real-Time Processing Simulation Card */}
      {isProcessing && (
        <div id="processing-card" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-1 animate-pulse flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 text-purple-500 animate-spin" />
              Unfollowing accounts...
            </h2>
            <p className="text-xs text-slate-500">Complying with safe API intervals. Do not close this tab.</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-500">
              <span>{processingIndex + 1} / {selectedAccounts.length} completed</span>
              <span className="text-purple-600 dark:text-purple-400">{currentProgress}%</span>
            </div>
            <div className="h-3 bg-slate-100 dark:bg-slate-850 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 transition-all duration-300 rounded-full"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>

          {/* Live Action Stats Panel */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
            <div className="text-center">
              <span className="text-xs text-slate-400 block mb-1">Successful</span>
              <span className="text-xl font-bold text-emerald-600">{successCount}</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-slate-400 block mb-1">Failed / Rate-limited</span>
              <span className="text-xl font-bold text-rose-500">{failedCount}</span>
            </div>
          </div>

          {/* Live scrolling processing list */}
          <div className="max-h-56 overflow-y-auto border border-slate-100 dark:border-slate-850 rounded-xl divide-y divide-slate-100 dark:divide-slate-850">
            {selectedAccounts.map((account, idx) => {
              const status = localStatuses[account.id];
              const isCurrent = idx === processingIndex;

              return (
                <div 
                  key={account.id} 
                  className={`flex items-center justify-between p-3 transition-colors ${
                    isCurrent ? 'bg-purple-50/40 dark:bg-purple-950/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={account.profilePicture}
                      alt={account.username}
                      className="h-7 w-7 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className={`text-xs font-semibold ${isCurrent ? 'text-purple-700 dark:text-purple-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                      @{account.username}
                    </span>
                  </div>

                  {/* Status labels */}
                  <div className="text-xs font-medium">
                    {status === 'pending' && (
                      <span className="text-slate-400">Waiting...</span>
                    )}
                    {status === 'processing' && (
                      <span className="text-purple-600 dark:text-purple-400 flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Processing...
                      </span>
                    )}
                    {status === 'success' && (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5 fill-emerald-50 dark:fill-transparent" />
                        ✓ Unfollowed
                      </span>
                    )}
                    {status === 'failed' && (
                      <span className="text-rose-500 flex items-center gap-1" title="API limit warning">
                        <XCircle className="h-3.5 w-3.5" />
                        ✕ Failed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Result Summary Card */}
      {showSummary && (
        <div id="summary-card" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto shadow-sm">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Batch Execution Summary</h2>
            <p className="text-xs text-slate-400">Actions processed securely and synchronized inside server logs</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
              <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block mb-1">Successful</span>
              <span id="summary-success-count" className="text-2xl font-bold text-emerald-600">{successCount}</span>
            </div>
            <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl text-center">
              <span className="text-[11px] font-semibold text-rose-850 dark:text-rose-400 uppercase tracking-wider block mb-1">Failed</span>
              <span id="summary-fail-count" className="text-2xl font-bold text-rose-500">{failedCount}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              id="summary-done-btn"
              onClick={handleFinish}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              Done
            </button>
            <button
              id="summary-activity-btn"
              onClick={() => onNavigate('activity')}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200/50 dark:border-slate-700/50"
            >
              <Activity className="h-4 w-4" />
              <span>View Activity Log</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Batch Confirmation Modal */}
      {showModal && (
        <div id="confirmation-modal" className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-xl text-amber-700 dark:text-amber-400 w-fit">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">Confirm Batch Execution</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Are you sure you want to unfollow these {selectedAccounts.length} selected accounts? This simulation represents compliant client-server execution.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                id="modal-cancel-btn"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                id="modal-confirm-btn"
                onClick={handleConfirm}
                className="px-4.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-lg transition-all shadow-sm shadow-rose-600/10"
              >
                Confirm Unfollow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
