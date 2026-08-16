import React from 'react';
import { History, CheckCircle, XCircle, Shield, AlertCircle, Trash2 } from 'lucide-react';
import { ActivityLog } from '../types';

interface ActivityViewProps {
  logs: ActivityLog[];
  onClearLogs: () => void;
}

export default function ActivityView({ logs, onClearLogs }: ActivityViewProps) {
  return (
    <div id="activity-view-container" className="space-y-6">
      
      {/* Overview/Disclaimer block */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-lg">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-800 dark:text-white">API Activity Audits</h2>
            <p className="text-xs text-slate-400">Detailed records of secure batch actions processed via the Express backend server.</p>
          </div>
        </div>

        {logs.length > 0 && (
          <button
            id="clear-logs-btn"
            onClick={onClearLogs}
            className="px-4 py-2 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-transparent hover:border-rose-200/50 dark:hover:border-rose-900/40 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Main logs table list */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {logs.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <History className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4 animate-pulse" />
            <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">No Activity Logged</p>
            <p className="text-xs text-slate-400">Successfully executed batch operations will be displayed here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/80">
                  <th className="py-4 px-5">Timestamp</th>
                  <th className="py-4 px-5">Account</th>
                  <th className="py-4 px-5">Action</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">Notes/Errors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                {logs.map((log) => (
                  <tr 
                    key={log.id} 
                    id={`log-row-${log.id}`}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors"
                  >
                    <td className="py-3.5 px-5 text-xs text-slate-500 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3.5 px-5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {log.username}
                    </td>
                    <td className="py-3.5 px-5 text-xs">
                      <span className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-medium">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-xs">
                      {log.status === 'Success' ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Success
                        </span>
                      ) : (
                        <span className="text-rose-500 font-semibold flex items-center gap-1">
                          <XCircle className="h-3.5 w-3.5" />
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-xs text-slate-500">
                      {log.error ? (
                        <span className="text-rose-400 flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {log.error}
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-1">
                          <Shield className="h-3.5 w-3.5 text-emerald-500/80" />
                          Compliant Action logged
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
