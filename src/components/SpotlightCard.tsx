"use client";

import React, { useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsActive(false);
  };

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-border bg-card overflow-hidden p-8 ${className}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${
          isActive ? "opacity-60" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, var(--spotlight-color), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
