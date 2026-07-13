"use client";

import { useFeedPosts } from "@/presentation/hooks";
import FeedSkeleton from "./FeedSkeleton";
import FeedError from "./FeedError";
import EstructuraImagenes from "@/presentation/components/SecondaryComponents/Gallery/EstructuraImagenes";

export default function FeedContainer() {
  const { posts, isLoading, error, refetch } = useFeedPosts();

  if (isLoading) {
    return <FeedSkeleton />;
  }

  if (error) {
    return <FeedError error={error} onRetry={refetch} />;
  }

  return <EstructuraImagenes posteos={posts} />;
}
