const THEMES: Record<string, string> = {
  home: "radial-gradient(1200px 800px at 50% -10%, #2a2140 0%, #120e1e 55%, #0b0812 100%)",
  quests: "radial-gradient(1000px 700px at 70% 0%, #2b2036 0%, #14101f 60%, #0b0812 100%)",
  start: "radial-gradient(1000px 700px at 30% 0%, #21283a 0%, #121722 60%, #0b0d12 100%)",
  wilderness: "radial-gradient(1000px 700px at 50% 0%, #1c2a23 0%, #101a15 60%, #0a0f0c 100%)",
  settlements: "radial-gradient(1000px 700px at 50% 0%, #2c2536 0%, #171320 60%, #0b0812 100%)",
  dungeons: "radial-gradient(1000px 700px at 50% 0%, #221f26 0%, #131117 60%, #090809 100%)",
  reference: "radial-gradient(1000px 700px at 50% 0%, #242038 0%, #14111f 60%, #0b0812 100%)",
};

export function SiteBackground({ theme = "home" }: { theme?: string }) {
  const bg = THEMES[theme] ?? THEMES.home;
  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      <div className="absolute inset-0" style={{ background: bg }} />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(8,6,12,0.35), rgba(8,6,12,0.75))",
        }}
      />
    </div>
  );
}
