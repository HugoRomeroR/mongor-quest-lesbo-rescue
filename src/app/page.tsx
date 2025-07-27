'use client'

import { useMemo } from 'react';
import { NarrativeDisplay } from '@/utils/client-side/NarrativeDisplay';
import { SkipButton } from '@/utils/client-side/SkipButton';

export default function Preludio() {

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

  return (
    <>
      <NarrativeDisplay delayMs={800} images={images} texts={texts} />
      <SkipButton text="Saltar Intro" onClick={() => (window.location.href = "inicio")}/>
    </>
  );
};