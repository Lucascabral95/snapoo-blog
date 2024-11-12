import mongoose from "mongoose";

const interesesSchema = new mongoose.Schema({
    rePosteos: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Posteos", required: true}
    ],
    fecha: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true
    }
})

// export default mongoose.models.Intereses || mongoose.model("Intereses", interesesSchema)
export default mongoose.model("Intereses", interesesSchema)