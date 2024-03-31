import AppError from "@errors/AppError";
import { PrismaError } from "@errors/PrismaError";
import { uploadSingle } from "@utils/multerConfig";
import { NextFunction, Request, Response } from "express";
import multer from "multer";

export class Middlewares {
  public upload = (req: Request, res: Response, next: NextFunction) => {
    uploadSingle(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        next(new AppError(500, err.message));
      }
      next();
    });
  };

  public errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    nxt: NextFunction
  ) => {
    if (err instanceof PrismaError) {
      res.status(err.statusCode).json({ name: err.name, code: err.errorCode, message: err.message});
    }
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ name: err.name, message: err.message});
    }
  };

  public checkUserData = (req: Request, _res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (!name) {
      next(new AppError(400, "Name is required"));
    }
    if (!email) {
      next(new AppError(400, "Email is required"));
    }
    if (!password) {
      next(new AppError(400, "Password is required"));
    }
    next();
  }
}
