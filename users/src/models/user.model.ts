import mongoose, { Schema, model } from 'mongoose';
import timeStamp from '../utils/moment/moment';
import { Role } from '../utils/role/role';
import IUser from '../utils/Iuser/Iuser';
import crypto, { randomUUID } from 'crypto';

export const userSchema = new Schema<IUser>({
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
    select: true, // password does not return in the response
  },
  contact: {
    type: Number,
    required: false,
    unique: true,
  },
  address: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
  ],
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
  resetPasswordToken: {
    type: String || undefined,
    required: false,
  },
  resetPasswordExpire: {
    type: Date || undefined,
    default: null,
  },
  confirmPassword: {
    type: String,
  },
  passwordChangedAt: {
    type: Number,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // this is the expiry time in seconds
  },
  timeStamp,
});

userSchema.methods.resetPassword = async function () {
  try {
    // Generate a plain token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash the token(encrypted token)
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set the expiration date for the token (e.g., 10 minutes from now)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

    console.log(resetToken, this.resetPasswordToken);

    await this.save();

    // Return the plain reset token
    return resetToken;
  } catch (error) {
    throw new Error('Error generating reset token');
  }
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
