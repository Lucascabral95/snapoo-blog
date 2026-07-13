"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { PostComment } from "@/infrastructure/types";
import { createComment, getComments } from "@/infrastructure/services/post.service";

export function useComments(postId: string) {
    const [comments, setComments] = useState<PostComment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        if (!postId) return;

        let cancelled = false;
        setIsLoading(true);

        getComments(postId).then((result) => {
            if (!cancelled) {
                setComments(result);
                setIsLoading(false);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [postId]);

    const addComment = async (contenido: string) => {
        const text = contenido.trim();
        if (!text || isPosting) return;

        setIsPosting(true);
        try {
            const comment = await createComment(postId, text);
            setComments((previous) => [...previous, comment]);
        } catch {
            toast.error("No se pudo publicar el comentario.");
        } finally {
            setIsPosting(false);
        }
    };

    return { comments, isLoading, isPosting, addComment };
}
