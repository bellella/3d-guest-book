import * as React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import useMessageStore from '@/lib/stores/message.store';

const CameraAnimation = () => {
  // TODO code refactoring!!
  const {activeMessageRoomIndex} = useMessageStore();
  const [initialize, setInitialize] = React.useState(false);
  const { camera } = useThree();
  const [spring, api] = useSpring(() => ({
    position: [0, -50, 100],
  }), []);

  React.useEffect(() => {
    api.start({
        position: [0, 0, 100],
        config: { duration: 1500 },
    });
    setInitialize(true);
  }, [api]);

  React.useEffect(() => {
    if(initialize) {
      api.start({
        from: {
          position: [0, -50, 100],
        },
        to: {
          position: [0, 0, 100],
        },
        config: { duration: 1500 },
      });
    }
  }, [activeMessageRoomIndex]);

  useFrame(() => {
    camera.position.set(...(spring.position.get() as [number, number, number]));
  });

  return null;
};

export default CameraAnimation;
