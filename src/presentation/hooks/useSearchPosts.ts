'use client';

import { useEffect, useState } from 'react';
import type { FeedPost } from '@/infrastructure/types';
import { searchPostsClient } from '@/infrastructure/services';

interface UseSearchPostsOptions {
    query: string;
    category: 'usuario' | 'imagen';
}

export function useSearchPosts({ query, category }: UseSearchPostsOptions) {
    const [posts, setPosts] = useState<FeedPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!query || query.trim() === '') {
                setPosts([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const results = await searchPostsClient(query, category);
                setPosts(results);
            } catch (err) {
                console.error('Error searching posts:', err);
                setError('Error al buscar publicaciones');
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [query, category]);

    return { posts, isLoading, error };
}
