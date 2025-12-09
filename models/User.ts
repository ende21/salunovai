import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  name?: string;
  email: string;
  image?: string;
  emailVerified?: Date;
  password?: string;
  role?: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  provider?: string;
}
