import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Grid, Stars } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "../lib/scroll";

type ShapeKind = "octahedron" | "icosahedron" | "tetrahedron";

/** A slowly drifting wireframe artifact floating deep in the void. */
function FloatingShape({
  position,
  scale,
  speed,
  color,
  kind,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
  kind: ShapeKind;
}) {
  const ref = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + seed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.5;
    ref.current.rotation.x = t * 0.08;
    ref.current.rotation.y = t * 0.12;
  });

  return (
    <group ref={ref} position={position}>
      <mesh scale={scale}>
        {kind === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {kind === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {kind === "tetrahedron" && <tetrahedronGeometry args={[1, 0]} />}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

export function Void() {
  const camRig = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    const kinds: ShapeKind[] = ["octahedron", "icosahedron", "tetrahedron"];
    return Array.from({ length: 7 }).map((_, i) => {
      // keep them off to the sides and pushed back so they read as ambient depth
      const side = i % 2 === 0 ? 1 : -1;
      return {
        position: [
          side * (6 + Math.random() * 9),
          (Math.random() - 0.5) * 9,
          -10 - Math.random() * 20,
        ] as [number, number, number],
        scale: 0.7 + Math.random() * 1.1,
        speed: 0.15 + Math.random() * 0.25,
        color: Math.random() > 0.5 ? "#2aa9a0" : "#1084d0",
        kind: kinds[i % kinds.length],
      };
    });
  }, []);

  // Subtle scroll-driven dolly + parallax (teaser for the Phase 2 fly-through).
  useFrame((state) => {
    if (!camRig.current) return;
    const p = scrollState.progress;
    const t = state.clock.elapsedTime;
    camRig.current.position.z = THREE.MathUtils.lerp(camRig.current.position.z, -p * 26, 0.06);
    camRig.current.position.x = THREE.MathUtils.lerp(
      camRig.current.position.x,
      Math.sin(p * Math.PI * 2) * 3 + Math.sin(t * 0.2) * 0.3,
      0.05
    );
    camRig.current.position.y = THREE.MathUtils.lerp(
      camRig.current.position.y,
      Math.sin(p * Math.PI * 3) * 1.6,
      0.05
    );
    // bank into the turns for a flying-through-space feel
    const mx = state.pointer.x * 0.6;
    const my = state.pointer.y * 0.4;
    camRig.current.rotation.z = THREE.MathUtils.lerp(
      camRig.current.rotation.z,
      Math.cos(p * Math.PI * 2) * 0.05,
      0.04
    );
    camRig.current.rotation.y = THREE.MathUtils.lerp(camRig.current.rotation.y, mx * 0.08, 0.05);
    camRig.current.rotation.x = THREE.MathUtils.lerp(camRig.current.rotation.x, -my * 0.05, 0.05);
  });

  return (
    <group ref={camRig}>
      <fog attach="fog" args={["#05060a", 8, 34]} />
      <Stars radius={60} depth={40} count={1400} factor={3} saturation={0} fade speed={0.6} />

      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}

      {/* Receding wireframe floor */}
      <Grid
        position={[0, -4.5, -6]}
        args={[60, 60]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#0a8d8d"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#1084d0"
        fadeDistance={40}
        fadeStrength={2}
        infiniteGrid
      />
      <Grid
        position={[0, 5, -6]}
        args={[60, 60]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#0a3d4d"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#0a5d6d"
        fadeDistance={40}
        fadeStrength={2}
        infiniteGrid
      />
    </group>
  );
}
