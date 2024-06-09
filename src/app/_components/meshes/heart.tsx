// components/Heart.js
import React, { useRef, useState } from 'react';
import { Vector3, useFrame } from '@react-three/fiber';
import HeartGeometry from './heart-geometry';
import { Mesh } from 'three';
import { Text } from '@react-three/drei';
import { useSpring, animated } from 'react-spring';
import { a } from "@react-spring/three";

const Heart = ({position = [0,0,0]}: {position: any}) => {
  const mesh = useRef<Mesh | any>();
  const [hovered, setHover] = useState(false);


  const [selected, setSelected] = useState(false);
  const [active, setActive] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);


  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });
  const { spring:s2 } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  // const [s2, set] = useSpring({
  //   from: {
  //     position: [1000,1000,0],
  //     scale:[0,0,0]
  //   },
  //   to: {
  //     position: [0,0,0],
  //     scale:[1,1,1]
  //   },
  //   config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  // });

  const rotation = spring.to([0,1], [Math.PI, 0]);
  const positionm = s2.to(position, [0,10,10]);
  // useFrame(() => {
  //   if (mesh.current) {
  //     mesh.current.rotation.x += 0.01;
  //     mesh.current.rotation.y += 0.01;
  //   }
  // });
  const handleClick = () => {
    setActive(Number(!active));
  };


  return (
    <a.mesh
      ref={mesh}
      rotation-y={rotation}
      scale={0.5}
      position={(positionm as unknown) as Vector3}

    //   onPointerOver={() => setHover(true)}
    //   onPointerOut={() => setHover(false)}
      //position-y={s2.position}
      onClick={handleClick}
    >
      <HeartGeometry />
      <meshStandardMaterial color="pink" />
      <Text
          fontSize={3.5} // Adjust the font size
          color="black" // Text color
          anchorX="center" // Center the text horizontally
          anchorY="middle" // Center the text vertically
          maxWidth={20}
          position={[5, -10, 1.1]}
        >
          Hi Mina! Long time no see!
        </Text>
    </a.mesh>
  );
};

export default Heart;