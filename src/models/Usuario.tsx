// import mongoose from "mongoose";

// interface IUsuario extends mongoose.Document {
//     email: string;
//     password?: string;
//     userName?: string;
//     avatar: string;
// }

// const usuarioSchema = new mongoose.Schema<IUsuario>({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String
//     },
//     userName: {
//         type: String,
//         unique: true,
//     },
//     avatar: {
//         type: String,
//         default: ""
//     },
// });

// // export default mongoose.models.Usuarios as mongoose.Model<IUsuario> || mongoose.model<IUsuario>("Usuarios", usuarioSchema);
// const Usuarios = mongoose.models.Usuarios as mongoose.Model<IUsuario> || mongoose.model<IUsuario>("Usuarios", usuarioSchema);
// export default Usuarios;

import mongoose, { Schema, Document, Model } from "mongoose";

interface IUsuario extends Document {
    email: string;
    password?: string;
    userName?: string;
    avatar: string;
}

const usuarioSchema: Schema<IUsuario> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    userName: {
        type: String,
        unique: true,
    },
    avatar: {
        type: String,
        default: "",
    },
});

// Usamos un patrón condicional para exportar el modelo
const Usuarios: Model<IUsuario> = mongoose.models.Usuarios || mongoose.model<IUsuario>("Usuarios", usuarioSchema);

export default Usuarios;
