
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Book3D({ color = "#ff9800", title = "Book" }) {
  return (
    <div style={{ width: 220, height: 320, background: "#222", borderRadius: 16, boxShadow: "0 8px 32px #0006", margin: 16, padding: 8 }}>
      <Canvas style={{ height: 200 }} camera={{ position: [2, 2, 2] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} />
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1.5, 0.2]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      <div style={{ color: color, fontWeight: "bold", fontSize: 20, textAlign: "center", marginTop: 12 }}>{title}</div>
    </div>
  );
}

export default Book3D;
