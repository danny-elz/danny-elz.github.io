export default function GithubStats() {
  const user = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'your-username';
  return (
    <div className="text-xs opacity-80">
      GitHub activity for <span className="font-mono">{user}</span> — (embed your contribution chart or API stats here)
    </div>
  );
}
