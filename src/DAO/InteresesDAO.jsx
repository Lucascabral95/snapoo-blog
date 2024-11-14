import mongo from "@/services/mongoDB";
import Intereses from "../models/Intereses";

class DAOIntereses {
    constructor() {
        this.inizializeDB();
    }

    async inizializeDB() {
        try {
            await mongo();
        } catch (error) {
            console.log(error);
        }
    }

    async addRePosteos(repost, user) {
        try {
            const usuario = await this.getInteresesByUserID(user);

            if (!usuario) {
                const newRepost = new Intereses({ user: user, rePosteos: [repost] });
                return await newRepost.save();
            } else {
                const existeReposteo = usuario.rePosteos.some(r => r.equals(repost));
                if (existeReposteo) {
                    throw { message: "Ya reposteaste este posteo", statusCode: 400 }; 
                }

                usuario.rePosteos.push(repost);
                return await usuario.save();
            }
        } catch (error) {
            console.log("No se pudo repostear");
            throw error;
        }
    }

    async getAll() {
        try {
            return await Intereses.find().populate("user").populate("rePosteos");
        } catch (error) {
            console.error("Error al obtener todos los intereses:", error);
            throw error;
        }
    }

    async getInteresesByUserID(id) {
        try {
            return await Intereses.findOne({ user: id }).populate("user").populate("rePosteos");
        } catch (error) {
            console.error("Error al obtener el interes:", error);
            throw error;
        }
    }
}

const daoIntereses = new DAOIntereses();
export default daoIntereses;