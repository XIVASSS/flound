"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type IPhoneMockupProps = {
  screenSrc: string;
  screenAlt: string;
  className?: string;
  priority?: boolean;
};

export function IPhoneMockup({
  screenSrc,
  screenAlt,
  className,
  priority = false,
}: IPhoneMockupProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[280px] sm:max-w-[320px]", className)}>
      <div className="absolute top-[1.7%] right-[6.2%] bottom-[1.7%] left-[6.2%] overflow-hidden rounded-[2.35rem] bg-black sm:rounded-[2.65rem]">
        <Image
          src={screenSrc}
          alt={screenAlt}
          fill
          sizes="(max-width: 640px) 280px, 320px"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
      <Image
        src="/assets/shared/iphone-mockup.png"
        alt=""
        width={640}
        height={1280}
        className="relative z-10 h-auto w-full pointer-events-none select-none"
        priority={priority}
        aria-hidden
      />
    </div>
  );
}
