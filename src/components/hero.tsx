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
        <div className="relative z-10 flex items-start justify-between p-6 sm:p-10">
          <AnimatedContent distance={30} duration={0.7}>
            <h1 className="font-heading text-6xl leading-[0.85] font-bold tracking-tight text-white drop-shadow-sm sm:text-8xl lg:text-[9rem]">
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
        <div className="relative z-10 mt-auto flex items-end justify-between gap-6 p-6 sm:p-10">
          <AnimatedContent distance={20} duration={0.6} delay={0.3}>
            <p className="max-w-xs text-2xl leading-tight font-semibold text-white drop-shadow-sm sm:text-3xl">
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
