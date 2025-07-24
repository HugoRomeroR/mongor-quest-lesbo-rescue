'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import { TypeWriter } from '@/utils/AnimatedText';
import '@/stylesCSS/GlobalLayout.css'

const delayMs = 500;

export default function Preludio() {
  const imgRef = useRef<HTMLImageElement>(null);
  const txtRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [firstTime, setFirstTime] = useState<boolean>(true);

  // Imagenes del preludio, en orden
  const images = useMemo(() => [
    "https://placehold.co/600x400",
    "https://placehold.co/600x500",
    "https://placehold.co/600x600",
    "https://placehold.co/200x200",
    "https://placehold.co/100x400",
    "https://placehold.co/600x50",
    "https://placehold.co/1000x1000",
  ], []);

  // Texto del preludio, en orden
  const texts = useMemo(() => [
    "Probando scroll con imagenes",
    "Texto de prueba este es un texto de prueba",
    "Esto es solamente un texto de prueba para ver si funciona",
    "<-- El scroll incluye una imagen y un texto.",
    "El texto se muestra de a poco en la pantalla",
    "Al dar click en el texto, este se mostrara por completo de una vez",
    "Sin tener que esperar a que cargue.",
  ], []);

  useEffect(() => {
    const container = document.getElementById('container');
    const handleScroll = () => {
      const scrollY = container?.scrollTop ?? 0;
      const sectionHeight = window.innerHeight;
      const index = Math.round(scrollY / sectionHeight);

      if (index !== currentIndex) {
        if (imgRef.current) {
          imgRef.current.style.opacity = '0';
        }
        if (txtRef.current) {
          txtRef.current.style.opacity = '0';
        }
        setTimeout(() => {
          setCurrentIndex(index);
          if (imgRef.current) {
            imgRef.current.src = images[index];
            imgRef.current.style.opacity = '1';
          }
          if (txtRef.current) {
            txtRef.current.style.opacity = '1';
          }
        }, delayMs);
      }
    };
    
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [currentIndex, images]);

  useEffect(() => {
    setFirstTime(false);
  }, []);
  

  return (
    <div ref={bodyRef} style={styles.body}>
      {/* Se crean tantas secciones como imagenes haya, todas 
      del tamaño del viewport del navegador del jugador, estan
      todas vacias, pero sirven como anclas para el scroll */}
      <div className='scroll-container' id='container' style={styles.container}>
        {images.map((_, idx) => (
          <div style={styles.section} key={idx} />
        ))}
      </div>

      {/* El contenido cambia dinamicamente dependiendo del porcentaje
      de scroll, es decir, la seccion en la que se encuentra. El contenido
      esta fijado a la pantalla, pero como se desvanece, esto no se nota. */}
      <div style={styles.contentWrapper}>
        {/* Inicia con la primera imágen, y una referencia al <img> */}
        <div style={styles.imageWrapper}>
          <img // eslint-disable-line
            ref={imgRef}
            src={images[0]}
            alt="imagen"
            style={{ ...styles.fadeImage, opacity: firstTime ? '0' : '1' }}
          />
        </div>
        {/* Inicia con el primer texto */}
        <div style={styles.textWrapper} ref={txtRef}>
          <TypeWriter text={texts[currentIndex]} forwardedRef={bodyRef} />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    margin: 0,
    padding: 0,
    scrollBehavior: 'smooth',
    height: '100%',
    width: '100%',
    fontFamily: 'sans-serif',
    background: 'black',
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
    transition: `opacity ${delayMs}ms ease-in-out`,
    color: 'white',
    boxSizing: 'border-box',
    pointerEvents: 'auto',
  },
  fadeImage: {
    width: 'calc(100vw - 40px)',
    height: 'calc(100vh - 40px)',
    transition: `opacity ${delayMs}ms ease-in-out`,
    boxSizing: 'border-box',
  },
};