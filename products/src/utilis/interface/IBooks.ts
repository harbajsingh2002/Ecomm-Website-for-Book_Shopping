export default interface IBooks extends Document {
  title: string
  author: string
  description: string
  category: string
  price: number
  image: string
}
