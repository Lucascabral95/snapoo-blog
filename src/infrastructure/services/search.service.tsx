import type { FeedPost, SearchCategory } from "@/infrastructure/types";
import axios from "axios";

export async function searchPostsClient(
  query: string,
  category: SearchCategory
): Promise<FeedPost[]> {
  try {
    const response = await axios.get("/api/posteos");

    if (response.status === 200 || response.status === 201) {
      const allPosts: FeedPost[] = response.data.result;

      if (!query || query.trim() === "") {
        return [];
      }

      const searchTerm = query.toLowerCase().trim();

      const filtered = allPosts.filter((post) => {
        if (category === "usuario") {
          const matchesEmail = post.usuario?.email
            ?.toLowerCase()
            .includes(searchTerm);
          const matchesUsername = post.usuario?.userName
            ?.toLowerCase()
            .includes(searchTerm);
          return matchesEmail || matchesUsername;
        } else {
          // categoria === 'imagen'
          return post.descripcion?.toLowerCase().includes(searchTerm);
        }
      });

      return filtered;
    }

    return [];
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error("Error 404:", error.response.data.error);
    } else {
      console.error("Error de servidor o red no disponible");
    }
    throw error;
  }
}
