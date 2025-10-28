/**
 * BackgroundLayer - Immersive full-bleed background with gradient and overlay
 * VTea UI Makeover: CSS gradient foundation with optional progressive WebP image
 */

export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* CSS Gradient Base Layer (instant, zero-cost) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #4B6BFB 0%, #2A2A72 50%, #1A1A2E 100%)',
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
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      </picture>
      */}
      
      {/* Radial + Linear Overlay for Text Contrast (40-60% dark opacity) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.6) 100%)',
        }}
      />
    </div>
  );
}

