import userModel from "@models/userModel";
import { userData } from "@cTypes/userTypes";


const create = async ({
  name,
  email,
  password,
  isActive = true,
  isAdmin = false,
  imageUrl = null,
}: userData) => {
  const user = await userModel.create({
    name,
    email,
    password,
    isActive,
    isAdmin,
    imageUrl,
  });
  return user;
};

const getAll = async () => {
  const users = await userModel.getAll();
  return users;
};

const getByEmail = async (email: string) => {
  const user = await userModel.getByEmail(email);
  return user;
};

const getById = async (id: string) => {
  const user = await userModel.getById(id);
  return user;
};

const update = async (id: string, userData: userData) => {
  const user = await userModel.update(id, userData);
  return user;
};

const remove = async (id: string) => {
  const user = await userModel.remove(id);
  return user;
};

export default {
  create,
  getAll,
  getByEmail,
  getById,
  update,
  remove
};