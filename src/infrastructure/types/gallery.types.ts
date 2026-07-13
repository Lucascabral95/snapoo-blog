export interface GalleryPost {
    _id: string;
    imagen: string;
    descripcion: string;
    likes?: number;
    usuario: {
        userName: string;
        email: string;
    };
}
