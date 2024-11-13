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

  async getUserByEmail(email: string): Promise<IUsuarios | null> {
    try {
      return await Usuarios.findOne({ email: email });
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    }
  }

  async getUserByUserName(userName: string): Promise<IUsuarios | null> {
    try {
      return await Usuarios.findOne({ userName: userName });
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
  

  async getAll(): Promise<IUsuarios[]> {
    try {
      return await Usuarios.find();
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      throw new Error("No se pudo obtener la lista de usuarios.");
    }
  }

  async getUserByID(id: string): Promise<IUsuarios | null> {
    try {
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
      throw error
    }
  }
}

// export default new DAOUsuarios(); 
const daoUsuarios = new DAOUsuarios();
export default daoUsuarios;
