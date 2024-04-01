import { userLoginData } from "@cTypes/userTypes";
import AppError from "@errors/AppError";
import { JwtFunctions } from "@jwt/jwtFunctions";
import userService from "@services/userService";
import { Base64 } from "@utils/Base64";
import { NextFunction, Request, Response } from "express";

const jwt = new JwtFunctions();
const base64 = new Base64();

type jwtPayload = {
  id: string;
};

const jwtSecret = process.env.JWT_SECRET || "secret";
const jwtOptions = {
  expiresIn: "1d",
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: userLoginData = req.body;
  try {
    const user = await userService.getByEmail(email);
    if (!user) {
      throw new AppError(401, "Invalid email or password");
    }
    const decodedPassword = base64.decode(user.password);
    const isPasswordValid = password === decodedPassword;

    if (!isPasswordValid) {
      throw new AppError(401, "Invalid email or password");
    }
    const token = jwt.sign({ id: user.id }, jwtSecret, jwtOptions);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const verify = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new AppError(401, "Token not provided");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret) as jwtPayload;
    const user = await userService.getById(decoded.id);
    if (!user) {
      throw new AppError(401, "User not found");
    }
    res.status(200).json({ message: "User verified" });
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  verify,
};
