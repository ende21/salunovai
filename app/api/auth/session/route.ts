import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    return new Response(JSON.stringify(session), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message || 'Unknown error' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
