import Usuarios from "../models/Usuario";
import mongo from "@/services/mongoDB";
import bcrypt from "bcrypt";

interface IUsuarios {
  email: string;
  password?: string;
  userName?: string;
  avatar?: string;
}

class DAOUsuarios {
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

  async getAll(): Promise<IUsuarios[]> {
    try {
      await mongo();
      return await Usuarios.find();
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      throw new Error("No se pudo obtener la lista de usuarios.");
    }
  }

  async getUserByEmail(email: string): Promise<IUsuarios | null> {
    try {
      await mongo();
      return await Usuarios.findOne({ email: email });
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    }
  }

  async getUserByUserName(userName: string): Promise<IUsuarios | null> {
    try {
      await mongo();
      const usuario = await Usuarios.findOne({ userName: userName });

      if (!usuario) {
        throw { error: "El usuario no se encuentra registrado.", status: 400 };
      }

      return usuario;
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    }
  }

  async createUser(user: IUsuarios): Promise<IUsuarios> {
    try {
      if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      }

      const newUser = new Usuarios(user);
      return await newUser.save();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      throw error;
    }
  }

  async getUserByID(id: string): Promise<IUsuarios | null> {
    try {
      await mongo();
      return await Usuarios.findOne({ _id: id });
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    }
  }

  async deleteUserByID(id: string): Promise<IUsuarios | null> {
    try {
      return await Usuarios.findOneAndDelete({ _id: id });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  }
}

const daoUsuarios = new DAOUsuarios();
export default daoUsuarios;
