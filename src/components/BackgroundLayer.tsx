/**
 * BackgroundLayer - Cinematic deep gradient with vignette effect
 * Flocus-inspired: Midnight blue → violet → soft magenta blend
 * Visual Priority: TERTIARY (atmospheric foundation)
 */

export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Deep Cinematic Gradient Base (midnight blue → violet → magenta) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(219, 39, 119, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #312e81 50%, #581c87 75%, #7c2d12 100%)
          `,
        }}
      />
      
      {/* Optional Progressive WebP Image (≤80KB, loads after gradient) */}
      {/* Uncomment when background image is added to /public/images/
      <picture>
        <source srcSet="/images/background.webp" type="image/webp" />
        <img 
          src="/images/background.jpg" 
          alt="" 
          loading="lazy" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      </picture>
      */}
      
      {/* Cinematic Vignette + Text Contrast Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.6) 100%),
            radial-gradient(circle at 50% 40%, transparent 30%, rgba(0, 0, 0, 0.4) 70%)
          `,
        }}
      />
    </div>
  );
}

