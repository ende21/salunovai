import { ObjectId } from "mongodb";

export interface Session {
  _id?: ObjectId;
  sessionToken: string;
  userId: ObjectId; // Reference to User
  expires: Date;
}
