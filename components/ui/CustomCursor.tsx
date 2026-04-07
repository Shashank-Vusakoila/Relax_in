"use client";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX - 18) * 0.12;
      ringY += (mouseY - ringY - 18) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      cursorRef.current?.classList.add("scale-250");
      ringRef.current?.classList.add("scale-150", "opacity-100");
    };
    const onLeaveLink = () => {
      cursorRef.current?.classList.remove("scale-250");
      ringRef.current?.classList.remove("scale-150", "opacity-100");
    };

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    animate();
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-gold pointer-events-none z-[9999] transition-transform duration-150"
        style={{ mixBlendMode: "multiply" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-gold/60 pointer-events-none z-[9998] opacity-60 transition-all duration-100"
      />
    </>
  );
}
