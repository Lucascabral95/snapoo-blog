import mongo from "../services/mongoDB";
import Intereses from "../models/Intereses";

class DAOIntereses {
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
        console.log(`MongoDB Connected of Intereses`);
      } catch (error) {
        console.log(error);
        throw new Error("Error al conectar con MongoDB");
      }
    }
  }

  async addRePosteos(repost: any, user: any): Promise<any> {
    try {
      if (!this.isConnected) await this.inizializeDB();
      const usuario = await this.getInteresesByUserID(user);

      if (!usuario) {
        const newRepost = new Intereses({ user: user, rePosteos: [repost] });
        return await newRepost.save();
      } else {
        const existeReposteo = usuario.rePosteos.some(
          (r: { equals: (repost: any) => boolean }) => r.equals(repost)
        );
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
      if (!this.isConnected) await this.inizializeDB();
      // return await Intereses.find().populate("user").populate("rePosteos");
      return await Intereses.find().populate("rePosteos");
    } catch (error) {
      console.error("Error al obtener todos los intereses:", error);
      throw error;
    }
  }

  async getInteresesByUserID(id: string): Promise<any> {
    try {
      if (!this.isConnected) await this.inizializeDB();
      return await Intereses.findOne({ user: id })
        .populate("user")
        .populate("rePosteos");
    } catch (error) {
      console.error("Error al obtener el interes:", error);
      throw error;
    }
  }
}

const daoIntereses = new DAOIntereses();
export default daoIntereses;
