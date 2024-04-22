import mongoose, { ConnectOptions } from 'mongoose'

async function connectDB() {
  try {
    const conn = await mongoose.connect(
      'mongodb://127.0.0.1:27017/Ecomm_Book_Shopping_Product',
      // {
      //   useNewUrlParser: false,
      //   useUnifiedTopology: false,
      // } as ConnectOptions
    )
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`)
  } catch (error) {
    console.error(error, 'Not Connected')
    return error
  }
}

export default connectDB
