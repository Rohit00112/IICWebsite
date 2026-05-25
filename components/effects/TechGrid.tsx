'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

function GridParticles({ count = 400, shouldReduceMotion }: { count?: number; shouldReduceMotion: boolean | null }) {
  const points = useRef<THREE.Points>(null!);

  // Create static particle positions in a grid-like structure but with noise
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const step = Math.sqrt(count);

    for (let i = 0; i < count; i++) {
      const x = (i % step) / step * 4 - 2;
      const y = Math.floor(i / step) / step * 4 - 2;
      const z = (Math.random() - 0.5) * 0.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (shouldReduceMotion) return;

    const time = state.clock.getElapsedTime();
    const positions = points.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Gentle floating animation
      positions[i3 + 2] += Math.sin(time + positions[i3] * 2) * 0.001;
    }
    points.current.geometry.attributes.position.needsUpdate = true;

    // Rotate the entire grid slightly based on mouse
    points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, state.mouse.y * 0.1, 0.05);
    points.current.rotation.y = THREE.MathUtils.lerp(points.current.rotation.y, -state.mouse.x * 0.1, 0.05);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
          count={particles.length / 3}
          array={particles}
          itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#21409A"
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  );
}

export default function TechGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-30">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <GridParticles shouldReduceMotion={shouldReduceMotion} />
      </Canvas>
    </div>
  );
}
