'use client';
import { useEffect, useRef, useState } from 'react';

function useCounter(target: number, duration = 1200) {
  const [value, set] = useState(0);
  useEffect(() => {
    let raf: number; const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      set(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export default function MetricsBar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const loc = useCounter(visible ? 1250000 : 0);
  const systems = useCounter(visible ? 48 : 0, 900);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8 text-center">
      <div><div className="text-2xl font-semibold tabular-nums">{loc.toLocaleString()}</div><div className="text-xs opacity-70">Lines of code reviewed</div></div>
      <div><div className="text-2xl font-semibold tabular-nums">{systems}</div><div className="text-xs opacity-70">Systems architected</div></div>
      <div><div className="text-2xl font-semibold tabular-nums">99.99%</div><div className="text-xs opacity-70">Uptime maintained</div></div>
      <div><div className="text-2xl font-semibold tabular-nums">&lt; 2h</div><div className="text-xs opacity-70">Avg response time</div></div>
    </div>
  );
}
