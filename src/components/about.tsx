"use client";

import { useId, type ReactNode } from "react";
import Image from "next/image";
import AnimatedContent from "@/components/AnimatedContent";
import { site } from "@/data/site";

function AboutArrow() {
  const markerId = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 300 100"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute top-[12.5rem] left-[2.75rem] z-10 hidden h-[6.25rem] w-[18.75rem] overflow-visible text-neutral-900 md:block lg:top-[13rem] lg:left-[3.25rem] lg:h-[6.5rem] lg:w-[20rem]"
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          markerWidth="7"
          markerHeight="7"
          refX="8.5"
          refY="5"
          orient="auto"
        >
          <path
            d="M 1.5 1.5 L 8.5 5 L 1.5 8.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      <path
        d="M 58 6 C 18 38, 44 94, 286 84"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  );
}

function Highlight({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-neutral-900">{children}</span>;
}

export function About() {
  const a = site.about;

  return (
    <section id="about" className="relative z-10 bg-background px-6 pt-16 pb-12 sm:pt-20 sm:pb-16">
      <div className="relative mx-auto flex max-w-4xl flex-col items-start gap-10 md:flex-row md:items-center md:gap-12 lg:gap-14">
        <AboutArrow />
        <AnimatedContent distance={30} duration={0.7}>
          <div className="relative shrink-0">
            <div className="relative h-48 w-48 overflow-hidden rounded-[2.5rem] shadow-[0_10px_36px_rgba(0,0,0,0.12)] sm:h-52 sm:w-52">
              <Image
                src={a.portrait}
                alt="flound"
                fill
                sizes="208px"
                className="object-cover"
              />
            </div>
          </div>
        </AnimatedContent>

        <div className="flex-1">
          <AnimatedContent distance={20} duration={0.6} delay={0.15}>
            <div className="space-y-4 text-[1.0625rem] leading-snug text-neutral-500 sm:text-lg sm:leading-[1.55]">
              <p>
                flound is a <Highlight>product</Highlight> studio building at
                the seam of <Highlight>software and hardware</Highlight>. With
                years shipping{" "}
                <Highlight>apps, connected devices, and AI features</Highlight>
                , we help founders turn ideas into real, usable products.
              </p>
              <p>
                We design and build the whole stack — mobile and web apps, BLE
                and IoT integrations, and AI that lives inside the experience.
              </p>
              <p>
                Let&apos;s create something extraordinary together.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={20} duration={0.6} delay={0.3}>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById(a.ctaHref.replace("#", ""))
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-6 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {a.ctaLabel}
            </button>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
