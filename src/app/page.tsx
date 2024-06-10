import GuestCanvas from "./_components/3d/GuestCanvas";
import { getGuestMessages } from "@/lib/db/guest_message.db";
import HeartModal from "./_components/HeartModal";

export default async function Home() {
  const guestMessages = await getGuestMessages();

  return (
    <div className="bg-purple-200 border-purple-300 border border-dashed border-2 w-[100%] h-[100vh]">
      <GuestCanvas guestMessages={guestMessages} />
      <HeartModal/>
    </div>
  );
}
