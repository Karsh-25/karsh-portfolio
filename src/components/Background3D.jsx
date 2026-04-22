import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ===== COLORS ===== */
const COLORS = {
  red: "#ef233c",
  blue: "#1f7ae0",
  white: "#f5f7ff",
};

/* ===== FLOATING SHAPES ===== */
function FloatingShape({ position, scale, color, speed, wireframe, shape }) {
  const ref = useRef();
  const t0 = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + t0;
    if (!ref.current) return;

    ref.current.position.y = position[1] + Math.sin(t) * 0.6;
    ref.current.position.x = position[0] + Math.cos(t * 0.6) * 0.4;
    ref.current.rotation.x = t * 0.25;
    ref.current.rotation.y = t * 0.18;
  });

  let geometry;
  if (shape === "octa") geometry = <octahedronGeometry args={[1, 0]} />;
  else if (shape === "tetra") geometry = <tetrahedronGeometry args={[1, 0]} />;
  else geometry = <icosahedronGeometry args={[1, 0]} />;

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={wireframe ? 0.8 : 0.25}
        wireframe={wireframe}
        transparent
        opacity={wireframe ? 0.85 : 0.35}
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  );
}

/* ===== PARTICLES ===== */
function WebParticles({ count = 300, darkMode }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color={darkMode ? COLORS.white : "#1f4e7a"}
        size={0.04}
        transparent
        opacity={darkMode ? 0.75 : 0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ===== SCENE ===== */
function Scene({ darkMode }) {
  const shapes = useMemo(
    () => [
      { position: [-5, 2, -2], scale: 1.1, color: COLORS.red, speed: 0.3, wireframe: true, shape: "icosa" },
      { position: [5, 1.5, -3], scale: 0.9, color: COLORS.blue, speed: 0.25, wireframe: false, shape: "octa" },
      { position: [-3, -2, -1], scale: 0.7, color: COLORS.white, speed: 0.4, wireframe: true, shape: "tetra" },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={darkMode ? 0.35 : 0.7} />

      <pointLight position={[8, 6, 6]} color={COLORS.red} intensity={1} />
      <pointLight position={[-8, -4, 6]} color={COLORS.blue} intensity={1} />

      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}

      <WebParticles darkMode={darkMode} />

      <fog attach="fog" args={[darkMode ? "#05070f" : "#e9f5ff", 8, 22]} />
    </>
  );
}

/* ===== MAIN COMPONENT ===== */
export default function Background3D({ darkMode = true }) {
  return (
    <div
      className={`bg3d-canvas ${darkMode ? "dark" : "light"}`}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene darkMode={darkMode} />
      </Canvas>

      <div className="bg3d-vignette" />
      <div className="bg3d-grid" />
    </div>
  );
}