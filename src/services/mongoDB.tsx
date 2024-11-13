// import mongoose from "mongoose";

// const mongoDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI!);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default mongoDB;
import mongoose from "mongoose";

const mongoDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al conectar a MongoDB:", error.message);
    } else {
      console.error("Error desconocido al conectar a MongoDB.");
    }
  }
};

export default mongoDB;
