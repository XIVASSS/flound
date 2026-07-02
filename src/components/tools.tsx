"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TILE = 128;
const LOGO = 64;
const RADIUS = 220;
const LINE_GAP = 142;

function getCirclePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.cos(angle) * RADIUS,
    y: Math.sin(angle) * RADIUS,
    rotation: (angle * 180) / Math.PI + 90,
  };
}

function getLinePosition(index: number, total: number, gap: number) {
  const start = -((total - 1) * gap) / 2;
  return { x: start + index * gap, y: 0, rotation: 0 };
}

function getLineGap(total: number) {
  return Math.min(
    LINE_GAP,
    Math.max(TILE + 10, (window.innerWidth - 80) / Math.max(total - 1, 1)),
  );
}

function getLineScale(total: number, gap: number) {
  const lineWidth = (total - 1) * gap + TILE;
  return Math.min(1, (window.innerWidth - 80) / lineWidth);
}

function ToolTile({
  tool,
}: {
  tool: (typeof site.tools.items)[number];
}) {
  return (
    <div
      data-tool-tile
      className={`absolute flex items-center justify-center rounded-[24px] border border-neutral-200/70 shadow-[0_14px_40px_-10px_rgba(0,0,0,0.2)] will-change-transform ${tool.bg}`}
      style={{
        width: TILE,
        height: TILE,
        marginLeft: -TILE / 2,
        marginTop: -TILE / 2,
      }}
      title={tool.name}
    >
      {/* Native img keeps official SVG colors — Next/Image can flatten them */}
      <img
        src={tool.logo}
        alt={tool.name}
        width={LOGO}
        height={LOGO}
        className={`h-16 w-16 object-contain p-1 ${"logoClass" in tool ? tool.logoClass : ""}`}
        draggable={false}
      />
    </div>
  );
}

export function Tools() {
  const t = site.tools;
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const n = t.items.length;

  useGSAP(
    () => {
      const tiles = gsap.utils.toArray<HTMLElement>("[data-tool-tile]");
      const intro = introRef.current;
      const center = centerRef.current;
      const orbit = orbitRef.current;
      const pin = pinRef.current;
      if (!tiles.length || !intro || !center || !orbit || !pin) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };

          const applyCircle = () => {
            tiles.forEach((tile, i) => {
              const circle = getCirclePosition(i, n);
              gsap.set(tile, {
                x: circle.x,
                y: circle.y,
                rotation: circle.rotation,
                force3D: true,
              });
            });
            gsap.set(orbit, { scale: 1 });
            gsap.set(intro, { opacity: 0, y: -8 });
            gsap.set(center, { opacity: 1, scale: 1 });
          };

          applyCircle();

          if (!isDesktop || reduceMotion) return;

          const resetLine = () => {
            const gap = getLineGap(n);
            const scale = getLineScale(n, gap);

            tiles.forEach((tile, i) => {
              const line = getLinePosition(i, n, gap);
              gsap.set(tile, {
                x: line.x,
                y: line.y,
                rotation: line.rotation,
              });
            });
            gsap.set(orbit, { scale });
            gsap.set(intro, { opacity: 1, y: 0 });
            gsap.set(center, { opacity: 0, scale: 0.94 });
          };

          resetLine();

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=75%",
            pin: pin,
            scrub: 0.75,
            invalidateOnRefresh: true,
            onRefresh: resetLine,
            onUpdate: (self) => {
              const p = self.progress;
              const gap = getLineGap(n);
              const lineScale = getLineScale(n, gap);

              tiles.forEach((tile, i) => {
                const line = getLinePosition(i, n, gap);
                const circle = getCirclePosition(i, n);
                gsap.set(tile, {
                  x: gsap.utils.interpolate(line.x, circle.x, p),
                  y: gsap.utils.interpolate(line.y, circle.y, p),
                  rotation: gsap.utils.interpolate(
                    line.rotation,
                    circle.rotation,
                    p,
                  ),
                });
              });

              gsap.set(orbit, {
                scale: gsap.utils.interpolate(lineScale, 1, p),
              });

              gsap.set(intro, {
                opacity: gsap.utils.interpolate(1, 0, Math.min(p / 0.5, 1)),
                y: gsap.utils.interpolate(0, -12, Math.min(p / 0.5, 1)),
              });

              const centerP = gsap.utils.clamp(0, 1, (p - 0.4) / 0.45);
              gsap.set(center, {
                opacity: centerP,
                scale: gsap.utils.interpolate(0.94, 1, centerP),
              });
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [n] },
  );

  return (
    <section id="approach" ref={sectionRef} className="bg-neutral-50">
      <div
        ref={pinRef}
        className="relative hidden min-h-svh flex-col items-center justify-center gap-6 overflow-visible px-4 py-8 md:flex"
      >
        <div ref={introRef} className="mx-auto max-w-3xl shrink-0 text-center">
          <p className="mb-2 text-sm text-neutral-500 sm:text-[15px]">
            {t.strapline}
          </p>
          <h2 className="text-[2rem] leading-[1.12] font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.25rem]">
            {t.headline.before}
            <span className="font-semibold text-neutral-300">
              {t.headline.faded}
            </span>
            {t.headline.after}{" "}
            <span className="mt-1 inline-flex rounded-full bg-neutral-900 px-6 py-1.5 align-middle text-white sm:px-8 sm:py-2">
              {t.headline.pill}
            </span>
          </h2>
        </div>

        <div className="relative w-full max-w-[100vw] overflow-visible">
          <div
            className="relative mx-auto overflow-visible"
            style={{ width: RADIUS * 2 + TILE, height: RADIUS * 2 + TILE }}
          >
            <div
              ref={centerRef}
              className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
            >
              <p className="mb-2 text-xs font-medium tracking-widest text-neutral-500 uppercase">
                {t.eyebrow}
              </p>
              <h3 className="max-w-[15rem] text-2xl font-bold tracking-tight text-neutral-900">
                {t.heading}
              </h3>
            </div>

            <div className="absolute inset-0 flex items-center justify-center overflow-visible">
              <div ref={orbitRef} className="relative h-0 w-0 overflow-visible">
                {t.items.map((tool) => (
                  <ToolTile key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-10 md:hidden">
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-2 text-sm text-neutral-500">{t.strapline}</p>
          <h2 className="mb-6 text-[1.75rem] leading-[1.12] font-semibold tracking-tight text-neutral-900">
            {t.headline.before}
            <span className="font-semibold text-neutral-300">
              {t.headline.faded}
            </span>
            {t.headline.after}{" "}
            <span className="mt-1 inline-flex rounded-full bg-neutral-900 px-5 py-1.5 align-middle text-base text-white">
              {t.headline.pill}
            </span>
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {t.items.map((tool) => (
              <div
                key={tool.name}
                className={`flex h-[88px] items-center justify-center rounded-[22px] border border-neutral-200/80 shadow-lg ${tool.bg}`}
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  width={44}
                  height={44}
                  className={`h-11 w-11 object-contain p-0.5 ${"logoClass" in tool ? tool.logoClass : ""}`}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
