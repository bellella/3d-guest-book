'use client'
import { Canvas } from '@react-three/fiber';
import React from 'react';
import HeartModal from '../HeartModal';
import Heart3 from '../meshes/heart3';
import { GuestMessage } from '@prisma/client';

export default function GuestCanvas({guestMessages}: {guestMessages: GuestMessage[]}) {
  return (
    <>
    <Canvas camera={{ position: [0, 0, 100], fov: 15 }} style={{ width: '100vw', height: '100vh'}}>
    <ambientLight intensity={1.7} />
    <hemisphereLight
        groundColor={'#505050'}
        intensity={0.5}
        position={[0, 50, 0]}
      />
    <pointLight position={[10, 10, 10]} />
    <group>
      {guestMessages.map((_, index) => (
        <Heart3 
        name={_.name}
        message={_.message}
        key={index} position={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30]} />
      ))}
    </group>
  </Canvas>
  <HeartModal>
  </HeartModal>
  </>
  );
};