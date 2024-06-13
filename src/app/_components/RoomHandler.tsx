import useMessageStore from "@/lib/stores/message.store";
import React from "react";
import clsx from 'clsx';

const RoomHandler: React.FC = () => {
  const { messageRooms, activeMessageRoomIndex, setActiveMessageRoomIndex, getMessageFromApi } = useMessageStore();
  const changeRoom = (index: number) => {
    setActiveMessageRoomIndex(index);
    getMessageFromApi();
  }
  return (
    <div className="fixed z-10 top-4 right-5 text-purple-900">
      <div className="flex gap-3">
      {messageRooms.map((room, index) => (
        <button 
        key={index}
        onClick={() => changeRoom(index)}
        className={clsx('cursor-pointer rounded-full w-6 h-6 text-xs block', activeMessageRoomIndex === index ? 
          'bg-purple-500 text-white' : 'bg-purple-100 text-purple-400'
        )}>
          {index + 1}
        </button>
      ))}
      </div>
    </div>
  );
};

export default RoomHandler;
