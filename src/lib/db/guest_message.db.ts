import { GuestMessage } from "@prisma/client";
import prisma from "./prisma";

export function getGuestMessages(): Promise<GuestMessage[]> {
    return prisma.guestMessage.findMany();
}