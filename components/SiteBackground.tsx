const THEMES: Record<string, string> = {
  home: "radial-gradient(1200px 800px at 50% -10%, #2a2140 0%, #120e1e 55%, #0b0812 100%)",
  start: "radial-gradient(1000px 700px at 30% 0%, #21283a 0%, #121722 60%, #0b0d12 100%)",
  quests: "radial-gradient(1000px 700px at 70% 0%, #2b2036 0%, #14101f 60%, #0b0812 100%)",
  wilderness: "radial-gradient(1000px 700px at 50% 0%, #1c2a23 0%, #101a15 60%, #0a0f0c 100%)",
  settlements: "radial-gradient(1000px 700px at 50% 0%, #2c2536 0%, #171320 60%, #0b0812 100%)",
  dungeons: "radial-gradient(1000px 700px at 50% 0%, #221f26 0%, #131117 60%, #090809 100%)",
  encounters: "radial-gradient(1000px 700px at 40% 0%, #2a2230 0%, #16111c 60%, #0b0810 100%)",
  combat: "radial-gradient(1000px 700px at 55% 0%, #331e1e 0%, #1a1013 60%, #0d0809 100%)",
  investigation: "radial-gradient(1000px 700px at 45% 0%, #241f38 0%, #14111f 60%, #0b0812 100%)",
  npcs: "radial-gradient(1000px 700px at 40% 0%, #2b2438 0%, #16121f 60%, #0b0812 100%)",
  treasure: "radial-gradient(1000px 700px at 50% 0%, #322a1c 0%, #1a1510 60%, #0d0a06 100%)",
  events: "radial-gradient(1000px 700px at 50% 0%, #2a2438 0%, #15111d 60%, #0b0812 100%)",
  villains: "radial-gradient(1000px 700px at 50% 0%, #2a1c2a 0%, #150f16 60%, #0a070b 100%)",
  names: "radial-gradient(1000px 700px at 50% 0%, #26243a 0%, #141220 60%, #0b0912 100%)",
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
