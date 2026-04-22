import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/*
  ProjectCube — a 4-face rotating cube showing project imagery.
  - Rotates on Y-axis as the cube scrolls through viewport.
  - When hovered, scroll wheel while over it interactively rotates the cube.
  - Top & bottom faces are dark (never shown in main view).
  - Mobile: static with gentle idle rotation only.
*/

function CubeMesh({ textures, scrollY, hovered, mobileMode, targetRotRef }) {
  const meshRef = useRef();
  const currentRot = useRef(0);

  // BoxGeometry face order: [right(+x), left(-x), top(+y), bottom(-y), front(+z), back(-z)]
  // We want visible rotating faces = front/right/back/left = 4 images.
  const materials = useMemo(() => {
    const front = textures[0];
    const right = textures[1];
    const back = textures[2];
    const left = textures[3];

    [front, right, back, left].forEach((tx) => {
      if (!tx) return;
      tx.colorSpace = THREE.SRGBColorSpace;
      tx.anisotropy = 8;
    });

    const faceMat = (map) =>
      new THREE.MeshStandardMaterial({
        map,
        roughness: 0.35,
        metalness: 0.15,
        emissive: new THREE.Color("#0a0e1a"),
        emissiveIntensity: 0.08,
      });
    const darkMat = new THREE.MeshStandardMaterial({
      color: "#0a0e1a",
      roughness: 0.6,
      metalness: 0.1,
    });
    return [
      faceMat(right), // +x
      faceMat(left),  // -x
      darkMat,        // +y
      darkMat,        // -y
      faceMat(front), // +z
      faceMat(back),  // -z
    ];
  }, [textures]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    let target;
    if (mobileMode) {
      // gentle idle rotation
      currentRot.current += delta * 0.25;
      target = currentRot.current;
    } else {
      target = targetRotRef.current;
      // smooth lerp
      currentRot.current = THREE.MathUtils.lerp(currentRot.current, target, 0.08);
    }
    meshRef.current.rotation.y = mobileMode ? target : currentRot.current;
    // subtle tilt for life
    meshRef.current.rotation.x = Math.sin((mobileMode ? target : currentRot.current) * 0.5) * 0.04;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2.6, 2.6, 2.6]} />
      {materials.map((m, i) => (
        <primitive key={i} object={m} attach={`material-${i}`} />
      ))}
    </mesh>
  );
}

function CubeScene({ imgs, scrollProgress, hovered, mobileMode, targetRotRef }) {
  const textures = useTexture(imgs);
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -2, 4]} color="#1f7ae0" intensity={0.8} />
      <pointLight position={[4, 3, -2]} color="#ef233c" intensity={0.7} />
      <CubeMesh
        textures={textures}
        scrollY={scrollProgress}
        hovered={hovered}
        mobileMode={mobileMode}
        targetRotRef={targetRotRef}
      />
    </>
  );
}

export default function ProjectCube({ project }) {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  const targetRotRef = useRef(0);
  const scrollBase = useRef(0);
  const hoverBonus = useRef(0);

  // detect mobile
  useEffect(() => {
    const check = () => setMobileMode(window.innerWidth < 768 || window.matchMedia("(hover: none)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-driven base rotation (based on element position in viewport)
  useEffect(() => {
    if (mobileMode) return;
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when element enters bottom, 1 when it leaves top
      const progress = 1 - (rect.top + rect.height / 2) / vh;
      // map progress to rotation (~1.5 full turns across viewport pass)
      scrollBase.current = progress * Math.PI * 2.2;
      targetRotRef.current = scrollBase.current + hoverBonus.current;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMode]);

  // Hover + wheel interactive rotation
  useEffect(() => {
    if (mobileMode) return;
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (!hovered) return;
      // do not preventDefault: allow page to still scroll; we just add bonus rotation
      hoverBonus.current += e.deltaY * 0.006;
      targetRotRef.current = scrollBase.current + hoverBonus.current;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [hovered, mobileMode]);

  const imgs = project.faces; // [front, right, back, left]

  return (
    <div
      ref={containerRef}
      className={`cube-card ${hovered ? "is-hover" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="cube-stage">
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.4, 5.2], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
        >
          <CubeScene
            imgs={imgs}
            hovered={hovered}
            mobileMode={mobileMode}
            targetRotRef={targetRotRef}
          />
        </Canvas>
        <div className="cube-glow" />
      </div>

      <div className="cube-info">
        <div className="cube-info-row">
          <h3>{project.title}</h3>
          <span className="cube-year">{project.year}</span>
        </div>
        <p>{project.desc}</p>
        <a
          className="cube-link"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Play / Download
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
