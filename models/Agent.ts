import { ObjectId } from 'mongodb';

export interface Agent {
  _id?: ObjectId;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  // Tambahkan properti lain sesuai kebutuhan
}
