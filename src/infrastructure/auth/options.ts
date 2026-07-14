import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import UsuarioDAO from "@/DAO/UsuarioDAO";
import { createReauthenticationChallenge, createUserSession } from "@/infrastructure/account/security";

function requiredEnvironmentVariable(name: string): string { const value = process.env[name]; if (!value) throw new Error(`Missing required environment variable: ${name}`); return value; }
function toAuthUser(user: { _id?: unknown; email?: string; userName?: string }): User { return { id: String(user._id), email: user.email, name: user.userName }; }

export const authOptions: NextAuthOptions = {
  secret: requiredEnvironmentVariable("NEXTAUTH_SECRET"),
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  providers: [
    CredentialsProvider({ name: "Credentials", credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } }, async authorize(credentials) {
      const email = credentials?.email?.trim().toLowerCase(); const password = credentials?.password;
      if (!email || !password || password.length > 128) return null;
      const client = await UsuarioDAO.getUserByEmail(email);
      if (!client?.password || !client.emailVerifiedAt || client.accountStatus === "suspended") return null;
      return (await bcrypt.compare(password, client.password)) ? toAuthUser(client) : null;
    }}),
    GoogleProvider({ clientId: requiredEnvironmentVariable("GOOGLE_CLIENT_ID"), clientSecret: requiredEnvironmentVariable("GOOGLE_CLIENT_SECRET") }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) return account?.provider !== "google";
      const client = await UsuarioDAO.getUserByEmail(user.email.toLowerCase());
      if (client) { if (client.accountStatus === "suspended") return false; user.id = String(client._id); user.name = client.userName; return true; }
      const created = await UsuarioDAO.createUser({ email: user.email.toLowerCase(), userName: user.name || `User-${crypto.randomUUID().slice(0, 8)}`, avatar: user.image || "", emailVerifiedAt: new Date() });
      user.id = String(created._id); return true;
    },
    async jwt({ token, user, account }) {
      if (user?.id) {
        const accountRecord = await UsuarioDAO.getUserByID(user.id);
        if (!accountRecord || accountRecord.accountStatus === "suspended") return {};
        const sessionId = crypto.randomUUID();
        const sessionVersion = accountRecord.sessionVersion || 1;
        await createUserSession(user.id, sessionId, sessionVersion);
        token.id = user.id;
        token.userName = user.name || undefined;
        token.sessionId = sessionId;
        token.sessionVersion = sessionVersion;
        token.reauthenticationToken = account?.provider === "google" ? await createReauthenticationChallenge(user.id, sessionId) : undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
        session.user.userName = token.userName;
        session.user.sessionId = token.sessionId;
        session.user.sessionVersion = token.sessionVersion;
        session.user.reauthenticationToken = token.reauthenticationToken;
      }
      return session;
    },
  },
  pages: { signIn: "/login", signOut: "/" },
};
