import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Scanline,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import { Suspense } from "react";
import { Void } from "./Void";

/**
 * Fixed full-screen WebGL layer behind the DOM. Renders the 3D void and the
 * CRT post-processing stack. Only mounted on capable (non-lite) devices.
 */
export function CanvasLayer() {
  return (
    <div className="sys-canvas-layer" aria-hidden>
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 9], fov: 60 }}
      >
        <color attach="background" args={["#05060a"]} />
        <ambientLight intensity={0.6} />
        <Suspense fallback={null}>
          <Void />
        </Suspense>

        <EffectComposer multisampling={0}>
          <Bloom intensity={0.7} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new Vector2(0.0009, 0.0012)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Scanline blendFunction={BlendFunction.OVERLAY} density={1.3} opacity={0.25} />
          <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.35} />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
