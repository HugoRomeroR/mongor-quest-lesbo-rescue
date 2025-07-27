'use client';

import React, { useEffect, useRef } from 'react';
import { GetRandomizedColor } from '@/utils/server-side/RandomizedColor';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  depth: number;
  drift: number;
  color: string;
}

interface FloatingParticlesProps {
  count?: number;
  color?: string;
}

// Crea una particula con coordenadas, tamaño, velocidad, profundidad y drift aleatorio.
// Ademas, le agrega un color semi-aleatorio derivado de uno como base.
const createParticle = (baseColor: string): Particle => {
  const depth = Math.random();
  return {
    id: Math.random(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: 4 + Math.random() * 6,
    speed: 0.3 + Math.random() * 0.4,
    depth,
    drift: (Math.random() - 0.5) * 1,
    color: GetRandomizedColor({baseHex: baseColor, sVariation: 0.3, lVariation: 0}),
  };
};

// Componente que renderiza particulas flotantes que van cayendo por la pantalla.
export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 80,
  color = '#FFFFFF',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const particles = useRef<Particle[]>([]);
  const mouseX = useRef<number>(0.5);

  useEffect(() => {
    particles.current = Array.from({ length: count }, () => createParticle(color));

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX / window.innerWidth;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      particles.current.forEach((p, i) => {
        const el = particlesRef.current[i];
        if (!el) return;

        // Calcula un bias en el rango de -0.75 y 0.75
        const bias = (0.5 - mouseX.current) * 1.5;
        // Calcula la nueva posicion usando la velocidad y la profundidad
        p.y += p.speed * (1 + p.depth);
        // Lo mismo que arriba, pero añadiendole el bias y el drift
        p.x += bias * (1 - p.depth) * 2 + p.drift;

        // Reciclaje si sale de la pantalla
        if (p.y > window.innerHeight + 100) {
          p.y = -20;
          p.x = Math.random() * window.innerWidth;
        }

        el.style.transform = `translate(${p.x}px, ${p.y}px) scaleY(1.2)`;
      });

      // Se vuelve a llamar a si mismo, formando un bucle
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [count, color]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {particles.current.map((p, i) => (
        <div
          key={p.id}
          ref={(el) => {
            particlesRef.current[i] = el!;
          }}
          style={{
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            borderRadius: '50%',
            opacity: 1 - p.depth * 0.8,
            filter: `blur(${1.5 + p.depth * 3}px)`,
            pointerEvents: 'none',
            transform: `translate(${p.x}px, ${p.y}px) scaleY(1.2)`,
          }}
        />
      ))}
    </div>
  );
};
