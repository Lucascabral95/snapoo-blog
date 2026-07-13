import Usuarios from "@/models/Usuario";
import mongo from "@/services/mongoDB";

export async function getModerationUser(id: string) {
  await mongo();
  return Usuarios.findById(id).select("email userName role accountStatus").lean<{
    email: string;
    userName?: string;
    role?: "user" | "moderator" | "admin";
    accountStatus?: "active" | "suspended";
  }>();
}
