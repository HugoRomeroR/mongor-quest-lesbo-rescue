'use client'

import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface TiltWrapperProps {
  children: ReactNode;
  intensity?: number;
}

// Componente que transforma un children en un contenedor con tilt effect
export const TiltWrapper: React.FC<TiltWrapperProps> = ({ children, intensity = 30 }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('rotateX(0deg) rotateY(0deg)');

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX / innerWidth - 0.5) * 2; // rango -1 y 1
      const offsetY = (e.clientY / innerHeight - 0.5) * 2; // rango -1 y 1

      const rotateX = -offsetY * intensity;
      const rotateY = offsetX * intensity;

      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };

    const handleMouseLeave = () => {
      setTransform('rotateX(0deg) rotateY(0deg)');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={wrapperRef}
      style={{
        ...styles.tiltWrapper,
        transform,
      }}
    >
      {children}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  tiltWrapper: {
    perspective: '1000px',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.2s ease',
    willChange: 'transform',
    height: '100%',
    width: '100%',
  },
};