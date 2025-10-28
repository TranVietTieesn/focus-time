/**
 * BackgroundLayer - Full-bleed gradient background
 */

export function BackgroundLayer() {
  return (
    <div
      className="fixed inset-0 z-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"
      aria-hidden="true"
    />
  );
}

