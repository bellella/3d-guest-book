import { getMessageRooms, getMessagesByRoomId } from "@/lib/db/message.db";
import GuestbookContainer from "./GuestbookContainer";
import Loading from "../_components/Loading";
import CoachMark from "../_components/CoachMark";

export default async function Home() {
  // get message rooms and generate random index
  const messageRooms = await getMessageRooms();
  const randomIndex = Math.ceil(Math.random() * messageRooms.length) - 1;
  // get messages
  const messages = await getMessagesByRoomId(messageRooms[randomIndex].id);
  // generate random index of the rooms
  return (
    <div className="bg-purple-200 border-purple-300 border border-dashed border-2 w-[100%] h-[100vh]">
      <CoachMark/>
      <Loading/>
      <GuestbookContainer
        messages={messages}
        messageRooms={messageRooms}
        activeMessageRoomIndex={randomIndex}
      />
    </div>
  );
}
