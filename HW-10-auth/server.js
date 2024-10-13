import express from "express";
import "dotenv/config";
import { userRouter } from "./routers/user-router.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.json());
server.use(cookieParser());
server.use(userRouter);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}`)
);
