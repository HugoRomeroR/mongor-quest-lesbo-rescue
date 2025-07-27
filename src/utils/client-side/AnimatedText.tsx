'use client'

import { useEffect, useState, RefObject } from 'react';
import '@/stylesCSS/AnimatedText.css'

interface TypeWriterProps {
  text: string;
  delay?: number;
  forwardedRef?: RefObject<any> | null; // eslint-disable-line
  instant?: boolean;
  align?: string;
}

// Componente que renderiza un texto con animacion de typewrite
export const TypeWriter: React.FC<TypeWriterProps> = ({ text, delay = 30, forwardedRef = undefined, instant = false, align = 'center' }) => {
  const [reset, setReset] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [visibleText, setVisibleText] = useState('');
  let globalIdx = 0;

  useEffect(() => {
    setReset(true);
    setSkipAnimation(false);
    setVisibleText('');
    const timeout = setTimeout(() => {
      setReset(false)
      setVisibleText(text);
    }, 100);
    return () => clearTimeout(timeout);
  }, [text]);

  useEffect(() => {
    const el = forwardedRef?.current;
    if (!el) return;

    const handleClick = () => {
      setSkipAnimation(true);
    };

    el.addEventListener('click', handleClick);

    return () => el.removeEventListener('click', handleClick);
  }, [forwardedRef]);

  const animationStyle = () => {
    if (skipAnimation || reset) {
      return 'none';
    } else if (instant) {
      return 'fadeIn 0ms ease forwards';
    } else {
      return 'fadeIn 400ms ease forwards';
    }
  };

  const animationDelayMs = (delay: number) => {
    if (skipAnimation || reset) {
      return undefined;
    } else {
      return `${delay}ms`;
    }
  };
  
  return (
    <div 
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: `${align}`,
        height: '100%',
        width: '100%',
      }}
      onClick={forwardedRef ? undefined : () => setSkipAnimation(true)}
    >
      {visibleText.split(' ').map((word, wordIdx) => (
        <span
          key={wordIdx}
          style={{
            display: 'inline-block',
            marginRight: '0.25em',
            whiteSpace: 'nowrap',
          }}
        >
          {word.split('').map((char, charIdx) => {
            const currentIdx = globalIdx++;
            return (
            <span
              key={charIdx}
              style={{
                opacity: skipAnimation ? 1 : 0,
                animation: animationStyle(),
                animationDelay: animationDelayMs(currentIdx * delay),
                whiteSpace: 'pre',
              }}
            >
              {char}
            </span>
          )})}
        </span>
      ))}
    </div>
  );
};