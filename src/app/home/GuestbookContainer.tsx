'use client'
import React from "react";
import GuestCanvas from "../_components/3d/GuestCanvas";
import HeartModal from "../_components/HeartModal";
import Version from "../_components/Version";
import { GuestMessage } from "@prisma/client";
import useMessageStore from "@/lib/stores/message.store";

export default function GuestbookContainer({
  guestMessages: OriginalGuestMessages,
}: {
  guestMessages: GuestMessage[];
}) {
    const setGuestMessages = useMessageStore((state) => state.setGuestMessages);

    React.useEffect(() => {
        setGuestMessages(OriginalGuestMessages);
      }, [OriginalGuestMessages, setGuestMessages]);
//   const [guestMessages, setGuestMessages] = React.useState<GuestMessage[]>(
//     OriginalGuestMessages
//   );
  return (
    <>
      <GuestCanvas />
      <HeartModal/>
      <Version />
    </>
  );
}
