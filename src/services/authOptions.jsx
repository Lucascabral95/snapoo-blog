export const authOptions = {
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.userName = token.userName;
                session.saludo = "Hola Developer Beginner";
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return process.env.REDIRECCION_LOGUEO;
        },
    },
}