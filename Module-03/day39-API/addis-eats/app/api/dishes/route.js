import { db } from "@/data/db";

export async function GET() {
  const dishes = await db.dish.findMany();
  return Response.json(dishes);
}
