'use client'

import React, { useState, useEffect, ReactNode } from 'react';

interface GradientProps {
  children: ReactNode;
  intensity?: number;
}

// Componente que retorna un foco de luz que sigue el mouse por la pantalla
export const GradientFollowMouse: React.FC<GradientProps> = ({children, intensity = 0.5}) => {
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x: `${x}%`, y: `${y}%` });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        transition: 'background 0.1s ease',
        background: `radial-gradient(circle at ${mousePos.x} ${mousePos.y}, rgba(255,255,255,${intensity}), rgba(255,255,255,0))`,
      }}
    >
      {children}
    </div>
  );
};