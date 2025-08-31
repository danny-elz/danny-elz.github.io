'use client';
import { useState } from 'react';

export default function EmailForm() {
  const [state, set] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [err, setErr] = useState<string|undefined>();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    set('sending'); setErr(undefined);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: fd });
      const j = await res.json(); if (!res.ok || !j.ok) throw new Error(j.error || 'Failed');
      set('sent'); (e.target as HTMLFormElement).reset();
    } catch (e:any) { set('error'); setErr(e.message); }
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-xl" aria-label="Email form">
      <input name="name" placeholder="Your name" className="border rounded p-3" required />
      <input name="email" type="email" placeholder="you@example.com" className="border rounded p-3" required />
      <input name="subject" placeholder="Subject" className="border rounded p-3" required />
      <textarea name="message" placeholder="Tell me what you need." className="border rounded p-3 h-32" required />
      <button className="inline-flex items-center rounded px-4 py-2 border" disabled={state==='sending'}>{state==='sending'?'Sending…':'Send'}</button>
      {state==='sent' && <p className="text-sm text-green-600">Sent — check your inbox.</p>}
      {state==='error' && <p className="text-sm text-red-600">Error: {err}</p>}
    </form>
  );
}
