import mongoose, { Schema } from 'mongoose'
import IBooks from '../utilis/interface/IBooks'
import timeStamp from '../utilis/moment/moment'
import { v4 as uuidv4 } from 'uuid'
//import { nanoid } from 'nanoid'

const productSchema = new Schema<IBooks>({
  id: {
    type: String,
    default: uuidv4,
    index: { unique: true },
    required: true,
  },
  // _id: {
  //   type: String,
  //   default: () => nanoid(),
  // },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
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
  },
  image: {
    type: String,
    required: false,
  },
  // images: [
  //   {
  //     //Array of object
  //     type: String,
  //     required: false,
  //   },
  // ],
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deleted_At: {
    type: Date,
    allowNull: true,
  },
  deleted_by: {
    // type: Number,
    type: String,
    allowNull: true,
  },
  timeStamp,
})

const Books = mongoose.model<IBooks>('Books', productSchema)
export default Books
