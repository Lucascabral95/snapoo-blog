import mongo from "@/services/mongoDB"
import Comentarios from "@/models/Comentarios";
import mongoose from "mongoose";

interface IComentarios {
    emisor: string
    likes: number
    posteo: string
    usuario: mongoose.Schema.Types.ObjectId
    contenido: string
}

class DAOComentarios {
    constructor() {
        this.inizializeDB();
    }

    async inizializeDB(): Promise<void> {
        try {
            await mongo();
            console.log("MongoDB Connected");
        } catch (error) {
            console.log(error);
        }
    }

    async createComentario(data: IComentarios): Promise<IComentarios> {
        try {
            return await Comentarios.create(data);
        } catch (error) {
            console.error("Error al crear el comentario:", error);
            throw error;
        }
    }

    async getComentarios(post: string): Promise<IComentarios[] | null> { 
        try {
            const comentarios = await Comentarios.find({ posteo: post })
                .populate("usuario", "email avatar userName");
            return comentarios;
        } catch (error) {
            console.error("Error al obtener los comentarios:", error);
            return null;
        }
    }

    async deleteComentarioByID(id: string): Promise<IComentarios | null> {
        try {
            return await Comentarios.findOneAndDelete({ _id: id });
        } catch (error) {
            console.error("Error al eliminar el posteo:", error);
            throw error;
        }
    }
}

export default new DAOComentarios();