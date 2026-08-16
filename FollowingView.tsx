import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Check, 
  Trash2, 
  SlidersHorizontal, 
  ChevronDown, 
  AlertTriangle,
  Users,
  ChevronRight,
  ShieldCheck,
  CheckSquare,
  Square
} from 'lucide-react';
import { FollowingAccount } from '../types';

interface FollowingViewProps {
  accounts: FollowingAccount[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onClearSelection: () => void;
  onNavigate: (tabId: string) => void;
}

export default function FollowingView({
  accounts,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onClearSelection,
  onNavigate
}: FollowingViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'following' | 'unfollowed'>('all');
  const [sortBy, setSortBy] = useState<'username-asc' | 'username-desc' | 'name-asc'>('username-asc');
  const [pageSize, setPageSize] = useState(15);

  const BATCH_LIMIT = 50;
  const isLimitReached = selectedIds.length >= BATCH_LIMIT;

  // Filter & Sort Logic
  const filteredAndSortedAccounts = useMemo(() => {
    let result = [...accounts];

    // Search query matching (username and display name)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        acc => acc.username.toLowerCase().includes(q) || acc.displayName.toLowerCase().includes(q)
      );
    }

    // Filter by follow status
    if (filterStatus === 'following') {
      result = result.filter(acc => acc.isFollowing);
    } else if (filterStatus === 'unfollowed') {
      result = result.filter(acc => !acc.isFollowing);
    }

    // Sort operations
    if (sortBy === 'username-asc') {
      result.sort((a, b) => a.username.localeCompare(b.username));
    } else if (sortBy === 'username-desc') {
      result.sort((a, b) => b.username.localeCompare(a.username));
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.displayName.localeCompare(b.displayName));
    }

    return result;
  }, [accounts, searchQuery, filterStatus, sortBy]);

  // Paginated/Limited display
  const displayedAccounts = useMemo(() => {
    return filteredAndSortedAccounts.slice(0, pageSize);
  }, [filteredAndSortedAccounts, pageSize]);

  const hasMore = filteredAndSortedAccounts.length > pageSize;

  // Select first 50 available accounts following limit
  const handleSelectAllFiltered = () => {
    // Only select currently following accounts
    const selectables = filteredAndSortedAccounts
      .filter(acc => acc.isFollowing)
      .map(acc => acc.id);

    // Limit to remaining available slot or max 50
    const finalSelection = selectables.slice(0, BATCH_LIMIT);
    onSelectAll(finalSelection);
  };

  return (
    <div id="following-view-container" className="space-y-6">
      
      {/* Search and Filters panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="search-input"
              type="text"
              placeholder="Search by username or display name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-800 dark:text-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
              <select
                id="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="bg-transparent border-none text-xs font-semibold text-slate-600 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="all">All Accounts</option>
                <option value="following">Currently Following</option>
                <option value="unfollowed">Audited/Unfollowed</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl">
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border-none text-xs font-semibold text-slate-600 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="username-asc">Username A-Z</option>
                <option value="username-desc">Username Z-A</option>
                <option value="name-asc">Display Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action controls for selecting and bulk handling */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <button
              id="select-all-btn"
              onClick={handleSelectAllFiltered}
              className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1.5"
            >
              <span>Select All (Max 50)</span>
            </button>
            <button
              id="clear-selection-btn"
              onClick={onClearSelection}
              disabled={selectedIds.length === 0}
              className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 disabled:opacity-40 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Selection</span>
            </button>
          </div>

          {/* Core Batch Limit Dashboard */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-1.5 rounded-xl">
              <span className="text-xs font-medium text-slate-400">Selected:</span>
              <span id="selected-counter" className={`text-sm font-bold ${isLimitReached ? 'text-amber-500' : 'text-purple-600 dark:text-purple-400'}`}>
                {selectedIds.length} <span className="text-xs font-normal text-slate-400">/ 50</span>
              </span>
            </div>

            <button
              id="view-unfollow-batch-btn"
              onClick={() => onNavigate('unfollow')}
              disabled={selectedIds.length === 0}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-xs rounded-xl disabled:opacity-50 transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Process Batch</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Warning Toast/Banner inside Follow list if limit is reached */}
        {isLimitReached && (
          <div id="selection-limit-warning" className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2 animate-pulse">
            <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
            <span>
              <strong>Maximum 50 accounts can be selected per batch.</strong> All other checkboxes have been disabled to secure your account.
            </span>
          </div>
        )}
      </div>

      {/* Main Grid displaying followers */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {filteredAndSortedAccounts.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">No Accounts Found</p>
            <p className="text-xs text-slate-400">Try adjusting your search queries or filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {displayedAccounts.map((account) => {
              const isSelected = selectedIds.includes(account.id);
              const isDisabled = !isSelected && isLimitReached;
              const canFollowToggle = account.isFollowing;

              return (
                <div
                  key={account.id}
                  id={`account-row-${account.username}`}
                  className={`flex items-center justify-between p-4 transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/20 ${
                    isSelected ? 'bg-purple-50/20 dark:bg-purple-950/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Secure Batch Checkbox */}
                    <button
                      id={`checkbox-${account.username}`}
                      disabled={isDisabled || !canFollowToggle}
                      onClick={() => onToggleSelect(account.id)}
                      className={`h-5 w-5 rounded flex items-center justify-center transition-all focus:outline-none ${
                        isSelected 
                          ? 'bg-purple-600 text-white border-transparent' 
                          : !canFollowToggle
                          ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-30'
                          : isDisabled
                          ? 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 cursor-not-allowed text-slate-300'
                          : 'border border-slate-300 dark:border-slate-700 hover:border-purple-400 bg-white dark:bg-slate-950'
                      }`}
                      title={isDisabled ? "Limit reached (50 / 50)" : "Toggle Select"}
                    >
                      {isSelected ? (
                        <Check className="h-3.5 w-3.5 stroke-[3px]" />
                      ) : !canFollowToggle ? (
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                      ) : null}
                    </button>

                    <img
                      src={account.profilePicture}
                      alt={account.username}
                      className="h-10 w-10 rounded-full object-cover border border-slate-100 dark:border-slate-800"
                      referrerPolicy="no-referrer"
                    />

                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                        @{account.username}
                      </p>
                      <p className="text-xs text-slate-500">{account.displayName}</p>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div>
                    {account.isFollowing ? (
                      <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/30 px-2.5 py-1 rounded-full">
                        Following
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                        Unfollowed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Control */}
        {hasMore && (
          <div className="p-4 bg-slate-50/50 dark:bg-slate-950/20 text-center border-t border-slate-100 dark:border-slate-800">
            <button
              id="load-more-btn"
              onClick={() => setPageSize(prev => prev + 15)}
              className="px-6 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
            >
              Load More Accounts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
