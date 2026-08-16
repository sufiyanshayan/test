export interface InstagramAccount {
  id: string;
  username: string;
  displayName: string;
  profilePicture: string;
  followingCount: number;
  followersCount: number;
}

export interface FollowingAccount {
  id: string;
  username: string;
  displayName: string;
  profilePicture: string;
  isFollowing: boolean;
  status: 'following' | 'processing' | 'unfollowed' | 'failed';
  error?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  username: string;
  action: string;
  status: 'Success' | 'Failed';
  error?: string;
}

export interface ServerStatus {
  connected: boolean;
  account: InstagramAccount | null;
  unfollowedToday: number;
  successfulActions: number;
  failedActions: number;
}
