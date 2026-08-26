import React, { useRef, useState } from 'react';
import { sound } from '../utils/soundFX';

interface HoloCard3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  onClick?: () => void;
  id?: string;
}

export const HoloCard3D: React.FC<HoloCard3DProps> = ({
  children,
  className = '',
  glowColor = 'rgba(14, 165, 233, 0.4)',
  intensity = 15,
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -intensity;
    const rotY = ((x - centerX) / centerX) * intensity;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.6,
    });
  };

  const handleMouseEnter = () => {
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      className={`group relative transition-all duration-300 ease-out ${className}`}
    >
      {/* 3D Rotatable Shell */}
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
        className="relative w-full h-full rounded-3xl"
      >
        {/* Dynamic Specular Glare */}
        <div
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor} 0%, transparent 65%)`,
            opacity: glarePos.opacity,
            transition: 'opacity 0.3s ease-out',
          }}
          className="absolute inset-0 rounded-3xl pointer-events-none z-30 mix-blend-screen"
        />

        {/* 2030 Hologram Border Glow */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-cyan-500/30 via-indigo-500/20 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-[1px] z-10" />

        {/* Card Content with 3D Depth */}
        <div
          style={{ transform: 'translateZ(20px)' }}
          className="relative w-full h-full z-20 rounded-3xl overflow-hidden"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
