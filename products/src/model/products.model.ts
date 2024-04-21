import mongoose, { Schema } from 'mongoose'
import IBooks from '../utilis/interface/IBooks'

const productSchema = new Schema<IBooks>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    unique: true,
  },
})

const Books = mongoose.model<IBooks>('Books', productSchema)
export default Books
