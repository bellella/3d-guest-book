import GuestCanvas from "./_components/3d/GuestCanvas";
import { getGuestMessages } from "@/lib/db/guest_message.db";

export default async function Home() {
  const guestMessages = await getGuestMessages();

  return (
      <GuestCanvas guestMessages={guestMessages}/>
  );
}
