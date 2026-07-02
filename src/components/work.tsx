"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedContent from "@/components/AnimatedContent";
import { ProjectSlide } from "@/components/project-slide";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SlideAnimState = {
  enter: number;
  reveal: number;
  /** Stack-away — driven by the next slide's enter progress */
  covered: number;
};

type SlideController = {
  state: SlideAnimState;
  apply: () => void;
};

export function Work() {
  const stackRef = useRef<HTMLDivElement>(null);
  const intro = site.projectsIntro;

  useGSAP(
    () => {
      const wrappers = gsap.utils.toArray<HTMLElement>("[data-project-wrapper]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
      const reveals = gsap.utils.toArray<HTMLElement>("[data-project-reveal]");

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

          if (reduceMotion) {
            reveals.forEach((reveal) => gsap.set(reveal, { y: 0 }));
            cards.forEach((card) => gsap.set(card, { scale: 1, y: 0 }));
            return;
          }

          const slides: SlideController[] = [];

          wrappers.forEach((wrapper, i) => {
            const card = cards[i];
            const reveal = reveals[i];
            if (!card || !reveal) return;

            const state: SlideAnimState = { enter: 0, reveal: 0, covered: 0 };

            const apply = () => {
              let scale: number;
              let y = 0;
              const stackGap = 12;

              if (state.covered > 0) {
                scale = gsap.utils.interpolate(1, 0.92, state.covered);
                y = gsap.utils.interpolate(0, -stackGap / 2, state.covered);
              } else {
                scale = gsap.utils.interpolate(0.88, 1, state.enter);
                if (i > 0) {
                  y = gsap.utils.interpolate(stackGap, 0, state.enter);
                }
              }

              gsap.set(card, { scale, y, transformOrigin: "center top" });
              gsap.set(reveal, {
                y: gsap.utils.interpolate(48, 0, state.reveal),
              });
            };

            slides[i] = { state, apply };

            gsap.set(reveal, { y: 48 });

            if (isDesktop) {
              const enterTrigger = ScrollTrigger.create({
                trigger: wrapper,
                start: "top bottom",
                end: "top top",
                scrub: 0.65,
                onUpdate: (self) => {
                  state.enter = self.progress;
                  apply();

                  const prev = slides[i - 1];
                  if (prev) {
                    prev.state.covered = self.progress;
                    prev.apply();
                  }
                },
              });

              const revealTrigger = ScrollTrigger.create({
                trigger: wrapper,
                start: "top top",
                end: "+=45%",
                scrub: 0.65,
                onUpdate: (self) => {
                  state.reveal = self.progress;
                  apply();
                },
              });

              state.enter = enterTrigger.progress;
              state.reveal = revealTrigger.progress;
              apply();
            } else {
              gsap.set(card, { scale: 1, y: 0 });
              gsap.set(reveal, { y: 28 });

              ScrollTrigger.create({
                trigger: wrapper,
                start: "top 88%",
                end: "top 58%",
                scrub: 0.5,
                onUpdate: (self) => {
                  gsap.set(reveal, {
                    y: gsap.utils.interpolate(28, 0, self.progress),
                  });
                },
              });
            }
          });
        },
      );

      return () => mm.revert();
    },
    { scope: stackRef, dependencies: [projects.length] },
  );

  useGSAP(
    () => {
      const refresh = () => ScrollTrigger.refresh();
      const t = window.setTimeout(refresh, 100);
      window.addEventListener("load", refresh);
      return () => {
        window.clearTimeout(t);
        window.removeEventListener("load", refresh);
      };
    },
    { scope: stackRef },
  );

  return (
    <section id="work" className="relative scroll-mt-20 bg-white">
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <div className="text-center">
            <AnimatedContent distance={20} duration={0.5}>
              <p className="mb-6 text-sm text-muted-foreground">
                {intro.strapline}
              </p>
            </AnimatedContent>
            <AnimatedContent distance={30} duration={0.7}>
              <h2 className="mx-auto max-w-3xl text-4xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-6xl">
                <span className="rounded-full bg-foreground px-5 text-background">
                  {intro.lead}
                </span>{" "}
                {intro.tail}{" "}
                <span className="font-serif italic">{intro.serifWord}</span>{" "}
                {intro.end}
              </h2>
            </AnimatedContent>
          </div>
        </div>

        <div ref={stackRef} className="relative">
          {projects.map((project, i) => (
            <ProjectSlide
              key={project.slug}
              project={project}
              index={i}
            />
          ))}
        </div>
      </section>
  );
}
