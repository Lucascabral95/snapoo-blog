import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

interface UseImagenProps { id: string; likes: number; }
export default function useVistaImagen({ id, likes }: UseImagenProps) {
  const { data: session } = useSession();
  const [isReposting, setIsReposting] = useState(false); const [isLiking, setIsLiking] = useState(false); const [likeCount, setLikeCount] = useState(likes); const [hasLiked, setHasLiked] = useState(false);
  useEffect(() => { axios.get(`/api/posteos?id=${id}`).then((r) => { setHasLiked(Boolean(r.data.liked)); setLikeCount(r.data.result?.likes ?? likes); }).catch(() => undefined); }, [id, likes]);
  const repostear = async () => { if (isReposting) return; setIsReposting(true); try { await axios.post("/api/intereses", { rePosteos: id, user: session?.user?.id }); toast.success("¡Reposteado exitosamente!"); } catch { toast.error("No se pudo repostear"); } finally { setIsReposting(false); } };
  const darLike = async () => { if (isLiking) return; setIsLiking(true); try { const response = hasLiked ? await axios.patch(`/api/posteos?id=${id}`) : await axios.put(`/api/posteos?id=${id}`); setHasLiked(Boolean(response.data.liked)); setLikeCount(response.data.result?.likes ?? likeCount); } catch { toast.error("No se pudo actualizar el like"); } finally { setIsLiking(false); } };
  return { repostear, darLike, likeCount, hasLiked, isReposting, isLiking };
}
