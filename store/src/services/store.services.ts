import stores from '../model/store.model';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Store from '../model/store.model';
import IStore from '../utilis/Istore/Istore';
import valStore from '../validation/store.validation';
import redisClient from '../config/redis.client';
export class StoreServices {
  public static async createNewStore(body: IStore) {
    try {
      //const { error } = await Store.valStore.validate(req.body)
      // if (error) {
      //     return res.status(400).json({
      //         error: error.details.map((err:any) => err.message.replace(/"/g, ''))
      //     });
      // }
      const { storeName, email, password, contact, address, description } = body;

      // Input validation
      if (!storeName || !email || !password) {
        throw new Error('Store name, email, and password are required');
      }
      const checkStore = await Store.findOne({
        $and: [{ email: body.email }, { isDeleted: false }],
      });
      if (checkStore) {
        //return error
        throw new Error('Email already existed');
      }

      const hashedPassword = await bcrypt.hash(body.password, 10);

      const newStore = await Store.create({
        storeName: body.storeName,
        email: body.email,
        password: hashedPassword,
        contact: body.contact,
        address: body.address,
        description: body.description,
      });
      return newStore.save();
    } catch (error) {
      throw new Error();
    }
  }

  // //Login Store
  // public static async login(email: string, password: string) {
  //   try {
  //     if (!email || !password) {
  //       throw new Error('Store name, email, and password are required');
  //     }

  //     // Find the store based on the provided email
  //     const store = await this.getByAttribute({ email });
  //     if (!store) {
  //       throw new Error('Store not found');
  //     }
  //     if (store) {
  //       const isPasswordValid = await bcrypt.compare(password, store.password);
  //       if (!isPasswordValid) {
  //         throw new Error('Incorrect password');
  //       } else {
  //         // if password is valid den generate JWT token
  //         const token = jwt.sign({ storeId: store._id, email }, process.env.Token_Key!, { expiresIn: '30min' });
  //         return { _id: store._id, email: store.email, token: token };
  //       }
  //     } else if (store) {
  //       return 'invalidStore';
  //     } else {
  //       return 'notExist';
  //     }
  //   } catch (error) {
  //     // Handle errors
  //     throw new Error('Login failed');
  //   }
  // }

  // Get Store by Id
  public static async getStoreById(_id: string) {
    try {
      const findStore = await this.getByAttribute({ _id });

      if (!findStore) {
        throw new Error('Store not found');
      }
      return findStore;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  // //Get All store
  // public static async getAllStore(query: any) {
  //   try {
  //     const storeListing = await Store.find();
  //     console.log(storeListing);

  //     // return await Store.find()

  //     const pagination = query.pagination ? parseInt(query.pagination) : 10;
  //     // PageNumber From which Page to Start
  //     const pageNumber = query.page ? parseInt(query.page) : 1;

  //     stores
  //       .find({})
  //       .sort({ id: 1 })
  //       .skip((pageNumber - 1) * pagination)
  //       //limit is number of Records we wantt o display
  //       .limit(pagination)
  //       .then((data) => {});
  //     return stores;
  //   } catch (err: any) {
  //     throw new Error(err.message);
  //   }
  // }

  public static async getAllStore() {
    try {
      const storeListing = await Store.find();
      console.log(storeListing);

      return storeListing;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  //Update Store
  public static async updateStore(_id: string, reqData: any) {
    try {
      const updatedStore = await Store.findByIdAndUpdate(_id, { ...reqData }, { new: true, useFindAndModify: true });
      return updatedStore;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  //Soft Delete Store
  public static async deleteStore(reqData: any) {
    try {
      const storeId = reqData.params.id;
      const store = await Store.findById(storeId);
      //console.log(storeId)
      // const store = await Store.findOne({ where: { id: storeId.id } });
      if (!store) {
        return 'notExist';
      } else {
        const date = new Date();
        const existingStore = await Store.findByIdAndUpdate(storeId, {
          isDeleted: true,
          isActive: false,
          deletedAt: date,
        });
        return existingStore;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async getByAttribute(attributes: object) {
    try {
      const findStore = await Store.findOne(attributes).lean();
      return findStore;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  //Publish Message
  public static async publishMessage(req: Request, res: Response, message: string, publisher: string) {
    try {
      console.log('Inside service');
      const requestBody = req.body;
      // const message = {
      //   message: requestBody,
      //   date: new Intl.DateTimeFormat('es-ES').format(new Date()),
      // };

      const result = redisClient.publish('channelName', JSON.stringify(message));

      console.log(`Publishing an Event using Redis to: ${JSON.stringify(requestBody)}`);

      return result;
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message);
    }
  }
}
