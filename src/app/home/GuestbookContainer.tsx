"use client";
import React from "react";
import GuestCanvas from "../_components/3d/GuestCanvas";
import HeartModal from "../_components/HeartModal";
import Version from "../_components/Version";
import useMessageStore from "@/lib/stores/message.store";
import { Message, MessageRoom } from "@prisma/client";
import RoomHandler from "../_components/RoomHandler";

export default function GuestbookContainer({
  messages: OriginalMessages,
  messageRooms,
  activeMessageRoomIndex,
}: {
  messages: Message[];
  messageRooms: MessageRoom[];
  activeMessageRoomIndex: number;
}) {
  const {
    setMessages,
    setMessageRooms,
    setActiveMessageRoomIndex,
    activeMessageIndex,
  } = useMessageStore();

  // const { data, error, isLoading } = useSWR('/api/message', () => {
  //   return activeMessageIndex ? getMessagesById(messageRooms[activeMessageIndex].id) : [];
  // }, {active: false});

  React.useEffect(() => {
    // set original messages and rooms
    setMessages(OriginalMessages);
    setMessageRooms(messageRooms);
    setActiveMessageRoomIndex(activeMessageRoomIndex);
  }, [
    OriginalMessages,
    setMessages,
    setMessageRooms,
    setActiveMessageRoomIndex,
  ]);
  //   const [guestMessages, setGuestMessages] = React.useState<GuestMessage[]>(
  //     OriginalGuestMessages
  //   );
  return (
    <>
      <RoomHandler />
      <GuestCanvas />
      <HeartModal />
      <Version />
    </>
  );
}
