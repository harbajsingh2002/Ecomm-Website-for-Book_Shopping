import express, { Request, Response } from 'express'
import dotenv, { config } from 'dotenv'
import connectDB from './src/config/db.config'
import productRouter from './src/routes/products.routes'
import helmet from 'helmet'
import cors from 'cors'
// import { v4 as uuidv4 } from 'uuid'

//configuring dotenv to load environment variables from a .env
dotenv.config()

console.log(process.env.PORT)
console.log(process.env.MONGODB_URI)

//Setting Up Express App
const app = express()

//Setting Up Middleware: Using helmet() to enhance the app's security by setting various HTTP headers and cors() to enable Cross-Origin Resource Sharing.
app.use(helmet())
app.use(cors())

// Setting Port
const port = process.env.PORT || 3001

// const MONGODB_URI =
//   process.env.MONGODB_URI ||
//   'mongodb://localhost:27017/Ecomm_Book_Shopping_Product'

//Parsing Request Body:
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// API Routes: define routes for handling product-
app.use('/api/products', productRouter)

//Basic route handler for the root URL ('/') which sends a simple message.
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server') //message
})

//Starting the Server:The Express server to listen on the specified port.
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
// Database connection
connectDB()
