import create from 'zustand';
import { GuestMessage } from '@prisma/client';

interface MessageState {
  guestMessages: GuestMessage[];
  activeMessageIndex: number | null;
  setGuestMessages: (messages: GuestMessage[]) => void;
  addGuestMessage: (message: GuestMessage) => void;
  setActiveMessageIndex: (index: number | null) => void;
}

const useMessageStore = create<MessageState>((set) => ({
  guestMessages: [],
  activeMessageIndex: null,
  setGuestMessages: (messages) => set({ guestMessages: messages }),
  addGuestMessage: (message) => set((state) => ({
    guestMessages: [message, ...state.guestMessages],
    activeMessageIndex: 0
  })),
  setActiveMessageIndex: (index) => set({ activeMessageIndex: index }),
}));

export default useMessageStore;