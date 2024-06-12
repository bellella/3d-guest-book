import create from 'zustand';
import { Message, MessageRoom } from '@prisma/client';

interface MessageState {
  messages: Message[];
  activeMessageIndex: number | null;
  setActiveMessageIndex: (index: number | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  messageRooms: MessageRoom[];
  activeMessageRoomIndex: number | null;
  setMessageRooms: (messages: MessageRoom[]) => void;
  setActiveMessageRoomIndex: (index: number | null) => void;
  currentRoom: () => MessageRoom | null;
  getMessageFromApi: () => Promise<void>;
}

const useMessageStore = create<MessageState>((set,get) => ({
  messages: [],
  activeMessageIndex: null,
  setActiveMessageIndex: (activeMessageIndex) => set({ activeMessageIndex }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
    activeMessageIndex: state.messages.length
  })),
  messageRooms: [],
  activeMessageRoomIndex: null,
  setMessageRooms: (messageRooms) => set({messageRooms}),
  setActiveMessageRoomIndex: (activeMessageRoomIndex) => set({ activeMessageRoomIndex }),
  currentRoom: () => get().messageRooms[get().activeMessageRoomIndex ?? 0],
  getMessageFromApi: async () => {
    const res = await fetch('/api/messages?roomId='+get().currentRoom()?.id);
    const data = (await res.json()).data;
    set({ messages: data });
  }
}));

export default useMessageStore;