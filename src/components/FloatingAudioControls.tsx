/**
 * FloatingAudioControls - Bottom-left floating controls
 * Music panel toggle and completion notification sound
 * Always visible with opacity control - semi-transparent by default
 * Keyboard accessible (Tab + Enter)
 */

import { useState, useEffect } from 'react';
import { MusicPanel } from './MusicPanel';

interface AudioState {
  notificationEnabled: boolean;
}

export function FloatingAudioControls() {
  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMusicPanelOpen, setIsMusicPanelOpen] = useState(false);
  const [audioState, setAudioState] = useState<AudioState>({
    notificationEnabled: true,
  });

  const shouldHighlight = isHovering || isFocused;

  const toggleMusicPanel = () => {
    setIsMusicPanelOpen((prev) => !prev);
  };

  const toggleNotification = () => {
    setAudioState((prev) => ({
      ...prev,
      notificationEnabled: !prev.notificationEnabled,
    }));
    // TODO: Connect to actual audio playback
  };

  // Listen for keyboard shortcut M to toggle music panel
  useEffect(() => {
    const handleToggle = () => {
      setIsMusicPanelOpen((prev) => !prev);
    };
    window.addEventListener('toggleMusicPanel', handleToggle);
    return () => window.removeEventListener('toggleMusicPanel', handleToggle);
  }, []);

  return (
    <>
      <div
        className="fixed bottom-6 left-6 flex flex-col items-center gap-2 transition-all duration-300"
        style={{
          opacity: shouldHighlight ? 1 : 0.5,
          zIndex: 50,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Music Panel Toggle */}
        <button
          onClick={toggleMusicPanel}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 focus-ring"
          title={isMusicPanelOpen ? 'Close music panel' : 'Open music panel'}
          aria-label={isMusicPanelOpen ? 'Close music panel' : 'Open music panel'}
          style={{
            background: isMusicPanelOpen
              ? 'linear-gradient(135deg, #7c3aed 0%, #ff89bb 100%)'
              : 'rgba(255, 255, 255, 0.1)',
            border: isMusicPanelOpen ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            fontSize: '1.25rem',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: shouldHighlight
              ? isMusicPanelOpen
                ? '0 6px 20px rgba(124, 58, 237, 0.4)'
                : '0 4px 16px rgba(255, 255, 255, 0.3)'
              : isMusicPanelOpen
              ? '0 4px 12px rgba(124, 58, 237, 0.3)'
              : '0 2px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.2s ease-out',
          }}
          onMouseEnter={(e) => {
            if (!isMusicPanelOpen) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isMusicPanelOpen) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
          }}
        >
          {isMusicPanelOpen ? '🎵' : '🎶'}
        </button>

      {/* Notification Sound Toggle */}
      <button
        onClick={toggleNotification}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 focus-ring"
        title={audioState.notificationEnabled ? 'Disable notification sound' : 'Enable notification sound'}
        aria-label={audioState.notificationEnabled ? 'Notification sound on' : 'Notification sound off'}
        style={{
          background: audioState.notificationEnabled
            ? 'linear-gradient(135deg, #4b6bfb 0%, #3b5ceb 100%)'
            : 'rgba(255, 255, 255, 0.1)',
          border: audioState.notificationEnabled ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          fontSize: '1.25rem',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: shouldHighlight
            ? audioState.notificationEnabled
              ? '0 6px 20px rgba(75, 107, 251, 0.4)'
              : '0 4px 16px rgba(255, 255, 255, 0.3)'
            : audioState.notificationEnabled
            ? '0 4px 12px rgba(75, 107, 251, 0.3)'
            : '0 2px 8px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.2s ease-out',
        }}
        onMouseEnter={(e) => {
          if (!audioState.notificationEnabled) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          if (!audioState.notificationEnabled) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }
        }}
      >
        {audioState.notificationEnabled ? '🔔' : '🔕'}
      </button>
      </div>

      {/* Music Panel */}
      <MusicPanel isOpen={isMusicPanelOpen} onClose={() => setIsMusicPanelOpen(false)} />
    </>
  );
}
