import { FeedPost } from "./feed.types";

export type SearchCategory = "usuario" | "imagen";

export interface SearchFilters {
  query: string;
  category: SearchCategory;
}
