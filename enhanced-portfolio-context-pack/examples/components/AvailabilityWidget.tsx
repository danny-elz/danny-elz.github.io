'use client';
import { useEffect, useState } from 'react';

export default function AvailabilityWidget() {
  const [slots, setSlots] = useState(2);
  // TODO: optionally poll a real endpoint or Calendly API for availability
  useEffect(() => { const t = setInterval(()=>{}, 60000); return ()=>clearInterval(t); }, []);
  return (
    <div className="rounded-2xl border p-6">
      <div className="font-semibold mb-2">Current Availability</div>
      <div className="text-sm opacity-80 mb-4">February: <strong>{slots}</strong> slots • March: open • April: open</div>
      <div className="flex gap-3">
        <a href="#contact" className="inline-flex items-center rounded px-3 py-2 border">Book 30‑min Strategy Call</a>
        <a href="#contact" className="underline underline-offset-4">Send Project Brief</a>
      </div>
    </div>
  );
}
