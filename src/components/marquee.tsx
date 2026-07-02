"use client";

import { ScrollVelocity } from "@/components/ScrollVelocity";
import { marqueeItems } from "@/data/services";

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-muted/30 py-12">
      <ScrollVelocity
        texts={marqueeItems}
        velocity={40}
        className="font-bold tracking-wider text-muted-foreground/20 uppercase"
        numCopies={8}
        scrollerClassName="!text-3xl md:!text-5xl !font-bold"
      />
    </div>
  );
}
