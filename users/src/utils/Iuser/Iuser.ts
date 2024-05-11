import { Document } from 'mongoose';

// IUser interface
export default interface IUser extends Document {
  name: {
    firstName: string;
    lastName?: string; // lastName is optional
  };
  age: number;
  email: string;
  password: string;
  contact: number;
  address: string | null;
  role: string;
  isActive: boolean;
  isDeleted: boolean;
  resetPasswordToken: string | undefined;
  resetPasswordExpire: Date | undefined;
  confirmPassword: string;
  passwordChangedAt: number;
  createdAt: Date;
  timeStamp: number;
  resetPassword(): string;
  // eslint-disable-next-line semi
}

// IUserLogin interface
export interface IUserLogin extends Document {
  email: string;
  password: string;
}
