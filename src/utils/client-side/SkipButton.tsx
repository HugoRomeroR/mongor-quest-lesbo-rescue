'use client'

import React, { useState } from 'react';
import '@/stylesCSS/SkipButton.css';

export const SkipButton: React.FC<{text: string, onClick: any}> = ({text, onClick}) => { // eslint-disable-line
  const [hovered, setHovered] = useState(false);

  return (
      <div
        className={`skip-button ${hovered ? 'hovered' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
      >
        <span className="ripple" />
        {text}
      </div>
  );
};