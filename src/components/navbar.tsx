"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 z-[1000] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2">
      <div
        className={`flex items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-300 ${
          scrolled
            ? "border-border bg-background/70 shadow-lg backdrop-blur-2xl"
            : "border-white/[0.08] bg-background/40 backdrop-blur-xl"
        }`}
      >
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight text-foreground"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-1">
          {site.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(link.href.replace("#", ""))
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hidden px-3 py-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="ml-1 inline-flex items-center justify-center rounded-full bg-foreground px-4 py-1.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Start a project
          </a>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
