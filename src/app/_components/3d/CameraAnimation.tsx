import * as React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import { Vector3 } from 'three';
import useMessageStore from '@/lib/stores/message.store';

const CameraAnimation = () => {
  const {activeMessageRoomIndex} = useMessageStore();
  const { camera } = useThree();
  const [spring, api] = useSpring(() => ({
    position: [0, -50, 100],
  }), []);

  React.useEffect(() => {
    api.start({
        position: [0, 0, 100],
        config: { duration: 1500 },
    });
  }, [api]);

  useFrame(() => {
    camera.position.set(...(spring.position.get() as [number, number, number]));
  });

  return null;
};

export default CameraAnimation;
