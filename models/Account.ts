import { ObjectId } from "mongodb";

export interface Account {
  _id?: ObjectId;
  userId: ObjectId; // Reference to User
  type: string; // e.g. 'oauth'
  provider: string; // e.g. 'google', 'github'
  providerAccountId: string; // ID from provider
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  // Tambahkan field lain sesuai kebutuhan
}
