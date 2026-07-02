"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import AnimatedContent from "@/components/AnimatedContent";
import { site } from "@/data/site";

const hoverSpring = { type: "spring" as const, stiffness: 380, damping: 24, mass: 0.7 };

const cards = [
  { src: "/assets/poplight/poplight-lifestyle.png", rotate: -22, x: -290, lift: 0 },
  { src: "/assets/cardiogram/cardiogram-home.png", rotate: -14, x: -195, lift: 18 },
  { src: "/assets/spira/spira-app.webp", rotate: -7, x: -98, lift: 32 },
  { src: "/assets/cardiogram/cardiogram-ecg.png", rotate: 0, x: 0, lift: 40 },
  { src: "/assets/cardiogram/cardiogram-report.png", rotate: 7, x: 98, lift: 32 },
  { src: "/assets/poplight/poplight-sconce.png", rotate: 14, x: 195, lift: 18 },
  { src: "/assets/cardiogram/cardiogram-metrics.png", rotate: 22, x: 290, lift: 0 },
];

const CARD_W = 124;
const CARD_H = 158;

function CollageCard({
  card,
  index,
  hovered,
  onHover,
}: {
  card: (typeof cards)[number];
  index: number;
  hovered: number | null;
  onHover: (index: number | null) => void;
}) {
  const reduceMotion = useReducedMotion();
  const isHovered = hovered === index;
  const baseZ = 10 - Math.abs(index - 3);

  return (
    <motion.div
      className="absolute cursor-pointer overflow-hidden rounded-[1.25rem] border-2 border-white bg-white will-change-transform"
      style={{
        width: CARD_W,
        height: CARD_H,
        left: card.x - CARD_W / 2,
        bottom: card.lift,
        transformOrigin: "bottom center",
        zIndex: isHovered ? 30 : baseZ,
      }}
      initial={false}
      animate={{
        rotate: card.rotate,
        rotateX: 0,
        scale: 1,
        y: 0,
        boxShadow: "0 4px 14px -4px rgba(0,0,0,0.12)",
      }}
      whileHover={
        reduceMotion
          ? { scale: 1.03, boxShadow: "0 8px 20px -6px rgba(0,0,0,0.18)" }
          : {
              rotate: card.rotate * 0.35,
              rotateX: -10,
              scale: 1.14,
              y: -22,
              boxShadow: "0 28px 50px -14px rgba(0,0,0,0.28)",
            }
      }
      transition={hoverSpring}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
    >
      <motion.div
        className="relative h-full w-full"
        animate={isHovered && !reduceMotion ? { scale: 1.06 } : { scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Image
          src={card.src}
          alt=""
          fill
          sizes={`${CARD_W}px`}
          className="object-cover"
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[1.1rem]"
        initial={false}
        animate={
          isHovered && !reduceMotion
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        transition={{ duration: 0.25 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 45%, transparent 100%)",
        }}
      />
    </motion.div>
  );
}

export function Collage() {
  const c = site.collage;
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden px-6 pt-28 pb-6 sm:pt-32 sm:pb-8">
      <AnimatedContent distance={30} duration={0.7}>
        <h2 className="mx-auto max-w-4xl text-center text-[2rem] leading-[1.2] font-semibold tracking-tight text-neutral-800 sm:text-5xl lg:text-[3.25rem]">
          <span className="block">
            {c.line1.before}{" "}
            <span className="rounded-full bg-neutral-800 px-4 py-0.5 font-bold text-white sm:px-5">
              {c.line1.bold}
            </span>{" "}
            {c.line1.after}
          </span>
          <span className="mt-1 block">
            <span className="font-serif text-neutral-800 italic">
              {c.line2.serif}
            </span>{" "}
            {c.line2.mid}{" "}
            <span className="font-semibold text-neutral-300">{c.line2.faded}</span>
          </span>
          <span className="mt-1 flex flex-wrap items-center justify-center gap-x-2">
            <span>{c.line3.before}</span>
            <span className="inline-flex h-9 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100 sm:h-10 sm:w-14">
              <Image
                src={c.avatar}
                alt=""
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            </span>
            <span className="font-bold">{c.line3.after}</span>
          </span>
        </h2>
      </AnimatedContent>

      {/* Envelope + fanned cards */}
      <div className="relative mx-auto mt-10 max-w-5xl sm:mt-14">
        <div className="relative mx-auto h-[220px] w-full overflow-visible sm:h-[260px]">
          {/* Soft diamond mound */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-0 h-28 w-28 -translate-x-1/2 rotate-45 rounded-[1.75rem] bg-neutral-50 sm:bottom-4 sm:h-32 sm:w-32 sm:rounded-[2rem]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center">
            <svg
              viewBox="0 0 720 120"
              fill="none"
              className="w-[min(94%,700px)] text-neutral-200"
              aria-hidden
            >
              <path
                d="M28 116 Q360 8 692 116"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.35"
              />
            </svg>
          </div>

          {/* Fanned cards — bottom-anchored so they don't bleed into About */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center">
            <div
              className="relative origin-bottom scale-[0.55] sm:scale-[0.72] md:scale-90 lg:scale-100"
              style={{ perspective: 900 }}
            >
              <AnimatedContent distance={40} duration={0.6}>
                <div className="relative h-[198px] w-0">
                  {cards.map((card, i) => (
                    <CollageCard
                      key={card.src + i}
                      card={card}
                      index={i}
                      hovered={hovered}
                      onHover={setHovered}
                    />
                  ))}
                </div>
              </AnimatedContent>

              {/* Handle tag */}
              <div className="absolute -top-2 left-1/2 translate-x-[10.5rem] rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-medium whitespace-nowrap text-white sm:translate-x-[12.5rem] sm:px-4 sm:text-sm">
                {c.handle}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
