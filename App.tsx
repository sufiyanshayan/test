import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import FollowingView from './components/FollowingView';
import UnfollowView from './components/UnfollowView';
import ActivityView from './components/ActivityView';
import SettingsView from './components/SettingsView';
import HelpView from './components/HelpView';
import { ServerStatus, FollowingAccount, ActivityLog } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Core full-stack state variables
  const [status, setStatus] = useState<ServerStatus>({
    connected: false,
    account: null,
    unfollowedToday: 0,
    successfulActions: 0,
    failedActions: 0
  });
  const [following, setFollowing] = useState<FollowingAccount[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  // 1. Theme Configuration Hook
  useEffect(() => {
    // Check local storage for preference
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = storedTheme || 'light';
    setTheme(initialTheme);
    
    const html = document.documentElement;
    if (initialTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    
    const html = document.documentElement;
    if (nextTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  // 2. Fetch server configuration data
  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (err) {
      console.error('Failed to query status endpoint:', err);
    }
  };

  const fetchFollowing = async () => {
    try {
      const res = await fetch('/api/following');
      if (res.ok) {
        const data = await res.json();
        setFollowing(data);
      } else {
        setFollowing([]);
      }
    } catch (err) {
      console.error('Failed to query following list endpoint:', err);
    }
  };

  const fetchActivity = async () => {
    try {
      const res = await fetch('/api/activity');
      if (res.ok) {
        const data = await res.json();
        setActivityLogs(data);
      }
    } catch (err) {
      console.error('Failed to query activity log endpoint:', err);
    }
  };

  // Trigger initial loaders
  useEffect(() => {
    fetchStatus();
    fetchActivity();
  }, []);

  // Sync following data whenever connection changes
  useEffect(() => {
    if (status.connected) {
      fetchFollowing();
    } else {
      setFollowing([]);
      setSelectedIds([]);
    }
  }, [status.connected]);

  // Listen for secure child window OAuth messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security Validation of source
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        fetchStatus();
        fetchActivity();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 3. Command Executions
  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth-url');
      if (!response.ok) {
        throw new Error('Server connection failure.');
      }
      const { url } = await response.json();

      // Open Meta authorization popup directly
      const authWindow = window.open(
        url,
        'instagram_oauth_popup',
        'width=600,height=700,status=yes,resizable=yes'
      );

      if (!authWindow) {
        alert('Iframe Popup Blocked. Please allow popups for this developer application.');
      }
    } catch (err) {
      console.error('OAuth URL connection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!window.confirm('Are you sure you want to disconnect this Instagram account session?')) {
      return;
    }
    try {
      const res = await fetch('/api/disconnect', { method: 'POST' });
      if (res.ok) {
        setStatus({
          connected: false,
          account: null,
          unfollowedToday: 0,
          successfulActions: 0,
          failedActions: 0
        });
        setFollowing([]);
        setSelectedIds([]);
        setActiveTab('dashboard');
        fetchActivity();
      }
    } catch (err) {
      console.error('Failed to terminate session:', err);
    }
  };

  const handleResetDemo = async () => {
    if (!window.confirm('Resetting Sandbox state will wipe all emulation logs and restore all users. Continue?')) {
      return;
    }
    try {
      const res = await fetch('/api/reset-demo', { method: 'POST' });
      if (res.ok) {
        setSelectedIds([]);
        await fetchStatus();
        await fetchFollowing();
        await fetchActivity();
        setActiveTab('dashboard');
      }
    } catch (err) {
      console.error('Reset failure:', err);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter(x => x !== id);
      } else {
        // Strict frontend constraint enforcement
        if (prev.length >= 50) {
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const handleUnfollowSuccess = () => {
    fetchStatus();
    fetchFollowing();
    fetchActivity();
  };

  // 4. Render main components
  return (
    <div id="main-layout-root" className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        connected={status.connected}
        onDisconnect={handleDisconnect}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Dynamic header navigation */}
        <Header
          title={activeTab.replace('-', ' ')}
          connected={status.connected}
          username={status.account?.username}
          profilePicture={status.account?.profilePicture}
          theme={theme}
          toggleTheme={toggleTheme}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Scrollable View Wrapper */}
        <main id="app-main-view" className="flex-1 overflow-y-auto p-6 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              status={status}
              selectedCount={selectedIds.length}
              onConnect={handleConnect}
              onNavigate={setActiveTab}
              isLoading={isLoading}
              onReset={handleResetDemo}
            />
          )}

          {activeTab === 'account' && (
            <div id="account-tab" className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-base text-slate-800 dark:text-white border-b pb-3 mb-5 border-slate-100 dark:border-slate-800">
                  Instagram Account Identity
                </h3>
                
                {status.connected && status.account ? (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-850">
                      <img
                        src={status.account.profilePicture}
                        alt={status.account.username}
                        className="h-16 w-16 rounded-full object-cover border-2 border-purple-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-center sm:text-left flex-1">
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white">
                          {status.account.displayName}
                        </h4>
                        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">@{status.account.username}</p>
                        <p className="text-xs text-slate-400 mt-1">Platform ID: {status.account.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-950/30 rounded-xl text-center border border-slate-100 dark:border-slate-850">
                        <span className="text-xs text-slate-400 block mb-1">Followers</span>
                        <span className="text-2xl font-bold text-slate-800 dark:text-white">{status.account.followersCount}</span>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-950/30 rounded-xl text-center border border-slate-100 dark:border-slate-850">
                        <span className="text-xs text-slate-400 block mb-1">Following</span>
                        <span className="text-2xl font-bold text-slate-800 dark:text-white">{status.account.followingCount}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100/50 dark:border-purple-900/30 rounded-xl text-xs text-purple-900 dark:text-purple-300">
                      <p className="font-semibold mb-1">Developer Authorization:</p>
                      <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        Your Meta App sandbox authorization has been retrieved securely. Client secrets and bearer keys reside strictly within express session stores, ensuring bulletproof privacy.
                      </p>
                    </div>

                    <button
                      id="account-disconnect-btn"
                      onClick={handleDisconnect}
                      className="w-full py-3 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-semibold text-sm rounded-xl transition-all border border-rose-100 hover:border-transparent"
                    >
                      Disconnect Instagram Account
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <p className="text-sm text-slate-500">Connect your account first to retrieve profile statistics and details.</p>
                    <button
                      id="account-connect-now-btn"
                      onClick={handleConnect}
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow"
                    >
                      Connect Instagram API
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'following' && (
            <FollowingView
              accounts={following}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onSelectAll={handleSelectAll}
              onClearSelection={handleClearSelection}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'unfollow' && (
            <UnfollowView
              accounts={following}
              selectedIds={selectedIds}
              onUnfollowSuccess={handleUnfollowSuccess}
              onClearSelection={handleClearSelection}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'activity' && (
            <ActivityView
              logs={activityLogs}
              onClearLogs={async () => {
                if (window.confirm('Wipe historical execution reports? This cleans local logs completely.')) {
                  await handleResetDemo();
                }
              }}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              status={status}
              theme={theme}
              toggleTheme={toggleTheme}
              onDisconnect={handleDisconnect}
              onReset={handleResetDemo}
            />
          )}

          {activeTab === 'help' && <HelpView />}
        </main>
      </div>
    </div>
  );
}
