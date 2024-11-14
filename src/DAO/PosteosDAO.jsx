import mongo from "@/services/mongoDB";
import Posteos from "@/models/Posteos";

class DAOPosteos {
    constructor() {
        this.inizializeDB();
    }

    async inizializeDB() {
        try {
            await mongo();
            console.log(`MongoDB Connected`);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            await mongo(); 
            return await Posteos.find().populate("usuario");
        } catch (error) {
            console.error("Error al obtener todos los posteos:", error);
            throw error;
        }
    }

    async getPosteoByID(id) {
        try {
            await mongo();
            return await Posteos.findOne({ _id: id }).populate("usuario");
        } catch (error) {
            console.error("Error al obtener el posteo:", error);
            throw error;
        }
    }

    async createPost(data) {
        try {
            return await Posteos.create(data);
        } catch (error) {
            console.error("Error al crear el posteo:", error);
            throw error;
        }
    }

    async deletePosteoByID(id) {
        try {
            return await Posteos.findOneAndDelete({ _id: id });
        } catch (error) {
            console.error("Error al eliminar el posteo:", error);
            throw error;
        }
    }

    async filtrarPosteosPorUsuario(id) {
        try {
            const posteos = await Posteos.find().populate("usuario");
            const filtrarPosteosPorUsuario = posteos.filter((posteo) => posteo.usuario._id.toString() === id);
            return filtrarPosteosPorUsuario;
        } catch (error) {
            console.error("Error al obtener los posteos del usuario:", error);
            throw error;
        }
    }

    async likePosteo(id) {
        try {
            const posteo = await Posteos.findOneAndUpdate({ _id: id },
                { $inc: { likes: 1 } }, { new: true });
            return posteo;
        } catch (error) {
            console.error("Error al dar me gusta:", error)
            throw error;
        }
    }
}

const daoPosteos = new DAOPosteos();
export default daoPosteos;