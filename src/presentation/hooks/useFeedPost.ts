'use client';

import { useEffect, useState } from 'react';
import type { FeedPost } from '@/infrastructure/types';
import { getFeedPosts } from '@/infrastructure/services/feed.service';

interface UseFeedPostsReturn {
    posts: FeedPost[];
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useFeedPosts(): UseFeedPostsReturn {
    const [posts, setPosts] = useState<FeedPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getFeedPosts();
            setPosts(data);
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Error al cargar las publicaciones';
            setError(errorMessage);
            console.error('Error in useFeedPosts:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return {
        posts,
        isLoading,
        error,
        refetch: fetchPosts,
    };
}
