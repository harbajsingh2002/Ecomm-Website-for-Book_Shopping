import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// async function connectDB() {
//   try {
//     const conn = await mongoose.connect(
//       process.env.MONGODB_URI as string,
//       //'mongodb://127.0.0.1:27017/Ecomm_Book_Shopping_Product',
//       // {
//       //   useNewUrlParser: false,
//       //   useUnifiedTopology: false,
//       // } as ConnectOptions
//     );
//     console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(error, 'Not Connected');
//     return error;
//   }
// }
function connectDB() {
  return mongoose
    .connect(
      process.env.MONGODB_URI as string,
      //'mongodb://127.0.0.1:27017/Ecomm_Book_Shopping_Product',
      // {
      //   useNewUrlParser: false,
      //   useUnifiedTopology: false,
      // } as ConnectOptions
    )
    .then((conn) => {
      console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
      return conn;
    })
    .catch((error) => {
      console.error(error, 'Not Connected');
      throw error;
    });
}

export default connectDB;
