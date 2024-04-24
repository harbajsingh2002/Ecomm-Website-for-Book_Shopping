import mongoose, { Schema, model } from 'mongoose';
import timeStamp from '../utilis/moment/moment';
import { Role } from '../utilis/role/role';
import IUser from '../utilis/Iuser/Iuser';
import { nanoid } from 'nanoid';

export const userSchema = new Schema<IUser>({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: true, // password doest return in the response
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
  role: {
    type: String,
    enum: Role,
    default: Role.User,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

  timeStamp,
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
