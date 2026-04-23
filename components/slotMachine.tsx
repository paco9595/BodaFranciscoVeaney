// components/SlotMachine.tsx
'use client'; // Necesario en Next.js App Router

import { useEffect, useRef } from 'react';
import { Application, Assets, Sprite, Container } from 'pixi.js';

export default function SlotMachine() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Crear la app PixiJS — resizeToScreen hace el trabajo responsive
    const app = new Application();
    
    (async () => {
      await app.init({
        resizeTo: canvasRef.current!, // Se adapta al contenedor
        backgroundColor: 0x1a1a2e,
        antialias: true,
        resolution: window.devicePixelRatio || 1, // Clave para Retina/HDPI
        autoDensity: true,
      });

      canvasRef.current!.appendChild(app.canvas);

      // 2. Cargar assets...
      // 3. Crear los carretes...
      // 4. Lógica de spin...
    })();

    // Cleanup al desmontar el componente
    return () => {
      app.destroy(true, { children: true, texture: true });
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
    />
  );
}