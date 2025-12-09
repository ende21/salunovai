import { ObjectId } from "mongodb";

export interface VerificationToken {
  _id?: ObjectId;
  identifier: string; // email or user identifier
  token: string;
  expires: Date;
}
