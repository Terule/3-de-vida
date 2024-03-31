export type userCreateData = {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isActive?: boolean;
  imageUrl?: string | null;
};

export type userUpdateData = {
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  imageUrl?: string | null;
};

export type userLoginData = {
  email: string;
  password: string;
};