export interface GalleryPost {
    _id: string;
    imagen: string;
    descripcion: string;
    usuario: {
        userName: string;
        email: string;
    };
}
