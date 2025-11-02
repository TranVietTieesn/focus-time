/**
 * FloatingMusicPlayer - Mini floating player with animated scrolling text
 * Shows current playing song in corner when panel is closed
 * Long titles scroll automatically with edge fading
 */

import { useState, useRef, useEffect } from 'react';

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
  const [shouldScroll, setShouldScroll] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect if title overflows and needs scrolling
  useEffect(() => {
    if (titleRef.current && containerRef.current) {
      const titleWidth = titleRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      setShouldScroll(titleWidth > containerWidth);
    }
  }, [songTitle]);

  // Fade transition when song changes
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [songTitle]);

  return (
    <div
      className="fixed bottom-20 left-6 flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 cursor-pointer"
      style={{
        background: 'rgba(40, 40, 80, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: isPlaying 
          ? '1px solid rgba(128, 93, 255, 0.6)'
          : '1px solid rgba(160, 120, 255, 0.2)',
        boxShadow: isPlaying
          ? (isHovering ? 'var(--glow-music-playing), 0 4px 12px rgba(0, 0, 0, 0.3)' : '0 0 20px rgba(128, 93, 255, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)')
          : (isHovering ? '0 6px 16px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.3)'),
        maxWidth: '240px',
        zIndex: 60,
        opacity: isHovering ? 1 : 0.95,
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

      {/* Song title with scrolling animation */}
      <div 
        ref={containerRef}
        className="flex-1 min-w-0 relative"
        style={{
          maxWidth: '160px',
          overflow: 'hidden',
          padding: '0 2px',
        }}
      >
        {/* Gradient fade masks on edges */}
        {shouldScroll && !isHovering && (
          <>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '12px',
                background: 'linear-gradient(to right, rgba(40, 40, 80, 0.6), transparent)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '12px',
                background: 'linear-gradient(to left, rgba(40, 40, 80, 0.6), transparent)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
          </>
        )}
        
        <div
          ref={titleRef}
          className="text-white text-xs font-medium"
          role="status"
          aria-live="polite"
          aria-label={`Now playing: ${songTitle}`}
          style={{
            whiteSpace: 'nowrap',
            display: 'inline-block',
            animation: shouldScroll && !isHovering && isPlaying
              ? 'marqueeScroll 10s linear infinite'
              : 'none',
            animationPlayState: isHovering ? 'paused' : 'running',
            transform: isHovering && shouldScroll ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.2s ease-out, opacity 0.3s ease-out',
            opacity: isTransitioning ? 0 : 1,
            textShadow: '0 0 8px rgba(160, 120, 255, 0.3)',
            willChange: 'transform',
          }}
        >
          {songTitle}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(0, 0, 0);
          }
          45% {
            transform: translate3d(-50%, 0, 0);
          }
          55% {
            transform: translate3d(-50%, 0, 0);
          }
          75% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>

      {/* Music note icon */}
      <span className="text-white text-sm">🎵</span>
    </div>
  );
}
