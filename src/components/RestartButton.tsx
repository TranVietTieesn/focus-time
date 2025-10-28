/**
 * RestartButton - Quick session restart with circular arrow icon
 * VTea UI Makeover Action Controls Enhancement
 * User Story US1: Active User — Quick Session Restart
 */

interface RestartButtonProps {
  onRestart: () => void;
  ariaLabel?: string;
}

export function RestartButton({ onRestart, ariaLabel = "Restart session" }: RestartButtonProps) {
  return (
    <button
      onClick={onRestart}
      aria-label={ariaLabel}
      title="Restart session (R)"
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
        color: "rgba(255, 255, 255, 0.7)",
        transition: "all 150ms ease-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {/* Circular arrow icon SVG (↻) */}
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    </button>
  );
}
