import Usuarios from "../models/Usuario";
import mongo from "@/services/mongoDB";
import bcrypt from "bcrypt";

export interface UserRecord {
  _id?: unknown;
  email: string;
  password?: string;
  userName?: string;
  avatar?: string;
  emailVerifiedAt?: Date;
  role?: "user" | "moderator" | "admin";
  accountStatus?: "active" | "suspended";
  suspendedUntil?: Date;
  suspensionReason?: string;
}

class DAOUsuarios {
  async getAll(): Promise<UserRecord[]> {
    await mongo();
    return Usuarios.find().select("email userName avatar").lean<UserRecord[]>();
  }

  async getUserByEmail(email: string): Promise<UserRecord | null> {
    await mongo();
    return Usuarios.findOne({ email }).select("+password email userName avatar emailVerifiedAt").lean<UserRecord>();
  }

  async getUserByUserName(userName: string): Promise<UserRecord | null> {
    await mongo();
    return Usuarios.findOne({ userName }).select("email userName avatar").lean<UserRecord>();
  }

  async createUser(user: UserRecord): Promise<UserRecord> {
    await mongo();
    const data = { ...user };
    if (data.password) data.password = await bcrypt.hash(data.password, 12);
    return Usuarios.create(data);
  }

  async getUserByID(id: string): Promise<UserRecord | null> {
    await mongo();
    return Usuarios.findOne({ _id: id }).select("email userName avatar emailVerifiedAt role accountStatus suspendedUntil suspensionReason").lean<UserRecord>();
  }

  async markEmailVerified(id: string): Promise<void> {
    await mongo();
    await Usuarios.updateOne({ _id: id }, { $set: { emailVerifiedAt: new Date() } });
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await mongo();
    const passwordHash = await bcrypt.hash(password, 12);
    await Usuarios.updateOne({ _id: id }, { $set: { password: passwordHash } });
  }

  async deleteUserByID(id: string): Promise<UserRecord | null> {
    await mongo();
    return Usuarios.findOneAndDelete({ _id: id }).select("email userName avatar").lean<UserRecord>();
  }
}

const daoUsuarios = new DAOUsuarios();
export default daoUsuarios;
