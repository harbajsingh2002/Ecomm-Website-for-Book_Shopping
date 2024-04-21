import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(
      //"mongodb://localhost:27017/Ecomm_Book_Shopping",
      "mongodb://127.0.0.1:27017/Ecomm_Book_Shopping",
      {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error, "Not Connected");
    return error;
  }
}
// const connectDB = (url: any) => {
//   mongoose.connect("mongodb://127.0.0.1:27017/Ecomm_Book_Shopping");
// };

export default connectDB;
