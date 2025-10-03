import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import UsuarioDAO from "@/DAO/UsuarioDAO";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Example@hotmail.com" },
        password: { label: "Password", type: "password", placeholder: "********" },
        userName: { label: "Username", type: "text", placeholder: "Usuario1234" }
      },
      async authorize(credentials) {
        const client = await UsuarioDAO.getUserByEmail(credentials.email.toLowerCase());

        if (!client) {
          throw new Error("El usuario no se encuentra registrado");
        }

        const verificacionPassword = await bcrypt.compare(credentials.password, client.password);
        if (!verificacionPassword) {
          throw new Error("Credenciales incorrectas");
        }

        return client
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const client = await UsuarioDAO.getUserByEmail(user.email);

          if (!client) {
            const newUser = await UsuarioDAO.createUser({
              email: user.email,
              name: user.usename,
              avatar: user.image
            });
            user._id = newUser._id;
          } else {
            user._id = client._id;
          }
        } catch (error) {
          console.error("Error al manejar el inicio de sesión:", error);
          return false;
        }
      }
      return true;
    },

    async session({ session, token }) {
      session.user.id = token.id || null;
      session.user.saludo = "Hola Developer Beginner";
      session.user.userName = token.userName;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.userName = user.userName;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return process.env.REDIRECCION_ACCESO
    }
  },
  pages: {
    signIn: "/feed/login",
    signOut: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
