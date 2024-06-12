import { getMessageRooms } from "@/lib/db/message.db";

export async function GET() {
    const data = getMessageRooms();
    return Response.json({ data })
}