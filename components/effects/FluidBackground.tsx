'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.3;
    
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;
    
    float d = length(p - (uMouse * 2.0 - 1.0));
    float wave = sin(d * 8.0 - time) * 0.05;
    
    // Light-themed colors
    vec3 color1 = vec3(0.0, 0.48, 0.37); // #007a5e
    vec3 color2 = vec3(0.14, 0.24, 0.55); // #243c8b
    vec3 color3 = vec3(0.96, 0.97, 0.98); // Light #f4f7fa
    
    float noise = sin(uv.x * 3.0 + time) * cos(uv.y * 3.0 + time) * 0.5 + 0.5;
    vec3 baseColor = mix(color1, color2, noise);
    
    // Very subtle glow
    float glow = 0.02 / (d + 0.8);
    baseColor += glow * color1;
    
    // Mix heavily with light background
    vec3 finalColor = mix(color3, baseColor, 0.04 + wave * 0.02);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function FluidPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { size } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) }
  }), [size]);

  useFrame((state) => {
    const { clock, mouse: stateMouse } = state;
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uMouse.value.x += (stateMouse.x * 0.5 + 0.5 - uniforms.uMouse.value.x) * 0.02;
    uniforms.uMouse.value.y += (stateMouse.y * 0.5 + 0.5 - uniforms.uMouse.value.y) * 0.02;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function FluidBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#f4f7fa]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FluidPlane />
      </Canvas>
    </div>
  );
}
