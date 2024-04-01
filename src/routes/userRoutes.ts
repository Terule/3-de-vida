import userController from "@controllers/userController";
import { Middlewares } from "@middlewares/middlewares";
import { Router } from "express";

const middlewares = new Middlewares();

const route = Router();

route.get("/", userController.getAll);
route.post(
  "/",
  middlewares.upload,
  middlewares.checkUserData,
  userController.create
);
route.get("/:id", userController.getById);
route.put("/:id", userController.update);
route.delete("/:id", userController.remove);

export default route;
