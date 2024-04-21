import express, { Request, Response } from 'express'
import dotenv, { config } from 'dotenv'
import connectDB from './src/config/db.config'
import productRouter from './src/routes/products.routes'

dotenv.config()

console.log(process.env.PORT)
console.log(process.env.MONGODB_URI)
const app = express()
const port = process.env.PORT || 3000
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/Ecomm_Book_Shopping_Store'

app.use(express.json())

// API Routes
app.use('/api/product', productRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
// Database connection
connectDB()
