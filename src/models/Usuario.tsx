import mongoose from "mongoose";

interface IUsuarios extends mongoose.Document {
  email: string;
  password?: string;
  userName?: string;
  avatar?: string
}

const usuarioSchema =  new mongoose.Schema<IUsuarios>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String
    },
    userName: {
        type: String,
        unique: true,
    },
    avatar: {
        type: String,
        default: ""
    },
});

const Usuarios = mongoose.models.Usuarios || mongoose.model<IUsuarios>("Usuarios", usuarioSchema);
export default Usuarios;
