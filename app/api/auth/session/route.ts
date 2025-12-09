import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  return new Response(JSON.stringify(session), {
    headers: { "Content-Type": "application/json" },
  });
}
