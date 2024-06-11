import { getGuestMessages } from "@/lib/db/guest_message.db";
import GuestbookContainer from "./GuestbookContainer";

export default async function Home() {
  const guestMessages = await getGuestMessages();

  return (
    <div className="bg-purple-200 border-purple-300 border border-dashed border-2 w-[100%] h-[100vh]">
      <GuestbookContainer guestMessages={guestMessages}/>
    </div>
  );
}
