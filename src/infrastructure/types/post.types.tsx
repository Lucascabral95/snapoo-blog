export interface Post {
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
}

export interface PostDetailProps {
  id: string;
  url: string;
  likes: number;
  descripcion: string;
  fecha: string;
  usuario: string;
  username: string;
  loadingSkeleton: boolean;
}
