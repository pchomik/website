import React, {useEffect, useRef} from 'react';
import {ParticleEngine} from './ParticleEngine';

/**
 * HeroBackground - Canvas-based particle constellation
 * Features:
 * - Responsive particle count (80 desktop, 40 mobile)
 * - Mouse parallax interaction
 * - Smooth floating animation
 * - Automatic cleanup on unmount
 */

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Determine particle count based on screen width
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 80;

    // Initialize particle engine
    const engine = new ParticleEngine(canvas, particleCount);
    engineRef.current = engine;

    // Start animation
    engine.start();

    // Cleanup on unmount
    return () => {
      engine.stop();
    };
  }, []);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (engineRef.current) {
        engineRef.current.resize();
        // Recalculate particle count if crossing mobile threshold
        const isMobile = window.innerWidth < 768;
        const newCount = isMobile ? 40 : 80;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto', // Enable mouse interaction
      }}
      aria-label="Animated particle constellation background"
    />
  );
}
