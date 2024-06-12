import { getMessagesByRoomId } from "@/lib/db/message.db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const roomId = searchParams.get("roomId");
  const data = roomId ? await getMessagesByRoomId(roomId) : [];
  return Response.json({ data });
}
