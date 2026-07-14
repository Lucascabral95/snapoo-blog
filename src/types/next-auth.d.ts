import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session { user: { id: string; userName?: string; sessionId?: string; sessionVersion?: number; reauthenticationToken?: string; } & DefaultSession["user"]; }
}
declare module "next-auth/jwt" { interface JWT { id?: string; userName?: string; sessionId?: string; sessionVersion?: number; reauthenticationToken?: string; } }
