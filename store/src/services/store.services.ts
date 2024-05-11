import bcrypt from 'bcrypt';
// import * as jwt from 'jsonwebtoken';
import Store from '../model/store.model';
import IStore from '../utilis/Istore/Istore';
import { Redis } from 'ioredis';
const redisSubscriber = new Redis();
const publisher = new Redis();
export class StoreServices {
  public static async createNewStore(body: IStore) {
    try {
      const { storeName, email, password } = body;

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

  // listing of store : normal way
  // public static async getAllStore() {
  //   try {
  // const storeListing = await Store.find();
  // console.log(storeListing);
  // return storeListing;

  //   } catch (err: any) {
  //     throw new Error(err.message);
  //   }
  // }

  // listing of store using pagination
  public static async getAllStore(pageNumber = 1, pageSize = 10) {
    try {
      const skip = (pageNumber - 1) * pageSize;
      const posts = await Store.aggregate([{ $sample: { size: 40 } }, { $skip: skip }, { $limit: pageSize }]);
      return posts;
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
  // public static async publishMessage(req: Request, res: Response, message: string, publisher: string) {
  //   try {
  //     console.log('Inside service');
  //     const requestBody = req.body;
  //     // const message = {
  //     //   message: requestBody,
  //     //   date: new Intl.DateTimeFormat('es-ES').format(new Date()),
  //     // };

  //     const result = redisClient.publish('channelName', JSON.stringify(message));

  //     console.log(`Publishing an Event using Redis to: ${JSON.stringify(requestBody)}`);

  //     return result;
  //   } catch (err: any) {
  //     console.error(err);
  //     throw new Error(err.message);
  //   }
  // }

  // public static async publishStore(body: IStore) {
  //   try {
  //     // Check if the store already exists
  //     const store = await stores.findById(body.id);
  //     if (store) {
  //       return 'storeAlreadyExist';
  //     } else {
  //       // Subscribe to product channel to receive responses
  //       subscriber.subscribe('productChannel');

  //       // Publish store ID
  //       // eslint-disable-next-line no-inner-declarations
  //       async function publishStoreId(data: any) {
  //         await publisher.publish('storeChannel', JSON.stringify(data));
  //         console.log(data, 'Store ID published');
  //       }

  //       // Publish productId and wait for response
  //       await publishStoreId(body.productId);

  //       // Wait for response about product
  //       //const response = await redisResponse(body);
  //       const response = await new Promise((resolve) => {
  //         subscriber.once('message', (channel, message) => {
  //           if (channel === 'users_channel') {
  //               const userData = JSON.parse(message);
  //               console.log(userData, 'Received user data');
  //               if (userData.id === body.productId) {
  //                   console.log('User found');
  //                   resolve('yes');
  //               } else {
  //                   console.log('User not found');
  //                   resolve('no');
  //               }
  //           }
  //       });
  //   });
  //         // subscriber.once('message', (channel, message) => {
  //         //   if (channel === 'productChannel') {
  //         //     const productData = newFunction();
  //         //     console.log(productData, 'Received product data');
  //         //     if (productData.id === body.productId) {
  //         //       console.log('Product found');
  //         //       resolve('yes');
  //         //     } else {
  //         //       console.log('Product not found');
  //         //       resolve('no');
  //         //     }
  //         //   }

  //           // function newFunction(): any {
  //           //   return JSON.parse(message);
  //           // }
  //           // function newFunction(message: string): any {
  //           //   try {
  //           //     return JSON.parse(message);
  //           //   } catch (error) {
  //           //     console.error('Error parsing JSON:', error);
  //           //     // Handle the error appropriately, e.g., return a default value or re-throw the error
  //           //     throw error;
  //             }
  //           // }
  //         // });
  //       // });

  //       if (response === 'yes') {
  //         console.log(body, 'Creating store');
  //         await stores.create(body);
  //         return 'storeCreated';
  //       } else {
  //         console.log('Product not found.');
  //         return 'productNotFound';
  //       }
  //     }
  //   } catch (err: any) {
  //     throw new Error(err.message);
  //   }
  // }

  public static async publishStore(req: Request, body: IStore) {
    try {
      const existingStore = await Store.findOne({ email: body.email });
      console.log('storeAlreadyExist', existingStore);

      if (existingStore) {
        return 'storeAlreadyExist';
      } else {
        // Subscribe product channel to receive responses
        redisSubscriber.subscribe('productChannel');

        // Function to publish store ID
        const publishStoreId = async (data: any) => {
          await publisher.publish('storeChannel', JSON.stringify(data));
          console.log(data, 'Store ID published');
        };

        // Publish store ID and wait for response
        await publishStoreId(body.id);

        // Publish productId and wait for response
        await publishStoreId(body.productId);

        // Wait for response
        const response = await new Promise((resolve) => {
          redisSubscriber.once('message', (channel, message) => {
            if (channel === 'productChannel') {
              try {
                const productData = JSON.parse(message);
                console.log(productData, 'Received data');

                if (productData && productData.id === body.id) {
                  console.log('product found');
                  resolve('product found');
                } else {
                  console.log('product not found');
                  resolve('product not found');
                }
              } catch (error) {
                console.error('Error:', error);
                resolve('product not found');
              }
            }
          });
        });

        if (response === 'product found') {
          console.log(body, 'Creating store');

          // Create the new store
          await Store.create(body);
          console.log('Store created:', body);

          return 'storeCreated';
        } else {
          console.log('product not found.');
          return 'Product not Added';
        }
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
