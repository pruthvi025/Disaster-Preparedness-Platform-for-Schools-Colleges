'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function SpaceSphere() {
  const { camera } = useThree()
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_brightness: { value: 0.6 },
    u_density: { value: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.4 : 0.8 },
  }), [])

  useFrame((state, delta) => {
    uniforms.u_time.value += delta
    if (meshRef.current) {
      // Keep the star sphere centered on the camera so it acts as a skybox
      meshRef.current.position.copy(camera.position)
    }
  })

  // Simple hash for star placement on unit sphere direction
  const fragmentShader = /* glsl */`
    precision highp float;
    varying vec3 vWorldDir;
    uniform float u_time;
    uniform float u_brightness;
    uniform float u_density;

    float hash(vec3 p) {
      p = fract(p * 0.3183099 + vec3(0.1,0.2,0.3));
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    void main() {
      vec3 d = normalize(vWorldDir);
      float h = hash(floor(d * 1200.0)); // resolution of sampling grid
      float star = step(1.0 - 0.002 * u_density, h); // sparse tiny points

      // Twinkle
      float twinkle = 0.8 + 0.2 * sin(u_time * 2.2 + h * 40.0);
      float intensity = star * twinkle * u_brightness;

      // Soft bloom around stars
      float glow = star * smoothstep(1.0, 0.999, h);
      vec3 col = vec3(intensity);
      col += glow * 0.06;

      gl_FragColor = vec4(col, 1.0);
    }
  `

  const vertexShader = /* glsl */`
    varying vec3 vWorldDir;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldDir = worldPosition.xyz - cameraPosition;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[200, 32, 32]} />
      <shaderMaterial
        args={[{
          uniforms,
          vertexShader,
          fragmentShader,
          side: THREE.BackSide,
          depthWrite: false,
          depthTest: false,
        }]}
      />
    </mesh>
  )
}

export default function StarsBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        <SpaceSphere />
      </Canvas>
    </div>
  )
}


