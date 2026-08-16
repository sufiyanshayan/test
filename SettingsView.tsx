import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Trash2, 
  Moon, 
  Sun, 
  Lock, 
  Globe, 
  Eye, 
  CheckCircle2, 
  ShieldAlert,
  HelpCircle,
  Activity
} from 'lucide-react';
import { ServerStatus } from '../types';

interface SettingsViewProps {
  status: ServerStatus;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onDisconnect: () => void;
  onReset: () => void;
}

export default function SettingsView({
  status,
  theme,
  toggleTheme,
  onDisconnect,
  onReset
}: SettingsViewProps) {
  const { connected, account } = status;
  const [lang, setLang] = useState('English');
  const [confirmToggle, setConfirmToggle] = useState(true);

  return (
    <div id="settings-view-container" className="max-w-3xl mx-auto space-y-6">
      
      {/* 1. Connection Status Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
          <Shield className="h-5 w-5 text-purple-500" />
          Instagram Connection Status
        </h3>

        {connected && account ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <img
                src={account.profilePicture}
                alt={account.username}
                className="h-12 w-12 rounded-full object-cover border-2 border-emerald-400"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-bold text-sm text-slate-800 dark:text-white block">
                  @{account.username}
                </span>
                <span className="text-xs text-slate-500">
                  User ID: {account.id} • Mode: Sandbox Emulator
                </span>
              </div>
            </div>
            <button
              id="settings-disconnect-btn"
              onClick={onDisconnect}
              className="px-4 py-2 bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 border border-slate-200 dark:border-slate-800 hover:border-rose-200 rounded-xl text-xs font-semibold transition-all"
            >
              Disconnect Account
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
            <div className="flex items-center gap-3 text-slate-500">
              <ShieldAlert className="h-10 w-10 text-slate-400" />
              <div>
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300 block">
                  No Instagram Account Connected
                </span>
                <span className="text-xs text-slate-400">
                  Authentication requires secure Meta Developers account keys.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Core Security & Compliance Constraints (Fixed Batch) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
          <Lock className="h-5 w-5 text-purple-500" />
          Security & Immutable Limits
        </h3>

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block">
                Batch Selection Restriction
              </span>
              <span className="text-xs text-slate-400 leading-normal block">
                Permanently locked at 50 accounts. This constraint prevents aggressive API requests, securing your account against algorithmic suspension flags.
              </span>
            </div>
            <div className="px-3 py-1 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-bold text-xs rounded-lg border border-purple-100 dark:border-purple-900/30 whitespace-nowrap">
              50 Accounts Max
            </div>
          </div>

          <div className="flex items-start justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-850">
            <div className="space-y-0.5">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block">
                Double Layer Validation
              </span>
              <span className="text-xs text-slate-400 leading-normal block">
                Enforced concurrently inside the client UI browser components and the secure server controller routes. Handlers safely block any spoofing attempts.
              </span>
            </div>
            <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-lg border border-emerald-100 dark:border-emerald-900/30 whitespace-nowrap">
              Active
            </div>
          </div>
        </div>
      </div>

      {/* 3. Theme & Localization Settings */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
          <Globe className="h-5 w-5 text-purple-500" />
          Preferences & Display
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Interface Color Scheme</label>
            <button
              id="settings-theme-toggle"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <span className="flex items-center gap-2">
                {theme === 'light' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-purple-500" />}
                {theme === 'light' ? 'Light Mode Active' : 'Dark Mode Active'}
              </span>
              <span className="text-xs text-slate-400 font-normal">Toggle theme</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Language Localization</label>
            <div className="relative">
              <select
                id="language-select"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="English">English (US)</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
                <option value="German">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Confirmation settings */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
          <Eye className="h-5 w-5 text-purple-500" />
          Auditing & Dialogs
        </h3>

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block">
              Confirm Before Unfollow
            </span>
            <span className="text-xs text-slate-400 leading-normal block">
              Require a secondary confirmation modal dialog describing batch details before releasing queue sequences to Meta servers.
            </span>
          </div>
          <button
            id="settings-confirm-toggle"
            onClick={() => setConfirmToggle(!confirmToggle)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${
              confirmToggle ? 'bg-purple-600' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${
              confirmToggle ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* 5. Privacy & Data Reset */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-rose-600 flex items-center gap-2 border-b pb-3 border-rose-100 dark:border-rose-950">
          <Trash2 className="h-5 w-5" />
          Danger Zone
        </h3>

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-sm font-semibold text-slate-755 dark:text-slate-200 block">
              Reset Application State
            </span>
            <span className="text-xs text-slate-400 leading-normal block">
              Wipes all cached data logs, clears current active authorization session, and resets standard follower list configurations.
            </span>
          </div>
          <button
            id="settings-reset-all-btn"
            onClick={onReset}
            className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-600 hover:text-white border border-rose-200 dark:border-rose-900/30 text-rose-600 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
          >
            Reset Sandbox State
          </button>
        </div>
      </div>

    </div>
  );
}
