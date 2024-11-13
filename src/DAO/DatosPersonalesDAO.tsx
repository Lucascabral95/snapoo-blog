import DatosPersonales from "@/models/DatosPersonales";
import mongo from "@/services/mongoDB";
import mongoose from "mongoose";

interface IDatosPersonales {
    provincia: string;
    pais: string;
    edad: number;
    bio: string;
    nombre: string;
    apellido: string;
    user: mongoose.Schema.Types.ObjectId;
}

class DAODatosPersonales {
    constructor() {
        this.initializeDB();
    }

    async initializeDB(): Promise<void> {
        try {
            await mongo();
        } catch (error) {
            console.error("Error al conectar a la base de datos:", error);
            throw new Error("No se pudo conectar a la base de datos.");
        }
    }

    async createDatosPersonales(data: IDatosPersonales): Promise<IDatosPersonales> {
        try {
            return await DatosPersonales.create(data);
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            throw error;
        }
    }

    async getDatosPersonalesByID(id: string): Promise<IDatosPersonales | null> {
        try {
            return await DatosPersonales.findOne({ user: id });
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            throw error;
        }
    }    

    async deleteDatosPersonalesByID(id: string): Promise<IDatosPersonales | null> {
        try {
            return await DatosPersonales.findOneAndDelete({ user: id });
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            throw error;
        }
    }
}

// export default new DAODatosPersonales();
const daoDatosPersonales = new DAODatosPersonales();
export default daoDatosPersonales;