'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScroll;

  varying vec2 vUv;

  //	Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    float m3 = 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h ).z;
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.15;
    
    // Domain warping
    vec2 p = uv * 3.0;
    float n1 = snoise(p + time + uScroll * 0.1);
    float n2 = snoise(p + n1 + time * 0.8);
    float n3 = snoise(p + n2 + time * 1.2);
    
    // Mouse influence
    float d = distance(uv, uMouse);
    float mouseForce = smoothstep(0.4, 0.0, d);
    n3 += mouseForce * 0.5;
    
    // Colors
    vec3 color1 = vec3(0.0, 0.48, 0.37); // #007a5e
    vec3 color2 = vec3(0.14, 0.24, 0.55); // #243c8b
    vec3 color3 = vec3(0.45, 0.75, 0.27); // #74C044
    vec3 bgColor = vec3(0.96, 0.97, 0.98); // #f4f7fa
    
    vec3 mix1 = mix(color1, color2, n1 * 0.5 + 0.5);
    vec3 mix2 = mix(mix1, color3, n2 * 0.5 + 0.5);
    
    // Final composite
    float finalAlpha = smoothstep(-0.2, 0.8, n3);
    vec3 finalColor = mix(bgColor, mix2, finalAlpha * 0.15);
    
    // Add subtle highlights
    finalColor += mouseForce * color1 * 0.05;
    
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

interface FluidPlaneProps {
  shouldReduceMotion: boolean | null;
}

function FluidPlane({ shouldReduceMotion }: FluidPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uScroll: { value: 0 }
  }), [size]);

  useFrame((state, delta) => {
    const { mouse: stateMouse } = state;
    
    // Slow down time significantly for reduced motion
    const timeScale = shouldReduceMotion ? 0.05 : 0.15;
    // Manual increment to avoid THREE.Clock deprecation warnings
    uniforms.uTime.value += delta * timeScale;
    
    // Smooth mouse and scroll follow (slower for reduced motion)
    const lerpFactor = shouldReduceMotion ? 0.01 : 0.05;
    uniforms.uMouse.value.x += (stateMouse.x * 0.5 + 0.5 - uniforms.uMouse.value.x) * lerpFactor;
    uniforms.uMouse.value.y += (stateMouse.y * 0.5 + 0.5 - uniforms.uMouse.value.y) * lerpFactor;
    
    // Smooth scroll follow
    const targetScroll = typeof window !== 'undefined' ? window.scrollY * 0.001 : 0;
    uniforms.uScroll.value += (targetScroll - uniforms.uScroll.value) * lerpFactor;
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 bg-[#f4f7fa]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FluidPlane shouldReduceMotion={shouldReduceMotion} />
      </Canvas>
    </div>
  );
}
