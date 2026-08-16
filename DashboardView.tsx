import React from 'react';
import { 
  Users, 
  UserMinus, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Lock, 
  HelpCircle,
  ExternalLink,
  RefreshCw,
  Info
} from 'lucide-react';
import ApiLimitationsBanner from './ApiLimitationsBanner';
import { ServerStatus } from '../types';

interface DashboardViewProps {
  status: ServerStatus;
  selectedCount: number;
  onConnect: () => void;
  onNavigate: (tabId: string) => void;
  isLoading: boolean;
  onReset: () => void;
}

export default function DashboardView({
  status,
  selectedCount,
  onConnect,
  onNavigate,
  isLoading,
  onReset
}: DashboardViewProps) {
  const { connected, account, unfollowedToday, successfulActions, failedActions } = status;

  return (
    <div id="dashboard-view-container" className="space-y-6">
      <ApiLimitationsBanner />

      {/* Main hero connection section (if not connected) */}
      {!connected ? (
        <div id="not-connected-hero" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center max-w-3xl mx-auto shadow-sm">
          <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-md shadow-pink-500/15">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            Securely Connect Your Instagram Account
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
            Manage your follower lists and audit unfollow sequences under strict Meta API safety compliance. We never ask for, nor store your password.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="dashboard-connect-btn"
              onClick={onConnect}
              disabled={isLoading}
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-md shadow-purple-500/10 flex items-center gap-2"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <span>Connect Instagram API</span>
            </button>
            <button
              id="sandbox-help-btn"
              onClick={() => onNavigate('help')}
              className="px-6 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Setup Instructions</span>
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Lock className="h-3 w-3" />
              Ultimate API Security Architecture
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-500">
              <div className="flex items-start gap-2">
                <div className="text-purple-500 font-bold">01</div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block">No Password Stored</span>
                  Direct authentication occurs strictly within secure Meta servers.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-purple-500 font-bold">02</div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block">Token Isolation</span>
                  Access tokens reside strictly server-side and never leak to the browser.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-purple-500 font-bold">03</div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block">Maximum Compliance</span>
                  Immutable batch caps at 50 requests prevents any automated spam behavior.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Dashboard View when Connected */
        <div id="connected-dashboard-grid" className="space-y-6">
          {/* Quick Header Welcome Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={account?.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={account?.username}
                  className="h-16 w-16 rounded-full object-cover border-2 border-purple-500"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    {account?.displayName}
                    <span className="text-xs font-normal text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> Verified Sandbox
                    </span>
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">@{account?.username}</p>
                  <p className="text-xs text-slate-400 mt-1">Connected Session: Meta Graph API Authorized</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-stretch md:self-auto">
                <button
                  id="dashboard-manage-btn"
                  onClick={() => onNavigate('following')}
                  className="flex-1 md:flex-none px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Users className="h-4 w-4" />
                  <span>Manage Following</span>
                </button>
                <button
                  id="dashboard-reset-btn"
                  onClick={onReset}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 border border-slate-200/50 dark:border-slate-700/50"
                  title="Reset application simulation data"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden sm:inline">Reset Sandbox</span>
                </button>
              </div>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Stat 1 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Following</span>
                <div className="p-2 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-800 dark:text-white">
                  {account?.followingCount?.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400">accounts</span>
              </div>
              <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-purple-500" />
                <span>Audited followings list ready</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Selected Batch</span>
                <div className="p-2 bg-pink-50 dark:bg-pink-950/20 text-pink-600 dark:text-pink-400 rounded-lg">
                  <UserMinus className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold ${selectedCount === 50 ? 'text-amber-500' : 'text-slate-800 dark:text-white'}`}>
                  {selectedCount} <span className="text-lg text-slate-400">/ 50</span>
                </span>
              </div>
              <div className="mt-3 text-xs text-slate-500">
                {selectedCount === 50 ? (
                  <span className="text-amber-500 font-medium">Batch limit of 50 is full.</span>
                ) : (
                  <span>Selected accounts waiting for unfollow</span>
                )}
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Unfollowed Today</span>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                  <Activity className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-800 dark:text-white">{unfollowedToday}</span>
                <span className="text-xs text-slate-400">accounts</span>
              </div>
              <div className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Actions logged securely</span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions Status</span>
                <div className="p-2 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Activity className="h-5 w-5" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>Successful Actions</span>
                  <span className="font-bold text-emerald-600">{successfulActions}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>Failed Actions</span>
                  <span className="font-bold text-rose-500">{failedActions}</span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                Simulation error rate is currently ~8%
              </div>
            </div>
          </div>

          {/* Quick Access Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Follow Audit List
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Search, filter, and multi-select up to 50 accounts that your profile is currently connected with. You can audit accounts, view details, and prepare clean unfollow batches safely.
                </p>
              </div>
              <button
                id="dashboard-go-following-btn"
                onClick={() => onNavigate('following')}
                className="w-full py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-purple-600 dark:text-purple-400 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200/50 dark:border-slate-700/50"
              >
                <span>Audit Following List</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <UserMinus className="h-5 w-5 text-pink-500" />
                  Batch Unfollow Queue
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Ready to trigger an unfollow sequence? Check your current selected queue of {selectedCount} accounts. Confirm the process, initiate execution, and track success rate in real-time.
                </p>
              </div>
              <button
                id="dashboard-go-unfollow-btn"
                onClick={() => onNavigate('unfollow')}
                className="w-full py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-pink-600 dark:text-pink-400 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200/50 dark:border-slate-700/50"
              >
                <span>Review Unfollow Queue</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
