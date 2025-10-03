import React, { useState } from 'react'
import { useSession } from "next-auth/react";
import axios from 'axios';
import toast from 'react-hot-toast';

interface VistaImagenProps {
    url: string;
    descripcion: string;
    fecha: string;
    likes: number;
    usuario: string;
    id: string;
    username: string;
    loadingSkeleton: boolean;
}

interface IUser {
    user: {
        id: string;
        email: string;
        userName: string;
    };
}

interface UseImagenProps {
    id: string;
    likes: number;
}

function useVistaImagen({ id, likes }: UseImagenProps) {
    const { data: session } = useSession() as { data: IUser | null };
    const [isReposting, setIsReposting] = useState<boolean>(false);
    const [isLiking, setIsLiking] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(likes);
    const [hasLiked, setHasLiked] = useState<boolean>(false);

    const repostear = async () => {
        if (isReposting) return;

        setIsReposting(true);
        try {
            const result = await axios.post(`/api/intereses`, {
                rePosteos: id,
                user: session?.user?.id,
            });

            if (result.status === 200) {
                toast.success("¡Reposteado exitosamente!", {
                    icon: "🔄",
                    style: {
                        borderRadius: "12px",
                        background: "#333",
                        color: "#fff",
                    },
                });
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 404) {
                    toast.error("Ya reposteaste este posteo", {
                        style: {
                            borderRadius: "12px",
                            background: "#333",
                            color: "#fff",
                        },
                    });
                } else {
                    console.error(error.response.data.error);
                }
            }
        } finally {
            setIsReposting(false);
        }
    };

    const darLike = async () => {
        if (isLiking) return;

        setIsLiking(true);
        const previousLikeCount = likeCount;
        const previousHasLiked = hasLiked;

        setHasLiked(!hasLiked);
        setLikeCount(hasLiked ? likeCount - 1 : likeCount + 1);

        try {
            const result = await axios.put(`/api/posteos/?id=${id}`);

            if (result.status === 200 || result.status === 201) {
                setLikeCount(result.data.result.likes);
            }
        } catch (error: any) {
            setHasLiked(previousHasLiked);
            setLikeCount(previousLikeCount);

            toast.error("Error al dar like", {
                style: {
                    borderRadius: "12px",
                    background: "#333",
                    color: "#fff",
                },
            });
            console.error(error.response?.data?.error);
        } finally {
            setIsLiking(false);
        }
    };

    return {
        repostear,
        darLike,
        likeCount,
        hasLiked,
        isReposting,
        isLiking
    }
}

export default useVistaImagen