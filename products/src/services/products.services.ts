import Books from '../model/products.model'

export class BooksServices {
  public static async createNewBook(body: any) {
    try {
      const { title, author, description, category, price, image } = body

      // Input validation
      if (!title) {
        throw new Error('title is required')
      }

      const newBook = await Books.create({
        title: body.title,
        author: body.author,
        description: body.description,
        category: body.category,
        price: body.price,
        image: body.image,
      })
      return newBook.save()
      // return newStore
    } catch (error) {
      throw new Error()
    }
  }
}
