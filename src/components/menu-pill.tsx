"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { glassVariants } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

export function MenuPill() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[1500] bg-black/15 backdrop-blur-md transition-opacity duration-300"
        />
      )}

      <div className="fixed bottom-6 left-1/2 z-[1600] -translate-x-1/2">
        {open && (
          <div
            className={cn(
              "absolute bottom-[calc(100%+2.25rem)] left-1/2 w-[min(45rem,calc(100vw-2rem))] -translate-x-1/2",
              "overflow-hidden rounded-[4.5rem] border p-6",
              "animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out",
              glassVariants.menu,
            )}
          >
            {site.nav.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => go(link.href)}
                className="block w-full rounded-[3rem] px-12 py-9 text-left text-[45px] font-medium leading-none text-foreground transition-all hover:bg-white/35 active:scale-[0.98]"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className={cn(
            "flex items-center gap-3 rounded-full py-3 pr-2 pl-6 text-white transition-all duration-300",
            "hover:border-white/35 hover:bg-black/50",
            open && "border-white/40 bg-black/55",
            glassVariants.menuTrigger,
          )}
        >
          <span className="text-sm font-medium">Menu</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
            <span className="grid grid-cols-2 gap-0.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="h-1 w-1 rounded-full bg-white/90" />
              ))}
            </span>
          </span>
        </button>
      </div>
    </>
  );
}
