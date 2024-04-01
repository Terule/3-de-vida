import authController from "@controllers/authController";
import { Router } from "express";

const route = Router();

route.post("/login", authController.login);
route.post("/verify", authController.verify);

export default route;
