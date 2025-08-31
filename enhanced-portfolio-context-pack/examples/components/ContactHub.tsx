'use client';
import { useState } from 'react';
import EmailForm from './EmailForm';
import CalendlyEmbed from './CalendlyEmbed';

export default function ContactHub() {
  const [tab, setTab] = useState<'email' | 'book' | 'linkedin'>('book');
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/your-handle/';

  return (
    <section id="contact" className="py-16">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Contact</h2>
        <div role="tablist" aria-label="Contact method" className="flex gap-2 mb-6">
          {['email','book','linkedin'].map((k) => (
            <button key={k} role="tab" aria-selected={tab===k} onClick={()=>setTab(k as any)} className={`px-3 py-2 rounded ${tab===k?'bg-gray-200 dark:bg-gray-800':''}`}>
              {k==='email'?'Email':k==='book'?'Book':'LinkedIn'}
            </button>
          ))}
        </div>
        {tab==='email' && <EmailForm />}
        {tab==='book' && <CalendlyEmbed />}
        {tab==='linkedin' && <a href={linkedin} target="_blank" className="underline underline-offset-4">Connect on LinkedIn</a>}
      </div>
    </section>
  );
}
