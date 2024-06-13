import React, { useState, useEffect, useCallback } from 'react';
import { a, useSpring } from '@react-spring/three';
import HeartGeometry from './heart-geometry';
import { Text } from '@react-three/drei';
import { ga } from '@/lib/gtag';

interface Heart3Props {
  name: string;
  message: string;
  isActive: boolean;
  onClick: () => void;
}

const Heart3: React.FC<Heart3Props> = ({ name, message, isActive, onClick }) => {
  const [originalPosition, setOriginalPosition] = useState<[number, number, number]>(() => generateRandomPosition());
  const [finished, setFinished] = useState(true);

  // 폰트 크기 계산
  const calculateFontSize = useCallback((text: string) => {
    const baseSize = 3; // Base font size
    const maxLength = 30; // Maximum length before scaling down
    return Math.max(baseSize - (text.length / maxLength) * baseSize, 1);
  }, []);

  // 스케일 계산
  const calculateScale = useCallback(() => {
    if (window.innerWidth < 600) return 0.2; // Small screens
    if (window.innerWidth < 1200) return 0.3; // Medium screens
    return 0.4; // Large screens
  }, []);

  // 초기 위치 설정 및 리사이즈 이벤트 처리
  useEffect(() => {
    const updateSize = () => {
      const position = generateRandomPosition();
      setOriginalPosition(position);
    };
    updateSize();

    // window.addEventListener('resize', updateSize);
    // return () => window.removeEventListener('resize', updateSize);
  }, []);

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
    onRest: () => setFinished(true),
  });

  // 랜덤 위치 생성
  function generateRandomPosition(): [number, number, number] {
    const rangeX = window.innerHeight * 0.03;
    const rangeY = window.innerWidth * 0.03;
    const rangeZ = 50;

    const x = (Math.random() - 0.5) * rangeX;
    const y = (Math.random() - 0.5) * rangeY;
    const z = (Math.random() - 0.5) * rangeZ;

    return [x, y, z];
  }

  const fontSize = calculateFontSize(message);

  return (
    <a.mesh
      rotation={rotation as any}
      position={position as any}
      position-y={(!isActive && finished) ? floatPosition : null}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        ga({
          action: '메세지 클릭',
          category: '메세지'
      });
        if (finished) { // 애니메이션이 끝난 상태일 때만 클릭 허용
        setFinished(false);
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
        position={[0, 4.5, 2]}
        lineHeight={1.2}
      >
        <Text color="black" fontSize={1.7} font="/fonts/Nunito-MediumItalic.ttf">
          From {name}
        </Text>
        <Text color="black" maxWidth={20} 
        fontSize={fontSize} 
        position-y={-1.3*fontSize} 
        textAlign="center"
        anchorX="center"
        anchorY="top"
        whiteSpace="normal"
        font="/fonts/Nunito-Medium.ttf">
          {message}
        </Text>
      </Text>
    </a.mesh>
  );
};

export default Heart3;