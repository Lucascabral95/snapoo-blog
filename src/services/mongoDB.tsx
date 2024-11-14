import mongoose from "mongoose";

const mongoDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};

export default mongoDB;
