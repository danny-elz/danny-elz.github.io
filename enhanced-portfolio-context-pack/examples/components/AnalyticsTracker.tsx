'use client';
import { useEffect } from 'react';

export default function AnalyticsTracker() {
  useEffect(() => {
    // Scroll depth
    const marks = [25,50,75,100]; const fired = new Set<number>();
    const onScroll = () => {
      const depth = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
      for (const m of marks) if (depth >= m && !fired.has(m)) {
        fired.add(m);
        (window as any).plausible?.('ScrollDepth', { props: { depth: m } });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    // Click coordinates
    const onClick = (e: MouseEvent) => {
      (window as any).plausible?.('Click', { props: { x: e.clientX, y: e.clientY, tag: (e.target as HTMLElement)?.tagName } });
    };
    window.addEventListener('click', onClick);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('click', onClick); };
  }, []);
  return null;
}
