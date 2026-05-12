'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'

interface ModelProps {
  url: string
}

function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export function ModelViewer({ url }: ModelProps) {
  return (
    <div className="w-full h-full bg-zinc-950 relative">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera>
            <Model url={url} />
          </Stage>
        </Suspense>
        <OrbitControls 
          autoRotate 
          autoRotateSpeed={0.5} 
          enableZoom={true} 
          makeDefault 
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-zinc-300 text-sm px-6 py-3 rounded-full border border-white/10 pointer-events-none tracking-wide">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  )
}
