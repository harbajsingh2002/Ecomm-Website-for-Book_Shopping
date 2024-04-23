export default interface IBooks extends Document {
  params: any
  title: string
  author: string
  description: string
  category: string
  price: number
  image: string
  //images:string
  createdAt: boolean
  isDeleted: boolean // lowercase 'boolean'
  deletedBy: boolean
  deletedAt: boolean
  timeStamp: number
}
