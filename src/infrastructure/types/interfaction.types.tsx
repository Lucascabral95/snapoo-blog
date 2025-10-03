import { Timestamps } from "./common.types";

export interface Interaction extends Timestamps {
  id: string;
  type: "like" | "share" | "save" | "repost" | "bookmark";
  userId: string;
  targetId: string;
  targetType: "media" | "post" | "comment" | "profile";
  metadata?: Record<string, unknown>;
}

export interface InteractionCount {
  total: number;
  byType: Record<string, number>;
}
