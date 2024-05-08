import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from '../models/user.model';
import IUser from '../utils/Iuser/Iuser';
import IUserLogin from '../utils/Iuser/Iuser';

export class UserServices {
  //Create New User
  public static async createUser(body: IUser) {
    try {
      const { name, email, password, age, contact, address, role } = body;

      // Check if user with the given email already exists if user soft deleted
      const existingUser = await User.findOne({ email, isDeleted: false });

      if (existingUser) {
        return { success: false, message: 'Email already exists' };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        age,
        email,
        password: hashedPassword,
        contact,
        address,
        role,
      });

      // No need to save again since User.create() already saved the document

      return newUser;
    } catch (error) {
      // Log or return the actual error for debugging
      console.error(error);
      throw new Error('Failed to create user');
    }
  }

  //Login User
  public static async login(body: IUserLogin) {
    try {
      const { email, password } = body;

      if (!email || !password) {
        throw new Error(' Email, and password are required');
      }

      // Find the store based on the provided email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Incorrect password');
        } else {
          // if password is valid then generate JWT token
          const token = jwt.sign({ userId: user._id, email }, process.env.TOKEN_KEY!, { expiresIn: '30min' });
          return { _id: user._id, email: user.email, token: token };
        }
      } else if (user) {
        return 'invalidUser';
      } else {
        return 'notExist';
      }
    } catch (error) {
      // Handle errors
      throw new Error('Login failed');
    }
  }

  // Get Store by id
  public static async findUserById(_id: string) {
    try {
      const findUser = await this.getByAttribute({ _id });

      if (!findUser) {
        throw new Error('Store not found');
      }
      return findUser;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  // //Get All store
  // public static async findAllUser() {
  //   try {
  //     const storeListing = await User.find();
  //     console.log(storeListing);

  //     return storeListing;
  //   } catch (err: any) {
  //     throw new Error(err.message);
  //   }
  // }

  public static async findAllUser(pageNumber = 1, pageSize = 10) {
    try {
      const skip = (pageNumber - 1) * pageSize;
      const posts = await User.aggregate([{ $sample: { size: 40 } }, { $skip: skip }, { $limit: pageSize }]);
      return posts;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  //Update User
  public static async updateUser(_id: string, reqData: any) {
    try {
      const updatedUser = await User.findByIdAndUpdate(_id, { ...reqData }, { new: true, useFindAndModify: true });
      return updatedUser;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  //Soft Delete Store
  public static async deleteUser(reqData: any) {
    try {
      const userId = reqData.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return 'notExist';
      } else {
        const date = new Date();
        const existingUser = await User.findByIdAndUpdate(userId, {
          isDeleted: true,
          isActive: false,
          deletedAt: date,
        });
        return existingUser;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async getByAttribute(attributes: object) {
    try {
      const findStore = await User.findOne(attributes).lean();
      return findStore;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  // public static async forgetPassword(reqData: any) {
  //   try {
  //     const { email } = req.body;
  //   } catch (err: any) {
  //     throw new Error(err.message);
  //   }
  // }
}
