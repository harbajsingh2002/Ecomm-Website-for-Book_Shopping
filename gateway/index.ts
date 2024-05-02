import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import proxy from "express-http-proxy";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

//dont use it
// app.use("/users", proxy("http://localhost:3001"));
// app.use("/stores", proxy("http://localhost:3002"));
// app.use("/products", proxy("http://localhost:3003"));

// user: host: localhost;
// paths: "/api/users/*";
// methods: ["GET", "POST", "PUT", "DELETE"];

// product: host: localhost;
// paths: "/api/products*";
// methods: ["GET", "POST", "PUT", "DELETE"];

// store: host: localhost;
// paths: "/api/store*";
// methods: ["GET", "POST", "PUT", "DELETE"];

//serviceEndpoints
apiEndpoints: serviceEndpoints: userService: url: "http://localhost:3001/";

storeService: url: "http://localhost:3002/";

productService: url: "http://localhost:3003/";

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: Gateway is running at port: ${port}`);
});
