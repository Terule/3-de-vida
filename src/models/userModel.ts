import AppError from "@errors/AppError";
import { PrismaError } from "@errors/PrismaError";
import { Prisma } from "@prisma/client";
import prisma from "@utils/prismaClient";
import { userData } from "types/userTypes";

const create = async (userData: userData) => {
  try {
    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        isActive: true,
        imageUrl: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          throw new PrismaError(400, "Email already in use", "P2002");
        default:
          throw new AppError(500, "Internal server error");
      }
    }
    if (error instanceof Prisma.PrismaClientInitializationError) {
      switch (error.errorCode) {
        case "P1000":
          throw new PrismaError(503, "Database's host user name or password is incorrect", "P1000");
        case "P1001":
          throw new PrismaError(500, "Connection to database failed", "P1001");
        case "P1002":	
          throw new PrismaError(408, "Database is not reachable", "P1002");
        case "P1003":
          throw new PrismaError(503, "Database is not running", "P1003");
        default:
          throw new AppError(500, "Internal server error");
      }
    }
    throw new AppError(500, (error as Error).message);
  }
};

const getByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

const getById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

const getAll = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
      isActive: true,
      imageUrl: true,
    },
  });
  return users;
};

const update = async (id: string, userData: userData) => {
  const user = await prisma.user.update({
    where: { id },
    data: userData,
  });

  return user;
};

const remove = async (id: string) => {
  const user = await prisma.user.delete({
    where: { id },
  });
  return user;
};

export default {
  create,
  getByEmail,
  getById,
  getAll,
  update,
  remove,
};
