/**
 * FloatingAudioControls - Bottom-left floating controls
 * Toggle ambient sound and completion notification sound
 * Always visible with opacity control - semi-transparent by default
 * Keyboard accessible (Tab + Enter)
 */

import { useState, useEffect } from 'react';

interface AudioState {
  ambientEnabled: boolean;
  notificationEnabled: boolean;
}

export function FloatingAudioControls() {
  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [audioState, setAudioState] = useState<AudioState>({
    ambientEnabled: false,
    notificationEnabled: true,
  });

  const shouldHighlight = isHovering || isFocused;

  const toggleAmbient = () => {
    setAudioState((prev) => ({
      ...prev,
      ambientEnabled: !prev.ambientEnabled,
    }));
    // TODO: Connect to actual audio playback
  };

  const toggleNotification = () => {
    setAudioState((prev) => ({
      ...prev,
      notificationEnabled: !prev.notificationEnabled,
    }));
    // TODO: Connect to actual audio playback
  };
  return (
    <div
      className="fixed bottom-6 left-6 flex flex-col items-center gap-2 transition-all duration-300"
      style={{
        opacity: shouldHighlight ? 1 : 0.5,
        zIndex: 50,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Ambient Sound Toggle */}
      <button
        onClick={toggleAmbient}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 focus-ring"
        title={audioState.ambientEnabled ? 'Disable ambient sound' : 'Enable ambient sound'}
        aria-label={audioState.ambientEnabled ? 'Ambient sound on' : 'Ambient sound off'}
        style={{
          background: audioState.ambientEnabled
            ? 'linear-gradient(135deg, #7c3aed 0%, #ff89bb 100%)'
            : 'rgba(255, 255, 255, 0.1)',
          border: audioState.ambientEnabled ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          fontSize: '1.25rem',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: shouldHighlight
            ? audioState.ambientEnabled
              ? '0 6px 20px rgba(124, 58, 237, 0.4)'
              : '0 4px 16px rgba(255, 255, 255, 0.3)'
            : audioState.ambientEnabled
            ? '0 4px 12px rgba(124, 58, 237, 0.3)'
            : '0 2px 8px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.2s ease-out',
        }}
        onMouseEnter={(e) => {
          if (!audioState.ambientEnabled) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          if (!audioState.ambientEnabled) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }
        }}
      >
        {audioState.ambientEnabled ? '🎵' : '🔇'}
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
  );
}
