import React, { useRef, useState, useEffect } from 'react';
import { a, useSpring, useSpringRef } from '@react-spring/three';
import HeartGeometry from './heart-geometry';
import { Text } from '@react-three/drei';

interface Heart3Props {
  name: string;
  message: string;
  position: [number, number, number];
}

export default function Heart3({ name, message, position: originalPosition }: Heart3Props) {
  const mesh = useRef();
  const [active, setActive] = useState(false);
  const [finished, setFinished] = useState(true);
  
  // Spring refs for chaining
  const positionRef = useSpringRef();
  let floatRef = useSpringRef();
  
  // Floating animation
  const { floatPosition } = useSpring({
    from: { floatPosition: originalPosition[1] },
    to: { floatPosition: originalPosition[1] - 0.7 },
    loop: { reverse: true },
    config: { duration: 1000 },
    delay: Math.floor(Math.random() * 500),
  });

    const { position, scale, rotation } = useSpring({
    position: active ? [0,0,50] : originalPosition,
    scale: active ? 0.4 : 0.3,
    rotation: !active ? [0, Math.PI, 0] : [0, 0, 0],
    config: { duration: 1000 },
    onRest: () => {
      console.log("Animation finished!");
      setFinished(true);
    }
  });

    // Function to calculate font size based on text length
    const calculateFontSize = (text: string) => {
      const baseSize = 2.8; // Base font size
      const maxLength = 20; // Maximum length before scaling down
      return Math.max(baseSize - (text.length / maxLength) * baseSize, 0.5);
    };

    const fontSize = calculateFontSize(message);


  // Chain animations
  return (
    <a.mesh
      rotation={rotation as any}
      position-y={(!active && finished) ? floatPosition : null}
      position={position as any}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        setFinished(false);
        setActive(!active);
      }}
    >
      <HeartGeometry />
      <meshStandardMaterial color="#ff4d89" />
      <Text
        color="white"
        anchorX="center"
        textAlign="center"
        anchorY="middle"
        maxWidth={22}
        position={[0, 4, 2]}
        lineHeight={1.2}
      >
        <Text fontSize={1.7} position-y={0}>
        name: {name}
        </Text>
        <Text fontSize={fontSize} position-y={-3}>
        {message}
        </Text>
      </Text>
    </a.mesh>
  );
}