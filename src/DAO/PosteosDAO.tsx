import mongo from "@/services/mongoDB";
import Posteos from "@/models/Posteos";

class DAOPosteos {
    private isConnected: boolean;

    constructor() {
        this.isConnected = false;
        this.inizializeDB();
    }

    async inizializeDB(): Promise<void> {
        if (!this.isConnected) {
            try {
                await mongo(); 
                this.isConnected = true; 
                console.log(`MongoDB Connected of Posteos`);
            } catch (error) {
                console.log(error);
                throw new Error('Error al conectar con MongoDB');
            }
        }
    }

    async getAll(): Promise<any> {
        try {
            if (!this.isConnected) await this.inizializeDB(); 
            return await Posteos.find().populate("usuario");
        } catch (error) {
            console.error("Error al obtener todos los posteos:", error);
            throw error;
        }
    }

    async getPosteoByID(id: string): Promise<any> {
        try {
            if (!this.isConnected) await this.inizializeDB(); 
            return await Posteos.findOne({ _id: id }).populate("usuario");
        } catch (error) {
            console.error("Error al obtener el posteo:", error);
            throw error;
        }
    }

    async createPost(data: any): Promise<any> {
        try {
            if (!this.isConnected) await this.inizializeDB(); 
            return await Posteos.create(data);
        } catch (error) {
            console.error("Error al crear el posteo:", error);
            throw error;
        }
    }

    async deletePosteoByID(id: string): Promise<any> {
        try {
            if (!this.isConnected) await this.inizializeDB(); 
            return await Posteos.findOneAndDelete({ _id: id });
        } catch (error) {
            console.error("Error al eliminar el posteo:", error);
            throw error;
        }
    }

    async filtrarPosteosPorUsuario(id: string): Promise<any> {
        try {
            if (!this.isConnected) await this.inizializeDB(); 
            const posteos = await Posteos.find().populate("usuario");
            const filtrarPosteosPorUsuario = posteos.filter((posteo) => posteo.usuario._id.toString() === id);
            return filtrarPosteosPorUsuario;
        } catch (error) {
            console.error("Error al obtener los posteos del usuario:", error);
            throw error;
        }
    }

    async likePosteo(id: string): Promise<any> {
        try {
            if (!this.isConnected) await this.inizializeDB(); 
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