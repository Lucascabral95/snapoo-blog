import mongoose from "mongoose";

interface IDatosPersonales extends mongoose.Document {
  provincia: string;
  pais: string;
  edad: number;
  bio: string;
  nombre: string;
  apellido: string;
  user: mongoose.Schema.Types.ObjectId;
}

const datosPersonalesSchema = new mongoose.Schema<IDatosPersonales>({
  provincia: {
    type: String,
  },
  pais: {
    type: String,
  },
  edad: {
    type: Number,
  },
  bio: {
    type: String,
  },
  nombre: {
    type: String,
  },
  apellido: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuarios",
    required: true,
  }
});

export default (mongoose.models
  .DatosPersonales as mongoose.Model<IDatosPersonales>) ||
  mongoose.model<IDatosPersonales>("DatosPersonales", datosPersonalesSchema);

