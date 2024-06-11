import { GuestMessage } from "@prisma/client";
import prisma from "./prisma";
import { cache } from 'react'

// export function getGuestMessages(): Promise<GuestMessage[]> {
//     return prisma.guestMessage.findMany();
// }

export const getGuestMessages = cache(() => {
  return prisma.guestMessage.findMany();
});