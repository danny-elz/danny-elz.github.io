export default function ExperienceTimeline() {
  const data = [
    { year: '2025', title: 'Neural Innovation', subtitle: 'Founder/Engineer', note: 'Building next‑gen compliance tools' },
    { year: '2024', title: 'Senior Architect @ TechCorp', subtitle: 'Led 12‑person team', note: 'Reduced infra costs 67%' },
    { year: '2022', title: 'Software Engineer @ StartupXYZ', subtitle: 'Scaled from 0 → 1M users', note: '' },
  ];
  return (
    <div className="relative pl-6">
      <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-300/60 dark:bg-gray-700/60" />
      <ul className="space-y-6">
        {data.map((e) => (
          <li key={e.year} className="relative">
            <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-gray-400" />
            <div className="text-sm opacity-70">{e.year}</div>
            <div className="font-medium">{e.title}</div>
            <div className="text-sm opacity-80">{e.subtitle}</div>
            {e.note && <div className="text-xs opacity-70">{e.note}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
