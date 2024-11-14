// import mongoose from "mongoose";

// const interesesSchema = new mongoose.Schema({
//     rePosteos: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Posteos",
//             required: true
//         }
//     ],
//     fecha: {
//         type: Date,
//         default: Date.now
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Usuarios",
//         required: true
//     }
// })

// const Intereses = mongoose.models.Intereses || mongoose.model("Intereses", interesesSchema)
// export default Intereses;
import mongoose, { Schema, Document } from "mongoose";

interface IIntereses extends Document {
    rePosteos: mongoose.Schema.Types.ObjectId[];
    fecha: Date;
    user: mongoose.Schema.Types.ObjectId;
}

const interesesSchema = new Schema<IIntereses>({
    rePosteos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posteos",
            required: true
        }
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

const Intereses = mongoose.models.Intereses || mongoose.model<IIntereses>("Intereses", interesesSchema)
export default Intereses;