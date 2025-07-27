'use client'

import { useEffect, useRef, useState } from 'react';
import { TypeWriter } from '@/utils/client-side/AnimatedText';
import { TiltWrapper } from '@/utils/client-side/TiltWrapper';
import { FloatingParticles } from '@/utils/client-side/FloatingParticles';
import { GradientFollowMouse } from '@/utils/client-side/GradientFollowMouse';
import '@/stylesCSS/GlobalLayout.css'

interface NarrativeDisplayProps {
  delayMs?: number;
  images: string[];
  texts: string[];
}

// Componente que renderiza una imagen a la izquierda y un texto a la derecha.
export const NarrativeDisplay: React.FC<NarrativeDisplayProps> = ({delayMs = 500, images, texts}) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [firstTime, setFirstTime] = useState<boolean>(true);

  useEffect(() => {
    const container = document.getElementById('container');
    const handleScroll = () => {
      const scrollY = container?.scrollTop ?? 0;
      const sectionHeight = window.innerHeight;
      const index = Math.round(scrollY / sectionHeight);

      if (index !== currentIndex) {
        if (bodyRef.current) {
          bodyRef.current.style.opacity = '0';
        }
        setTimeout(() => {
          setCurrentIndex(index);
          if (bodyRef.current) {
            bodyRef.current.style.opacity = '1';
          }
        }, delayMs);
      }
    };
    
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [currentIndex, images, delayMs]);

  useEffect(() => {
    setFirstTime(false);
  }, []);
  

  return (
    <div style={styles.bodyWrapper}>
      <div ref={bodyRef} style={{ transition: `opacity ${delayMs}ms ease-in-out` }}>
        <GradientFollowMouse intensity={0.08}>
          <FloatingParticles color="#22252b" />
          
          {/* Tantas secciones como imagenes haya */}
          <div className='scroll-container' id='container' style={styles.container}>
            {images.map((_, idx) => (
              <div style={styles.section} key={idx} />
            ))}
          </div>

          {/* Contenido de la pagina */}
          <div style={styles.contentWrapper}>
            <div style={styles.imageWrapper}>
              <TiltWrapper intensity={15}>
                <img // eslint-disable-line
                  src={images[currentIndex]}
                  alt="imagen"
                  style={{ ...styles.fadeImage, opacity: firstTime ? '0' : '1' }}
                />
              </TiltWrapper>
            </div>
            <div style={styles.textWrapper}>
              <TypeWriter text={texts[currentIndex]} forwardedRef={bodyRef} />
            </div>
          </div>
        </GradientFollowMouse>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  bodyWrapper: {
    margin: 0,
    padding: 0,
    scrollBehavior: 'smooth',
    height: '100%',
    width: '100%',
    fontFamily: 'sans-serif',
    background: '#02020A',
  },
  container: {
    height: '100vh',
    scrollSnapType: 'y mandatory',
    overflowY: 'scroll',
    background: 'transparent',
  },
  section: {
    height: '100%',
    scrollSnapAlign: 'start',
    background: 'transparent',
  },
  contentWrapper: {
    position: 'fixed',
    padding: '20px',
    width: '100%',
    boxSizing: 'border-box',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'row',
    gap: '24px',
  },
  imageWrapper: {
    userSelect: 'none',
    width: '50%',
  },
  textWrapper: {
    width: '50%',
    height: 'auto',
    fontSize: '24px',
    color: 'white',
    boxSizing: 'border-box',
    pointerEvents: 'auto',
  },
  fadeImage: {
    width: 'calc(100vw - 40px)',
    height: 'calc(100vh - 40px)',
    boxSizing: 'border-box',
  },
};