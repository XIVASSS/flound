"use client";

import { AnimatePresence, motion, useMotionValueEvent, useSpring } from "motion/react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

const entrance = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: "easeOut" as const },
  }),
};

const motionProps = {
  whileHover: { y: -2, transition: { duration: 0.2 } },
  whileTap: { scale: 0.99 },
};

export function DashboardCard({
  children,
  index = 0,
  asButton = false,
  glow = true,
  className = "",
  onClick,
  style,
}: {
  children: ReactNode;
  index?: number;
  asButton?: boolean;
  glow?: boolean;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  const cls = `transition-all duration-300 ${glow ? "hover:border-foreground/20 hover:shadow-lg hover:shadow-black/20" : ""} ${className}`;

  if (asButton) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        custom={index}
        initial="hidden"
        animate="visible"
        variants={entrance}
        {...motionProps}
        className={cls}
        style={style}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={entrance}
      {...motionProps}
      className={cls}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export function DashboardTabPanel({
  tabKey,
  children,
}: {
  tabKey: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabKey}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function DashboardCounter({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const [text, setText] = useState(`0${suffix}`);

  useMotionValueEvent(spring, "change", (v) => {
    setText(`${Math.round(v)}${suffix}`);
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span className={className}>{text}</motion.span>;
}
