"use client";

import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/BlurText";
import { processSteps } from "@/data/services";

export function Process() {
  return (
    <section id="process" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12">
          <AnimatedContent distance={20} duration={0.5}>
            <p className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
              How we work
            </p>
          </AnimatedContent>
          <BlurText
            text="Three steps to production"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
            delay={80}
            animateBy="words"
            direction="bottom"
          />
          <AnimatedContent distance={20} duration={0.5} delay={0.2}>
            <p className="mt-3 max-w-md text-[15px] text-muted-foreground">
              From discovery to App Store — a clear path for hardware-connected
              products.
            </p>
          </AnimatedContent>
        </div>

        <div className="space-y-5">
          {processSteps.map((step, i) => (
            <AnimatedContent
              key={step.step}
              distance={20}
              duration={0.5}
              delay={i * 0.12}
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center pt-1">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                    {step.step}
                  </div>
                  {step.step !== "03" && (
                    <div className="mt-2 w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-4">
                  <h3 className="mb-2 text-sm font-medium">{step.title}</h3>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
