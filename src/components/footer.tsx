"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";

function SocialIcon({ icon }: { icon: string }) {
  const common = "h-4 w-4";
  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "x") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
        <path d="M17.5 3h3l-7 8 8.2 10h-6.4l-5-6.1L8 21H5l7.5-8.6L4.5 3h6.6l4.5 5.6L17.5 3zm-1 16h1.7L8.5 4.8H6.7L16.5 19z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3V9zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 21 11 21 14v7h-4v-6.2c0-1.5-.03-3.4-2.07-3.4-2.07 0-2.39 1.6-2.39 3.3V21H9V9z" />
    </svg>
  );
}

export function Footer() {
  const f = site.footer;
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <footer id="contact" className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-[28px] bg-neutral-950 text-white sm:rounded-[36px]">
        <div className="px-8 pt-14 sm:px-14 sm:pt-20">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">
            f
          </div>
          <h2 className="mt-6 max-w-xl text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
            {f.headline}
          </h2>
          <a
            href={f.ctaHref}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-90"
          >
            {f.ctaLabel}
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="mx-8 mt-14 flex flex-col gap-6 border-t border-white/10 py-8 sm:mx-14 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            {f.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-xs text-white/50 sm:flex-row sm:gap-8">
            <span>
              &copy;{new Date().getFullYear()} {f.wordmark} studio
            </span>
            <span suppressHydrationWarning>{date}</span>
          </div>
        </div>

        <div className="overflow-hidden">
          <p className="translate-y-[18%] text-center text-[22vw] leading-none font-bold tracking-tighter text-white/[0.06] select-none sm:text-[16vw]">
            {f.wordmark}
          </p>
        </div>
      </div>
    </footer>
  );
}
