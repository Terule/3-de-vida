import { PrismaClient } from "@prisma/client";

type UserData = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  imageUrl: string | null;
}

const prisma = new PrismaClient();

export const createUser = async (userData: UserData) => {
  const user = await prisma.user.create({
    data: userData,
  });
  return user;
}

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}

