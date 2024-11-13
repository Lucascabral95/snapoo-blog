import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
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

const Usuarios = mongoose.models.Usuarios || mongoose.model("Usuarios", usuarioSchema);
export default Usuarios;
