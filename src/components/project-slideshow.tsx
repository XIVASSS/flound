"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/data/projects";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 4500;

export function useProjectSlideshow(count: number, autoplay: boolean) {
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hold, setHold] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (indexRef.current === index) return;
    const previous = indexRef.current;
    indexRef.current = index;
    if (reduceMotion) {
      setOutgoing(null);
      return;
    }
    setOutgoing(previous);
    const id = window.setTimeout(() => setOutgoing(null), 700);
    return () => window.clearTimeout(id);
  }, [index, reduceMotion]);

  useEffect(() => {
    if (!autoplay || paused || reduceMotion || count < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [autoplay, paused, reduceMotion, count, hold]);

  const select = useCallback((next: number) => {
    setIndex(next);
    setHold((value) => value + 1);
  }, []);

  return { index, outgoing, select, reduceMotion, setPaused };
}

type SlideshowDotsProps = {
  labels: string[];
  index: number;
  onSelect: (index: number) => void;
};

type ProjectStillsProps = {
  images: ProjectImage[];
  activeIndex: number;
  outgoingIndex: number | null;
  reduceMotion: boolean;
  priority?: boolean;
  sizes: string;
  imageClassName?: string;
};

export function ProjectStills({
  images,
  activeIndex,
  outgoingIndex,
  reduceMotion,
  priority = false,
  sizes,
  imageClassName,
}: ProjectStillsProps) {
  return (
    <>
      {images.map((img, imageIndex) => {
        const isActive = imageIndex === activeIndex;
        const isOutgoing = imageIndex === outgoingIndex;
        return (
          <div
            key={img.src}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0",
              img.tone === "dark" ? "bg-[#2d2e32]" : "bg-white",
              !reduceMotion && "transition-opacity duration-700 ease-out",
              isActive || isOutgoing ? "opacity-100" : "opacity-0",
              isActive ? "z-10" : "z-0",
            )}
          >
            <Image
              src={img.src}
              alt={isActive ? img.alt : ""}
              fill
              sizes={sizes}
              draggable={false}
              className={cn(
                img.fit === "cover"
                  ? "object-cover"
                  : "object-contain p-6 sm:p-8",
                imageClassName,
              )}
              priority={priority && imageIndex === 0}
            />
          </div>
        );
      })}
    </>
  );
}

export function SlideshowDots({ labels, index, onSelect }: SlideshowDotsProps) {
  if (labels.length < 2) return null;

  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
      {labels.map((label, dotIndex) => {
        const selected = dotIndex === index;
        return (
          <button
            key={`${dotIndex}-${label}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-label={label}
            onClick={() => onSelect(dotIndex)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              selected
                ? "w-6 bg-neutral-900"
                : "w-1.5 bg-neutral-900/35 hover:bg-neutral-900/60",
            )}
          />
        );
      })}
    </div>
  );
}
