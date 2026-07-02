"use client";

import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/BlurText";
import { CapabilitiesDashboard } from "@/components/capabilities/CapabilitiesDashboard";

export function Services() {
  return (
    <section id="services" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <AnimatedContent distance={20} duration={0.5}>
            <p className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
              What we do
            </p>
          </AnimatedContent>
          <BlurText
            text="Elegant solutions built on proven methodologies"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
            delay={60}
            animateBy="words"
            direction="bottom"
          />
          <AnimatedContent distance={20} duration={0.5} delay={0.2}>
            <p className="mt-3 max-w-md text-[15px] text-muted-foreground">
              App development, hardware integration, and AI — built as one
              product experience.
            </p>
          </AnimatedContent>
        </div>

        <AnimatedContent distance={20} duration={0.5} delay={0.1}>
          <CapabilitiesDashboard />
        </AnimatedContent>
      </div>
    </section>
  );
}
