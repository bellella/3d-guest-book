// components/HeartGeometry.js
import React, { useEffect, useMemo } from 'react';
import { Shape, ExtrudeGeometry } from 'three';

const HeartGeometry = () => {
  const heartShape = useMemo(() => {
    const x = 0, y = 0;

    const heartShape = new Shape();
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    return heartShape;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      steps: 2,
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 2,
    }),
    []
  );

  const geometry = useMemo(() => new ExtrudeGeometry(heartShape, extrudeSettings), [heartShape, extrudeSettings]);

  useEffect(() => {
    // Flip the geometry
    geometry.rotateX(Math.PI);

    // Center the geometry
    geometry.center();
  }, [geometry]);

  return <primitive object={geometry} attach="geometry" />;
};

export default HeartGeometry;