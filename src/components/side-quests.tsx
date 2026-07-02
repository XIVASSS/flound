"use client";

import Image from "next/image";
import AnimatedContent from "@/components/AnimatedContent";
import { site } from "@/data/site";

export function SideQuests() {
  const s = site.sideQuests;

  return (
    <section className="bg-neutral-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <AnimatedContent distance={30} duration={0.7}>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span className="rounded-full bg-foreground px-5 text-background">
                {s.title}
              </span>{" "}
              {s.titleAccent}
            </h2>
          </AnimatedContent>
          <AnimatedContent distance={20} duration={0.5} delay={0.15}>
            <p className="mx-auto mt-5 max-w-md text-sm text-muted-foreground">
              {s.subtitle}
            </p>
          </AnimatedContent>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-2">
          {s.items.map((item, i) => (
            <AnimatedContent
              key={item.image}
              distance={30}
              duration={0.6}
              delay={i * 0.1}
              className="h-full"
            >
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
                <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-10">
                  <Image
                    src={item.image}
                    alt=""
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
