import React, { useState } from 'react';
import { Menu, Sun, Moon, Bell, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  title: string;
  connected: boolean;
  username?: string;
  profilePicture?: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onMenuToggle: () => void;
}

export default function Header({
  title,
  connected,
  username,
  profilePicture,
  theme,
  toggleTheme,
  onMenuToggle
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header id="app-header" className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger button */}
        <button
          id="menu-toggle-btn"
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white capitalize tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* API connection indicator pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {connected ? (
            <>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Sandbox Connected</span>
            </>
          ) : (
            <>
              <ShieldAlert className="h-4 w-4 text-slate-400" />
              <span>Offline/Disconnected</span>
            </>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>

        {/* Notification Icon */}
        <div className="relative">
          <button
            id="notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            {connected && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-pink-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            )}
          </button>
          
          {showNotifications && (
            <div id="notifications-dropdown" className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl p-4 z-50">
              <h4 className="font-semibold text-sm mb-3 border-b pb-2 text-slate-800 dark:text-slate-200">System Notifications</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto text-xs">
                {connected ? (
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-slate-700 dark:text-slate-300 border-l-4 border-emerald-500">
                    <p className="font-medium text-emerald-800 dark:text-emerald-400">Compliance Sandbox Connected</p>
                    <p className="mt-1">Instagram Graph API integration successfully loaded in safe environment.</p>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 text-slate-700 dark:text-slate-300 border-l-4 border-yellow-500">
                    <p className="font-medium text-yellow-800 dark:text-yellow-400">Sandbox Connection Required</p>
                    <p className="mt-1">Connect your developer account under settings or dashboard to access follow management tools.</p>
                  </div>
                )}
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400">
                  <p className="font-medium text-slate-800 dark:text-slate-300">Instagram Security Rules</p>
                  <p className="mt-1">Maximum batch size set permanently to 50 accounts to ensure account compliance.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar / Login status */}
        {connected && username && (
          <div id="header-user-badge" className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
            <img
              src={profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={username}
              className="h-8 w-8 rounded-full object-cover border border-purple-500/50"
              referrerPolicy="no-referrer"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-800 dark:text-white leading-tight">
                @{username}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                Connected
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
