export default function CalendlyEmbed() {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-handle/intro?hide_gdpr_banner=1';
  return <iframe title="Book a meeting" src={url} className="w-full h-[720px]" allow="camera; microphone; fullscreen" />;
}
