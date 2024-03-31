import { JwtFunctions } from "@jwt/jwtFunctions";
import { NextFunction, Request, Response } from "express";
import userService from "@services/userService";
import AppError from "@errors/AppError";
import { Base64 } from "@utils/Basse64";

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
  const { email, password }: {email: string, password: string} = req.body;
  // try {
  //   const user = await userService.getByEmail(email);
  //   if (!user) {
  //     throw new AppError(401, "Invalid email or password");
  //   }
  //   const isPasswordValid = password === user.password;
    
  //   if (!isPasswordValid) {
  //     throw new AppError(401, "Invalid email or password");
  //   }
  //   const token = jwt.sign(
  //     { id: user.id },
  //     jwtSecret,
  //     jwtOptions
  //   );
  //   res.status(200).json({ token });
  // } catch (error) {
  //   next(error);
  // }
  const encodedEmail = base64.encode(email);
  const encodedPassword = base64.encode(password);
  res.status(200).json({ encodedEmail, encodedPassword, decodedEmail: base64.decode(encodedEmail), decodedPassword: base64.decode(encodedPassword) });
};

const verify = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret) as jwtPayload;
    const user = await userService.getById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User verified" });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default {
  login,
  verify,
};
