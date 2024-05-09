import mongoose, { Schema } from 'mongoose';
import IStore from '../utilis/Istore/Istore';
import timeStamp from '../utilis/moment/moment';
import { nanoid } from 'nanoid';

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
  productId: {
    type: String,
    required: true,
  },
  // message: {
  //   type: string,
  //   default: false,
  // },

  timeStamp,
});

const Store = mongoose.model<IStore>('Store', storeSchema);
export default Store;
