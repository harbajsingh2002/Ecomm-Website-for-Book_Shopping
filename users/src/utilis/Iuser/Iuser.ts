import { Document } from 'mongoose';

export default interface IUser extends Document {
  name: string;
  age: number;
  email: string;
  password: string;
  contact: number;
  address: string;
  role: string;
  isActive: boolean; // lowercase 'boolean'
  isDeleted: boolean; // lowercase 'boolean'
  timeStamp: number;
}

export default interface IUserLogin extends Document {
  email: string;
  password: string;
}
