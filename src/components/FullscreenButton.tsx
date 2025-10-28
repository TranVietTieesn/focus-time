/**
 * FullscreenButton - Distraction-free fullscreen toggle
 * VTea UI Makeover Action Controls Enhancement
 * User Story US2: Focused User — Distraction-Free Fullscreen Mode
 */

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggle: () => void;
  isAvailable: boolean;
  ariaLabel?: string;
}

export function FullscreenButton({
  isFullscreen,
  onToggle,
  isAvailable,
  ariaLabel = "Fullscreen mode",
}: FullscreenButtonProps) {
  // Hide button if fullscreen API not available (iOS Safari, etc.)
  if (!isAvailable) {
    return null;
  }

  const tooltip = isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)";

  return (
    <button
      onClick={onToggle}
      aria-label={ariaLabel}
      aria-pressed={isFullscreen}
      title={tooltip}
      className="action-button"
      style={{
        width: "44px",
        height: "44px",
        padding: "8px",
        borderRadius: "8px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isFullscreen ? "rgba(75, 107, 251, 1)" : "rgba(255, 255, 255, 0.7)",
        transition: "all 150ms ease-out",
      }}
      onMouseEnter={(e) => {
        if (!isFullscreen) {
          e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
        }
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        if (!isFullscreen) {
          e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
        }
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {/* Expand icon (⛶) when not fullscreen */}
      {!isFullscreen && (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
        >
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
      )}

      {/* Collapse icon (⛗) when fullscreen */}
      {isFullscreen && (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
        >
          <path d="M8 3v4a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16v4a2 2 0 0 0 2 2h4m12 0h4a2 2 0 0 0 2-2v-4" />
        </svg>
      )}
    </button>
  );
}
