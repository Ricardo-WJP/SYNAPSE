"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      dot.style.left = `${ringX}px`;
      dot.style.top = `${ringY}px`;

      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setIsHovering(true);
      }
    };

    const onHoverEnd = () => setIsHovering(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onHoverStart);
    document.addEventListener("mouseout", onHoverEnd);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onHoverStart);
      document.removeEventListener("mouseout", onHoverEnd);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: isHovering ? "64px" : "48px",
          height: isHovering ? "64px" : "48px",
          borderRadius: "50%",
          border: "2px solid rgba(201, 185, 154, 0.5)",
          backgroundColor: "transparent",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isVisible ? (isHovering ? 1 : 0.6) : 0,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.3s ease",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Inner solid dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: isHovering ? "64px" : "36px",
          height: isHovering ? "64px" : "36px",
          borderRadius: "50%",
          backgroundColor: "#C9B99A",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: isVisible ? (isHovering ? 0.5 : 1) : 0,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.3s ease",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}