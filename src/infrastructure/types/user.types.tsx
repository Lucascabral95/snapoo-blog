export interface Usuario {
  id: string;
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Posteo {
  id: string;
  imageUrl: string;
  description: string;
  userId: string;
  createdAt: Date;
  likes: number;
}

export interface Reposteo {
  id: string;
  posteoId: string;
  userId: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  result: T;
  error?: string;
}
