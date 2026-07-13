import { redirect } from "next/navigation";
import { getStaffUser } from "@/infrastructure/auth/session";
import Usuarios from "@/models/Usuario";
import mongo from "@/services/mongoDB";

export default async function ModerationStaffPage() {
  const staff = await getStaffUser();
  if (!staff || staff.role !== "admin") redirect("/admin/moderation/reports");
  await mongo();
  const users = await Usuarios.find().select("userName email role accountStatus").sort({ userName: 1 }).limit(200).lean();
  return <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 24px" }}><h1>Equipo de moderación</h1><ul>{users.map((user) => <li key={String(user._id)}>{user.userName || user.email} — {user.role} — {user.accountStatus}</li>)}</ul></main>;
}
