import { Middlewares } from "@middlewares/middlewares";
import authRoute from "@routes/authRoutes";
import userRoute from "@routes/userRoutes";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const middlewares = new Middlewares();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

app.get("/", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

app.use("/user", userRoute);
app.use("/auth", authRoute);

app.use(middlewares.errorHandler);

export default app;
