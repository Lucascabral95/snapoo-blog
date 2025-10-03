import { Timestamps } from "./common.types";

export interface Profile extends Timestamps {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
  verified: boolean;
  followerCount: number;
  followingCount: number;
  metadata?: Record<string, unknown>;
}

export interface ProfileResponse {
  userName: Profile;
}
