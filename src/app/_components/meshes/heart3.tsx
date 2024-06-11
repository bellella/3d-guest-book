import React, { useRef, useState, useEffect } from 'react';
import { a, useSpring } from '@react-spring/three';
import HeartGeometry from './heart-geometry';
import { Text } from '@react-three/drei';

interface Heart3Props {
  name: string;
  message: string;
  position: number[];
  isActive: boolean;
  onClick: () => void;
}

export default function Heart3({ name, message, position: originalPosition, isActive, onClick }: Heart3Props) {
  const mesh = useRef();
  const [finished, setFinished] = useState(true);

  const calculateFontSize = (text: string) => {
    const baseSize = 2.8; // Base font size
    const maxLength = 20; // Maximum length before scaling down
    return Math.max(baseSize - (text.length / maxLength) * baseSize, 0.5);
  };

  const calculateScale = () => {
    if (window.innerWidth < 600) return 0.2; // Small screens
    if (window.innerWidth < 1200) return 0.3; // Medium screens
    return 0.4; // Large screens
  };

  const { floatPosition } = useSpring({
    from: { floatPosition: originalPosition[1] },
    to: { floatPosition: originalPosition[1] - 0.7 },
    loop: { reverse: true },
    config: { duration: 1000 },
    delay: Math.floor(Math.random() * 500),
  });

  const { position, scale, rotation } = useSpring({
    position: isActive ? [0, 0, 50] : originalPosition,
    scale: isActive ? calculateScale() + 0.1 : calculateScale(),
    rotation: !isActive ? [0, Math.PI, 0] : [0, 0, 0],
    config: { duration: 1000 },
    onRest: () => {
      setFinished(true);
    }
  });

  const fontSize = calculateFontSize(message);

  return (
    <a.mesh
      rotation={rotation as any}
      position-y={(!isActive && finished) ? floatPosition : null}
      position={position as any}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        if (finished) { // 애니메이션이 끝난 상태일 때만 클릭 허용
          onClick();
        }
      }}
    >
      <HeartGeometry />
      <meshStandardMaterial color="#ff4d89" />
      <Text
        anchorX="center"
        textAlign="center"
        anchorY="middle"
        maxWidth={22}
        position={[0, 4, 2]}
        lineHeight={1.2}
      >
        <Text color="black" fontSize={1.7} position-y={0}>
          From {name}
        </Text>
        <Text color="black" fontSize={fontSize} position-y={-3}>
          {message}
        </Text>
      </Text>
    </a.mesh>
  );
}