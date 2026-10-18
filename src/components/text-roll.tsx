import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Adapted from Skiper UI's free TextRoll (skiper58), by gxuri.
// https://skiper-ui.com/v1/skiper58
export function TextRoll({ children, className }: { children: string; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.span initial="initial" whileHover={reduced ? "initial" : "hovered"} className={cn("relative inline-block overflow-hidden align-bottom leading-normal", className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="block">
        {Array.from(children).map((letter, i) => (
          <motion.span key={i} className="inline-block whitespace-pre" variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }} transition={{ ease: "easeInOut", delay: i * 0.035 }}>{letter}</motion.span>
        ))}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {Array.from(children).map((letter, i) => (
          <motion.span key={i} className="inline-block whitespace-pre" variants={{ initial: { y: "100%" }, hovered: { y: 0 } }} transition={{ ease: "easeInOut", delay: i * 0.035 }}>{letter}</motion.span>
        ))}
      </span>
    </motion.span>
  );
}