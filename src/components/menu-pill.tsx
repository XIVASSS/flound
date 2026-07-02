"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { site } from "@/data/site";
import { glassVariants } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 420, damping: 28, mass: 0.75 };

const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.82,
    rotateX: 14,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      ...spring,
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: 28,
    scale: 0.9,
    filter: "blur(6px)",
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -40, rotateZ: -3, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    rotateZ: 0,
    filter: "blur(0px)",
    transition: spring,
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.12 } },
};

const reducedPanelVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export function MenuPill() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const activePanel = reduceMotion ? reducedPanelVariants : panelVariants;
  const activeItem = reduceMotion ? reducedItemVariants : itemVariants;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[1500] bg-black/15 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <div
        className="fixed bottom-6 left-1/2 z-[1600] -translate-x-1/2"
        style={{ perspective: reduceMotion ? undefined : 1200 }}
      >
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key="menu-panel"
              variants={activePanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "absolute bottom-[calc(100%+2.25rem)] left-1/2 w-[min(45rem,calc(100vw-2rem))] -translate-x-1/2",
                "overflow-hidden rounded-[4.5rem] border p-6",
                glassVariants.menu,
              )}
            >
              {!reduceMotion && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[4.5rem]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0.2] }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                  }}
                />
              )}

              {site.nav.map((link, i) => (
                <motion.button
                  key={link.href}
                  type="button"
                  variants={activeItem}
                  custom={i}
                  onClick={() => go(link.href)}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 8,
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 500, damping: 22 },
                        }
                  }
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  className="group relative block w-full overflow-hidden rounded-[3rem] px-12 py-9 text-left text-[45px] font-medium leading-none text-foreground"
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-[3rem] bg-white/0"
                    initial={false}
                    whileHover={
                      reduceMotion ? undefined : { backgroundColor: "rgba(255,255,255,0.35)" }
                    }
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="relative inline-block"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { letterSpacing: "0.02em", transition: { duration: 0.25 } }
                    }
                  >
                    {link.label}
                  </motion.span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          animate={
            reduceMotion
              ? undefined
              : open
                ? { y: 0, scale: 1.04 }
                : { y: [0, -3, 0], scale: 1 }
          }
          transition={
            reduceMotion
              ? undefined
              : open
                ? spring
                : { y: { duration: 3, repeat: Infinity, ease: "easeInOut" }, scale: spring }
          }
          whileHover={reduceMotion ? undefined : { scale: 1.06, y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          className={cn(
            "relative flex items-center gap-3 rounded-full py-3 pr-2 pl-6 text-white",
            "hover:border-white/35 hover:bg-black/50",
            open && "border-white/40 bg-black/55",
            glassVariants.menuTrigger,
          )}
        >
          {!reduceMotion && open && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full border border-white/30"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.35, opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}

          <motion.span
            className="text-sm font-medium"
            animate={open && !reduceMotion ? { opacity: 0.7, x: -2 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            Menu
          </motion.span>

          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
            <motion.span
              className="grid grid-cols-2 gap-0.5"
              animate={
                reduceMotion
                  ? undefined
                  : open
                    ? { rotate: 45, scale: 1.15 }
                    : { rotate: 0, scale: 1 }
              }
              transition={spring}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="h-1 w-1 rounded-full bg-white/90"
                  animate={
                    reduceMotion
                      ? undefined
                      : open
                        ? {
                            scale: i % 2 === 0 ? 1.4 : 1.4,
                            opacity: 1,
                          }
                        : { scale: 1, opacity: 0.9 }
                  }
                  transition={{ ...spring, delay: open ? i * 0.03 : 0 }}
                />
              ))}
            </motion.span>
          </span>
        </motion.button>
      </div>
    </>
  );
}
