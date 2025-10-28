/**
 * InspirationalQuote - Static inspirational text for VTea UI
 * Positioned top-right on desktop, below timer on mobile
 */

export function InspirationalQuote() {
  return (
    <div className="absolute top-4 right-4 hidden lg:block text-sm md:text-base italic text-white/60">
      Your thoughts deserve a calm place.
    </div>
  );
}

