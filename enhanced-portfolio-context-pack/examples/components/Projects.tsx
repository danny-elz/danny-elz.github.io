import ProjectCard from './ProjectCard';

const projects = [
  {
    slug: 'compliance-screenshot-archiver',
    title: 'Compliance Screenshot Archiver',
    metricA: 847293,
    metricB: '0 tamper incidents in 2 years',
    context: 'Legal needed tamper‑proof evidence',
    tech: ['Python','AWS Lambda','S3 Object Lock','DynamoDB','EventBridge','Playwright','FastAPI'],
    links: { arch: '#', case: '#' },
    preview: '/previews/archiver.mp4',
    impact: '$2.3M saved in compliance costs'
  },
  {
    slug: 'perf-transformation',
    title: 'Performance Transformation',
    metricA: '2.7s → 0.4s',
    metricB: '+47% conversion',
    context: 'E‑commerce at 1M+ daily users',
    tech: ['Next.js','Edge','CDN','Image pipeline'],
    links: { arch: '#', case: '#' },
    preview: '/previews/project2.mp4',
  },
  {
    slug: 'ml-pipeline-optimization',
    title: 'ML Pipeline Optimization',
    metricA: '92% → 99.3%',
    metricB: '10× throughput',
    context: 'Real‑time fraud detection',
    tech: ['Python','TensorFlow','Redis','Kubernetes'],
    links: { arch: '#', case: '#' },
    preview: '/previews/project3.mp4',
  },
];

export default function Projects() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {projects.map(p => <ProjectCard key={p.slug} p={p} />)}
    </div>
  );
}
