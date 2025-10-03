"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/infrastructure/types";
import { getPostById } from "@/infrastructure/services/post.service";

interface UsePostDetailReturn {
  post: Post | null;
  isLoading: boolean;
  error: boolean;
}

export function usePostDetail(id: string): UsePostDetailReturn {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const data = await getPostById(id);
        setPost(data);
        setIsLoading(false);
      } catch (err) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { post, isLoading, error };
}
