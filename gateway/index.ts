import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { ExpressGateway } from "express-gateway";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// const gateway = ExpressGateway();
// gateway().load(path.join(__dirname, "config")).run();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: Gateway is running at port: ${port}`);
});
