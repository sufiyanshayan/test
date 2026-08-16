import React from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  UserMinus, 
  History, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X,
  Instagram
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  connected: boolean;
  onDisconnect: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  connected,
  onDisconnect,
  isOpen,
  setIsOpen
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'account', label: 'Instagram Account', icon: UserCheck },
    { id: 'following', label: 'Following List', icon: Users, disabled: !connected },
    { id: 'unfollow', label: 'Unfollow Batch', icon: UserMinus, disabled: !connected },
    { id: 'activity', label: 'Activity Logs', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Setup', icon: HelpCircle },
  ];

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          id="sidebar-overlay"
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 w-64 bg-white/80 dark:bg-slate-900/90 border-r border-slate-200 dark:border-slate-800 backdrop-blur-md transform transition-transform duration-300 z-50 lg:translate-x-0 lg:static lg:h-screen lg:flex lg:flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white">
              <Instagram className="h-5 w-5" />
            </div>
            <span className="font-bold text-slate-800 dark:text-white tracking-tight">
              InstaManager
            </span>
          </div>
          <button 
            id="close-sidebar-btn"
            className="lg:hidden p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-tab-${item.id}`}
                onClick={() => !item.disabled && handleNav(item.id)}
                disabled={item.disabled}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 border-l-4 border-purple-500'
                    : item.disabled
                    ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-purple-500' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.disabled && (
                  <span className="ml-auto text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                    Locked
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Account Section */}
        {connected && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
            <button
              id="sidebar-disconnect-btn"
              onClick={onDisconnect}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/30 transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span>Disconnect API</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
