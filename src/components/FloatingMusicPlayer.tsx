/**
 * FloatingMusicPlayer - Mini floating player
 * Shows current playing song in corner when panel is closed
 */

import { useState } from 'react';

interface FloatingMusicPlayerProps {
  songTitle: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenPanel: () => void;
}

export function FloatingMusicPlayer({
  songTitle,
  isPlaying,
  onTogglePlay,
  onOpenPanel,
}: FloatingMusicPlayerProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="fixed bottom-20 left-6 flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 cursor-pointer"
      style={{
        background: 'rgba(124, 58, 237, 0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isHovering
          ? '0 6px 20px rgba(124, 58, 237, 0.5)'
          : '0 4px 12px rgba(124, 58, 237, 0.3)',
        maxWidth: '240px',
        zIndex: 60,
        opacity: isHovering ? 1 : 0.9,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onOpenPanel}
      role="button"
      tabIndex={0}
      aria-label={`Currently playing: ${songTitle}. Click to open music panel`}
    >
      {/* Play/Pause button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onTogglePlay();
        }}
        className="w-6 h-6 flex items-center justify-center text-white hover:scale-110 transition-transform"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>

      {/* Song title */}
      <div className="flex-1 min-w-0">
        <div className="text-white text-xs font-medium truncate">
          {songTitle}
        </div>
      </div>

      {/* Music note icon */}
      <span className="text-white text-sm">🎵</span>
    </div>
  );
}
