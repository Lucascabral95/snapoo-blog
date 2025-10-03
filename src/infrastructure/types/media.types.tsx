import { Timestamps } from "./common.types";

export interface MediaContent extends Timestamps {
  id: string;
  url: string;
  type: "image" | "video" | "audio";
  caption?: string;
  description?: string;
  authorId: string;
  authorUsername: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  tags?: string[];
  metadata?: MediaMetadata;
}

export interface MediaMetadata {
  width?: number;
  height?: number;
  duration?: number;
  format?: string;
  size?: number;
}
