import mongo from "@/services/mongoDB";
import Posteos from "@/models/Posteos";
import Usuarios from "@/models/Usuario";

class DAOPosteos {
  constructor() {
    this.inizializeDB();
  }

  async inizializeDB(): Promise<void> {
    try {
      await mongo();
      console.log(`MongoDB Connected of Posteos`);
    } catch (error) {
      console.log(error);
      throw new Error("Error al conectar con MongoDB");
    }
  }

  async getAll(): Promise<any> {
    try {
      const posteos = await Posteos.find().populate("usuario");
      return posteos;
    } catch (error) {
      console.error("Error al obtener todos los posteos:", error);
      throw error;
    }
  }

  async getPosteoByID(id: string): Promise<any> {
    try {
      const posteo = await Posteos.findOne({ _id: id }).populate("usuario");
      return posteo;
    } catch (error) {
      console.error("Error al obtener el posteo:", error);
      throw error;
    }
  }

  async getAllWithoutPopulate(): Promise<any> {
    try {
      return await Posteos.find();
    } catch (error) {
      console.error("Error al obtener todos los posteos:", error);
      throw error;
    }
  }

  async createPost(data: any): Promise<any> {
    try {
      return await Posteos.create(data);
    } catch (error) {
      console.error("Error al crear el posteo:", error);
      throw error;
    }
  }

  async deletePosteoByID(id: string): Promise<any> {
    try {
      return await Posteos.findOneAndDelete({ _id: id });
    } catch (error) {
      console.error("Error al eliminar el posteo:", error);
      throw error;
    }
  }

  async filtrarPosteosPorUsuario(id: string): Promise<any> {
    try {
      const posteos = await Posteos.find().populate("usuario");
      const filtrarPosteosPorUsuario = posteos.filter(
        (posteo) => posteo.usuario._id.toString() === id
      );
      return filtrarPosteosPorUsuario;
    } catch (error) {
      console.error("Error al obtener los posteos del usuario:", error);
      throw error;
    }
  }

  async likePosteo(id: string): Promise<any> {
    try {
      const posteo = await Posteos.findOneAndUpdate(
        { _id: id },
        { $inc: { likes: 1 } },
        { new: true }
      );
      return posteo;
    } catch (error) {
      console.error("Error al dar me gusta:", error);
      throw error;
    }
  }

  async getAllPosteosByUserNameId(userName: string): Promise<any> {
    try {
      const usuario = await Usuarios.findOne({ userName: userName });
      const posteos = (await Posteos.find()).filter(
        (posteo) => posteo.usuario._id.toString() === usuario._id.toString()
      );

      return posteos;
    } catch (error) {
      console.error("Error al obtener los posteos del usuario:", error);
      throw error;
    }
  }
}

const daoPosteos = new DAOPosteos();
export default daoPosteos;
