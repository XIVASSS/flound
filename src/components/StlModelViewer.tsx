"use client";

import { Suspense, useLayoutEffect, useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { Box3, Vector3, type BufferGeometry } from "three";

const TARGET_SIZE = 2.4;

function normalizeGeometry(geometry: BufferGeometry, scale = 1) {
  const geo = geometry.clone();
  geo.computeVertexNormals();
  geo.computeBoundingBox();

  const box = geo.boundingBox ?? new Box3();
  const size = new Vector3();
  box.getSize(size);

  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const fit = (TARGET_SIZE / maxDim) * scale;
    geo.scale(fit, fit, fit);
  }

  geo.center();
  geo.computeBoundingBox();
  return geo;
}

type StlMeshProps = {
  url: string;
  color: string;
  scale?: number;
};

function StlMesh({ url, color, scale = 1 }: StlMeshProps) {
  const geometry = useLoader(STLLoader, url) as BufferGeometry;

  const normalized = useMemo(
    () => normalizeGeometry(geometry, scale),
    [geometry, scale],
  );

  useLayoutEffect(() => {
    return () => normalized.dispose();
  }, [normalized]);

  return (
    <mesh geometry={normalized} castShadow receiveShadow>
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.5} />
    </mesh>
  );
}

export type StlModelViewerProps = {
  url: string;
  color?: string;
  scale?: number;
  className?: string;
  showHint?: boolean;
};

export function StlModelViewer({
  url,
  color = "#b8b8b8",
  scale = 1,
  className = "",
  showHint = true,
}: StlModelViewerProps) {
  return (
    <div
      className={`relative h-full w-full cursor-grab select-none touch-none active:cursor-grabbing ${className}`}
      onDragStart={(event) => event.preventDefault()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: "transparent", touchAction: "none" }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          canvas.draggable = false;
          canvas.style.userSelect = "none";
          canvas.addEventListener("dragstart", (event) => event.preventDefault());
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 6]} intensity={1.2} />
        <directionalLight position={[-4, -3, -5]} intensity={0.4} />
        <Suspense fallback={null}>
          <StlMesh url={url} color={color} scale={scale} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 1.4}
        />
      </Canvas>
      {showHint && (
        <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[10px] text-muted-foreground/50">
          Drag to rotate
        </p>
      )}
    </div>
  );
}
