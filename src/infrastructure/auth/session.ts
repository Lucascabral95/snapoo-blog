import "server-only";

import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import UsuarioDAO from "@/DAO/UsuarioDAO";
import { authOptions } from "./options";
import { getBootstrapAdminEmail } from "@/infrastructure/moderation/config";
import Usuarios from "@/models/Usuario";
import mongo from "@/services/mongoDB";
import { recordSessionActivity, validateUserSession } from "@/infrastructure/account/security";

export interface AuthenticatedUser { id: string; userName?: string; email?: string | null; role: "user" | "moderator" | "admin"; accountStatus: "active" | "suspended" | "deactivated"; sessionId?: string; sessionVersion?: number; }

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !(await validateUserSession(session.user.id, session.user.sessionId, session.user.sessionVersion))) return null;
  const user = await UsuarioDAO.getUserByID(session.user.id);
  if (!user || (user.sessionVersion || 1) !== session.user.sessionVersion) return null;
  await recordSessionActivity(session.user.id, session.user.sessionId, await headers());
  const bootstrapEmail = getBootstrapAdminEmail();
  const isBootstrapAdmin = bootstrapEmail === user.email.toLowerCase();
  if (isBootstrapAdmin && user.role !== "admin") { await mongo(); await Usuarios.updateOne({ _id: session.user.id }, { $set: { role: "admin" } }); }
  return { id: session.user.id, userName: user.userName, email: user.email, role: isBootstrapAdmin ? "admin" : user.role || "user", accountStatus: user.accountStatus || "active", sessionId: session.user.sessionId, sessionVersion: session.user.sessionVersion };
}
export async function getActiveAuthenticatedUser(): Promise<AuthenticatedUser | null> { const user = await getAuthenticatedUser(); return user?.accountStatus === "active" ? user : null; }
export async function getStaffUser(): Promise<AuthenticatedUser | null> { const user = await getActiveAuthenticatedUser(); return user && (user.role === "admin" || user.role === "moderator") ? user : null; }
