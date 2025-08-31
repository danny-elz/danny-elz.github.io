'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function useIsReduced() {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function dayNightColor() {
  try {
    const hour = new Date().getHours();
    return hour >= 19 || hour < 6 ? 0x22c55e : 0x0ea5e9;
  } catch { return 0x0ea5e9; }
}

export default function VantaHeroAdvanced() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [effect, setEffect] = useState<any>(null);
  const reduced = useIsReduced();

  useEffect(() => {
    if (!ref.current || reduced) return;
    let local: any;
    (async () => {
      const GLOBE = (await import('vanta/dist/vanta.globe.min')).default;
      local = GLOBE({
        el: ref.current!,
        THREE,
        color: dayNightColor(),
        backgroundAlpha: 0.0,
        size: 1.0,
        spacing: 18.0,
        mouseControls: true,
        touchControls: true,
      });
      setEffect(local);
    })();
    return () => { try { local?.destroy?.(); } catch {} };
  }, [reduced]);

  // Parallax via CSS transform (subtle; avoids heavy work)
  useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;
    const onMove = (e: MouseEvent) => {
      const { innerWidth:w, innerHeight:h } = window;
      const dx = (e.clientX - w/2) / w;
      const dy = (e.clientY - h/2) / h;
      el.style.transform = `translate3d(${dx*6}px, ${dy*6}px, 0)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced]);

  return (
    <section className="relative h-[60vh] overflow-hidden bg-gradient-to-b from-black/[0.02] to-transparent dark:from-white/[0.02]">
      <div ref={ref} className="absolute inset-0 -z-10 will-change-transform" />
      <div className="relative h-full grid place-items-center px-6 text-center">
        <div>
          <div className="text-xs opacity-80 mb-2">Available for projects</div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Systems that scale beyond expectations</h1>
          <p className="opacity-70 mt-2 max-w-xl mx-auto">Reduced cloud costs 67% for Fortune 500s</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="#projects" className="underline underline-offset-4">View Case Studies</a>
            <a href="#contact" className="inline-flex items-center rounded-lg px-4 py-2 border">Book Strategy Call →</a>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs opacity-80">
            <span className="border rounded-full px-2 py-1">Python</span>
            <span className="border rounded-full px-2 py-1">AWS</span>
            <span className="border rounded-full px-2 py-1">Next.js</span>
            <span className="border rounded-full px-2 py-1">Docker</span>
            <span className="border rounded-full px-2 py-1">K8s</span>
          </div>
        </div>
      </div>
    </section>
  );
}
