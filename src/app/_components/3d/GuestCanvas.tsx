'use client';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState, useRef } from 'react';
import Heart3 from '../meshes/heart3';
import CameraAnimation from './CameraAnimation';
import useMessageStore from '@/lib/stores/message.store';

export default function GuestCanvas() {
  const {messages, activeMessageIndex, activeMessageRoomIndex, setActiveMessageIndex} = useMessageStore();
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleHeartClick = (index: number) => {
    setActiveMessageIndex(activeMessageIndex === index ? null : index); // 클릭 시 활성화된 하트를 업데이트
  };
  // if(!messages || !activeMessageIndex) {
  //   console.log(messages)
  // }

  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }} style={{ width: '100%', height: '100%' }}>
        <CameraAnimation />
        <ambientLight intensity={1.7} />
        <hemisphereLight groundColor={'#505050'} intensity={1} position={[0, 50, 0]} />
        <group>
          {messages.map((msg, index) => (
            <Heart3
              key={`${index}${activeMessageRoomIndex}`}
              name={msg.name}
              message={msg.message}
              isActive={activeMessageIndex === index}
              onClick={() => handleHeartClick(index)}
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
}