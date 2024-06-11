'use client';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState, useRef } from 'react';
import Heart3 from '../meshes/heart3';
import { GuestMessage } from '@prisma/client';
import CameraAnimation from './CameraAnimation';

export default function GuestCanvas({ guestMessages }: { guestMessages: GuestMessage[] }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // 활성화된 하트를 추적

  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current) {
        setCanvasSize({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize(); // 초기 설정
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const generateRandomPosition = () => {
    const rangeX = canvasSize.width * 0.05;
    const rangeY = canvasSize.height * 0.05;
    const rangeZ = 50;

    const x = (Math.random() - 0.5) * rangeX;
    const y = (Math.random() - 0.5) * rangeY;
    const z = (Math.random() - 0.5) * rangeZ;

    return [x, y, z];
  };

  const handleHeartClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index)); // 클릭 시 활성화된 하트를 업데이트
  };

  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }} style={{ width: '100%', height: '100%' }}>
        <CameraAnimation />
        <ambientLight intensity={1.7} />
        <hemisphereLight groundColor={'#505050'} intensity={1} position={[0, 50, 0]} />
        <group>
          {guestMessages.map((guest, index) => (
            <Heart3
              key={index}
              name={guest.name}
              message={guest.message}
              position={generateRandomPosition()}
              isActive={activeIndex === index}
              onClick={() => handleHeartClick(index)}
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
}