import Books from '../model/products.model';
import IBooks from '../utilis/interface/IBooks';
import path from 'path';

export class BooksServices {
  public static async addNewBook(body: IBooks) {
    try {
      const { title } = body;

      // Input validation
      if (!title) {
        throw new Error('Title is required');
      }

      const newBook = await Books.create({
        title: body.title,
        author: body.author,
        description: body.description,
        category: body.category,
        price: body.price,
        //image: body.image,
      });
      return newBook.save();
      // return newStore
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  //get by attribute
  public static async getByAttribute(attributes: object) {
    try {
      const findBook = await Books.findOne(attributes).lean();
      return findBook;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  //Find the book by id
  public static async getBookById(_id: string) {
    try {
      const findBook = await this.getByAttribute({ _id });

      if (!findBook) {
        throw new Error('Book not found');
      }
      return findBook;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  //Get All Books
  public static async getAllbooks() {
    try {
      const bookListing = await Books.find();
      console.log(bookListing);

      return bookListing;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  //Update book
  public static async updateBook(_id: string, reqData: any) {
    try {
      const updatedBook = await Books.findByIdAndUpdate(_id, { ...reqData }, { new: true, useFindAndModify: true });
      return updatedBook;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  //Soft Delete Book
  public static async deleteBook(reqData: any) {
    try {
      const bookId = reqData.params.id;
      const book = await Books.findById(bookId);
      //console.log(bookId)

      if (!book) {
        return 'Book not existed';
      } else {
        const date = new Date();
        const existingBook = await Books.findByIdAndUpdate(bookId, {
          $set: {
            isDeleted: true,
            isActive: false,
            deletedAt: date, // Assuming you want to set the deletion timestamp
          },
        });

        return existingBook;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  //Upload imgae of book
  public static async uploadImage(body: IBooks, imagePath: string) {
    try {
      //console.log('hjh');
      const { title, author, description, category, price, image } = body;
      // const image = body.image

      //console.log(image);
      const newBook = await Books.create({
        title,
        author,
        description,
        category,
        price,
        image: imagePath,
      });
      return newBook.save();
      // } catch (err: any) {
      //   throw new Error(err.message)
      // }
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        console.error('File or directory not found:', err.path);
        // Check if the directory exists and the path is correct
      } else {
        // Handle other types of errors
        console.error('An error occurred:', err);
      }
    }
  }
}
