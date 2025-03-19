import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { indexRoutes } from "./routes/indexRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors({ credentials: true, origin: process.env.APPLICATION_URL }));
app.use(express.urlencoded({ extended: true, limit: 10000 }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", indexRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
