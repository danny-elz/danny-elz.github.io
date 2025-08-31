'use client';
import { useRef, useState } from 'react';

export default function ProjectCard({ p }: { p: any }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const onEnter = () => { const el = videoRef.current; if (!el) return; el.currentTime = 0; el.play().catch(()=>{}); setPlaying(true); };
  const onLeave = () => { const el = videoRef.current; if (!el) return; el.pause(); setPlaying(false); };

  return (
    <article className="rounded-2xl border overflow-hidden">
      <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-900" onMouseEnter={onEnter} onMouseLeave={onLeave} onFocus={onEnter} onBlur={onLeave}>
        {p.preview ? <video ref={videoRef} src={p.preview} className="absolute inset-0 w-full h-full object-cover" muted playsInline preload="metadata" /> : <div className="absolute inset-0 grid place-items-center text-xs opacity-60">Preview</div>}
      </div>
      <div className="p-4 space-y-2">
        <div className="text-lg font-semibold">{p.title}</div>
        <div className="text-sm opacity-80">
          <span className="font-mono">{typeof p.metricA === 'number' ? p.metricA.toLocaleString() : p.metricA}</span> • {p.metricB}
        </div>
        <div className="text-xs opacity-80">{p.context}</div>
        <div className="flex flex-wrap gap-2">{p.tech.slice(0,6).map((t:string) => <span key={t} className="text-xs px-2 py-1 rounded-full border">{t}</span>)}</div>
        <div className="pt-2 flex gap-3 text-sm">
          {p.links?.arch && <a className="underline underline-offset-4" href={p.links.arch}>View Architecture</a>}
          {p.links?.case && <a className="inline-flex items-center rounded px-2 py-1 border" href={p.links.case}>Read Case Study</a>}
        </div>
        {p.impact && <div className="text-xs opacity-70 pt-1">{p.impact}</div>}
      </div>
    </article>
  );
}
