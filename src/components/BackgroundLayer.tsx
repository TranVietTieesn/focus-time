/**
 * BackgroundLayer - VTea dark-purple gradient with neon accents
 * Calm, elegant atmosphere with subtle animations
 */

export function BackgroundLayer() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden"
      style={{
        zIndex: 0,
        animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      aria-hidden="true"
    >
      {/* Layer 1: VTea base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'var(--gradient-bg-vtea)',
        }}
      />

      {/* Layer 2: Light diffusion - radial glow from center */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 900px 700px at 50% 50%,
              rgba(75, 107, 251, 0.25) 0%,
              rgba(139, 92, 246, 0.15) 30%,
              rgba(255, 137, 187, 0.08) 50%,
              transparent 75%
            )
          `,
          animation: 'breathe 4s ease-in-out infinite',
        }}
      />

      {/* Layer 3: Soft vignette (dark edges, bright center) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.2) 40%,
              rgba(0, 0, 0, 0.5) 75%,
              rgba(0, 0, 0, 0.7) 100%
            )
          `,
        }}
      />

      {/* Layer 4: Gaussian blur effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'transparent',
          backdropFilter: 'blur(0.5px)',
          WebkitBackdropFilter: 'blur(0.5px)',
        }}
      />
    </div>
  );
}

