"use client";

import Image from "next/image";
import AnimatedContent from "@/components/AnimatedContent";
import { site } from "@/data/site";

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden p-3 sm:p-4">
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-[28px] sm:rounded-[36px]">
        <Image
          src="/assets/hero/great-wave.jpg"
          alt="The Great Wave off Kanagawa"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

        {/* Top row: wordmark + CTA */}
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-3 p-5 sm:p-10">
          <AnimatedContent distance={30} duration={0.7}>
            <h1 className="font-heading text-5xl leading-[0.85] font-bold tracking-tight text-white drop-shadow-sm sm:text-7xl lg:text-8xl xl:text-[9rem]">
              {site.hero.wordmark}
            </h1>
          </AnimatedContent>

          <AnimatedContent distance={20} duration={0.6} delay={0.2}>
            <button
              type="button"
              onClick={() => scrollTo(site.hero.resumeHref.replace("#", ""))}
              className="rounded-full bg-black/80 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-black"
            >
              {site.hero.resumeLabel}
            </button>
          </AnimatedContent>
        </div>

        {/* Bottom row: taglines */}
        <div className="relative z-10 mt-auto flex items-end justify-between gap-4 p-5 pb-24 sm:gap-6 sm:p-10 sm:pb-24 lg:pb-10">
          <AnimatedContent distance={20} duration={0.6} delay={0.3}>
            <p className="max-w-[16rem] text-xl leading-tight font-semibold text-white drop-shadow-sm sm:max-w-xs sm:text-3xl">
              {site.hero.taglineLeft}
            </p>
          </AnimatedContent>

          <AnimatedContent distance={20} duration={0.6} delay={0.4}>
            <p className="hidden max-w-[16rem] text-right text-sm leading-relaxed text-white/85 sm:block">
              {site.hero.subheadRight}
            </p>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
