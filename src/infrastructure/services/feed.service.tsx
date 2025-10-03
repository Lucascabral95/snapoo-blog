import axios from "axios";
import type { FeedPost } from "@/infrastructure/types";

export async function getFeedPosts(): Promise<FeedPost[]> {
  try {
    const response = await axios.get("/api/posteo");

    if (response.status === 200 || response.status === 201) {
      const posts: FeedPost[] = response.data.result;
      // Invertir orden para mostrar los más recientes primero
      return posts.reverse();
    }

    return [];
  } catch (error: any) {
    console.error(
      "Error fetching feed posts:",
      error.response?.data?.error || error.message
    );
    throw error;
  }
}
