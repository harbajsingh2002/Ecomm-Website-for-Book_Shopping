import mongoose, { Schema, model } from 'mongoose';
import IStore from '../utilis/Istore/Istore';
import timeStamp from '../utilis/moment/moment';
import { nanoid } from 'nanoid';
import { required, string } from 'joi';

export const storeSchema = new Schema<IStore>({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  storeName: {
    type: String,
    required: true,
  },
  // productId: {
  //   type: String,
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },

  contact: {
    type: Number,
    required: false,
    unique: true,
  },
  address: {
    type: String,
    required: false,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  // message: {
  //   type: string,
  //   default: false,
  // },

  timeStamp,
});

const Store = mongoose.model<IStore>('Store', storeSchema);
export default Store;
