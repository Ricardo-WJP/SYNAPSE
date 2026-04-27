"use client";

import { useInView } from "@/hooks/useInView";
import { ReactNode } from "react";

interface ScrollRevealCardProps {
  children: ReactNode;
  index: number;
}

export default function ScrollRevealCard({ children, index }: ScrollRevealCardProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15, triggerOnce: false });

  return (
    <div
      ref={ref}
      className={inView ? `scroll-reveal scroll-stagger-${(index % 6) + 1}` : "scroll-animate-hidden"}
    >
      {children}
    </div>
  );
}
