import axios from "axios";
import type { Post } from "@/infrastructure/types";

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const result = await axios.get(`/api/posteos?id=${id}`);

    if (result.status === 200) {
      return result.data.result;
    }

    return null;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 404 || error.response.status === 500) {
        console.log("No se encontro el posteo solicitado");
      }
    } else {
      console.log(error);
    }
    throw error;
  }
}

export async function likePost(id: string): Promise<number> {
  try {
    const result = await axios.put(`/api/posteos/?id=${id}`);

    if (result.status === 200 || result.status === 201) {
      return result.data.result.likes;
    }

    throw new Error("Error al dar like");
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data.error);
    }
    throw error;
  }
}

export async function repostPost(
  postId: string,
  userId: string
): Promise<void> {
  try {
    const result = await axios.post("/api/intereses", {
      rePosteos: postId,
      user: userId,
    });

    if (result.status !== 200) {
      throw new Error("Error al repostear");
    }
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400 || error.response.status === 404) {
        throw new Error("Ya reposteaste este posteo");
      } else {
        console.log(error.response.data.error);
        throw error;
      }
    }
    throw error;
  }
}

export function getDisplayUsername(post: Post): string {
  return post.usuario?.userName === ""
    ? post.usuario?.email
    : post.usuario?.userName;
}
