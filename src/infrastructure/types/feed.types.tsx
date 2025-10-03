export interface FeedPost {
  _id: string;
  imagen: string;
  descripcion: string;
  fecha: string;
  likes: number;
  usuario: {
    id: string;
    userName: string;
    email: string;
  };
  createdAt?: string;
}

export interface FeedState {
  posts: FeedPost[];
  isLoading: boolean;
  error: string | null;
}
