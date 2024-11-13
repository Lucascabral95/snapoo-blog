import mongoose from "mongoose";

const posteosSchema = new mongoose.Schema({
    likes: {
        type: Number,
        default: 0,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true,
    },
    comentarios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comentarios",
        },
    ],
    imagen: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    fecha : {
        type: Date,
        default: Date.now
    }
});

const Posteos = mongoose.models.Posteos || mongoose.model("Posteos", posteosSchema);
export default Posteos;