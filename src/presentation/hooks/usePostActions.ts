'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { likePost, repostPost } from '@/infrastructure/services/post.service';

interface UsePostActionsProps {
    postId: string;
    userId: string | undefined;
    initialLikes: number;
}

export function usePostActions({ postId, userId, initialLikes }: UsePostActionsProps) {
    const [likeCount, setLikeCount] = useState(initialLikes);

    const handleLike = async () => {
        try {
            const newLikeCount = await likePost(postId);
            toast.success('Like dado con exito');
            setLikeCount(newLikeCount);
        } catch (error) {
            // Error ya logueado en el servicio
        }
    };

    const handleRepost = async () => {
        if (!userId) {
            toast.error('Debes iniciar sesión para repostear');
            return;
        }

        try {
            await repostPost(postId, userId);
            toast.success('Se reposteó posteo');
        } catch (error: any) {
            toast.error(error.message || 'Error al repostear');
        }
    };

    return {
        likeCount,
        handleLike,
        handleRepost,
    };
}
