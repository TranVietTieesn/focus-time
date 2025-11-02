/**
 * MusicPanel - Music search and player panel
 * Glass morphism design, search YouTube, display results, mini-player
 * Debounce 500ms, no persistence, always show player when playing
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useYouTubePlayer } from '@/hooks/useYouTubePlayer';

interface YouTubeSearchResult {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

interface MusicPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSongChange?: (songInfo: { videoId: string; title: string } | null) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export function MusicPanel({ isOpen, onClose, onSongChange, onPlayStateChange }: MusicPanelProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<YouTubeSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedSongTitle, setSelectedSongTitle] = useState<string>('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [playerInitialized, setPlayerInitialized] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const playerContainerId = 'youtube-player-container';

  const {
    isReady,
    isPlaying,
    volume,
    cueVideo,
    togglePlayPause,
    setVolume,
    stop,
  } = useYouTubePlayer({
    containerId: playerContainerId,
    onReady: () => {
      setPlayerInitialized(true);
    },
            onStateChange: (state) => {
      // Announce state changes for accessibility
      const playing = state === 1;
      if (playing) {
        announceToScreenReader('Music playing');
      } else if (state === 2) {
        announceToScreenReader('Music paused');
      }
      onPlayStateChange?.(playing);
    },
  });

  // Callbacks
  const handleVolumeChange = useCallback((change: number) => {
    setVolume(volume + change);
  }, [volume, setVolume]);

  const handleSelectVideo = useCallback((videoId: string, title: string) => {
    setSelectedVideo(videoId);
    setSelectedSongTitle(title);
    setHasInteracted(true);
    
    // Wait a bit for player to be ready before cueing
    setTimeout(() => {
      cueVideo(videoId);
    }, 100);
    
    onSongChange?.({ videoId, title });
  }, [cueVideo, onSongChange]);

  const handlePlayPause = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    togglePlayPause();
    
    // Auto-close panel after starting playback
    if (!isPlaying) {
      setTimeout(() => {
        onClose();
      }, 500);
    }
  }, [hasInteracted, togglePlayPause, isPlaying, onClose]);

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  // Focus search input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
    // Don't stop player when panel closes - keep playing in background
  }, [isOpen]);

  // Listen for volume change keyboard shortcuts (↑/↓)
  useEffect(() => {
    if (!isOpen) return;

    const handleVolumeEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ change: number }>;
      handleVolumeChange(customEvent.detail.change);
      event.preventDefault();
    };

    window.addEventListener('musicVolumeChange', handleVolumeEvent);
    return () => window.removeEventListener('musicVolumeChange', handleVolumeEvent);
  }, [isOpen, handleVolumeChange]);

  // Listen for toggle playback from floating player
  useEffect(() => {
    const handleTogglePlayback = () => {
      togglePlayPause();
    };
    window.addEventListener('toggleMusicPlayback', handleTogglePlayback);
    return () => window.removeEventListener('toggleMusicPlayback', handleTogglePlayback);
  }, [togglePlayPause]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Perform search using YouTube Data API v3
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    
    if (!apiKey) {
      // Fallback to mock data if no API key
      setIsSearching(true);
      setError(null);
      const mockResults: YouTubeSearchResult[] = [
        {
          videoId: 'jfKfPfyJRdk',
          title: `${debouncedQuery} - Relaxing Music`,
          thumbnail: 'https://img.youtube.com/vi/jfKfPfyJRdk/default.jpg',
          channelTitle: 'Relaxing Sounds',
        },
      ];
      setTimeout(() => {
        setResults(mockResults);
        setIsSearching(false);
      }, 300);
      return;
    }

    // Real YouTube search
    setIsSearching(true);
    setError(null);

    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.append('part', 'snippet');
    searchUrl.searchParams.append('q', debouncedQuery);
    searchUrl.searchParams.append('type', 'video');
    searchUrl.searchParams.append('maxResults', '8');
    searchUrl.searchParams.append('videoCategoryId', '10'); // Music category
    searchUrl.searchParams.append('key', apiKey);

    fetch(searchUrl.toString())
      .then((response) => {
        if (!response.ok) {
          throw new Error('YouTube API request failed');
        }
        return response.json();
      })
      .then((data) => {
        const searchResults: YouTubeSearchResult[] = data.items.map((item: any) => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
          channelTitle: item.snippet.channelTitle,
        }));
        setResults(searchResults);
        setIsSearching(false);
      })
      .catch((error) => {
        console.error('YouTube search error:', error);
        setError('YouTube unavailable. Please try again later.');
        setIsSearching(false);
        setResults([]);
      });
  }, [debouncedQuery]);

  // Keep player alive even when panel closed (hidden)
  const isPanelVisible = isOpen;

  return (
    <>
      {/* Hidden player container - keeps YouTube player alive when panel closed */}
      <div style={{ position: 'fixed', left: '-9999px', top: '-9999px', pointerEvents: 'none' }}>
        <div
          id={playerContainerId}
          style={{ width: '640px', height: '360px' }}
        />
      </div>

      {isPanelVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 100 }}
          onClick={onClose}
        >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-md mx-4 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          animation: 'slideUp 0.25s ease-out',
          maxHeight: '80vh',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Ambient music"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Music</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close music panel"
          >
            <span className="text-white text-xl">×</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search YouTube…"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Search YouTube music"
          />
        </div>

        {/* Results List */}
        <div className="px-4 pb-4 max-h-64 overflow-y-auto">
          {isSearching && (
            <div className="text-center text-white/70 py-4">Searching...</div>
          )}

          {error && (
            <div className="text-center text-red-400 py-4">{error}</div>
          )}

          {!isSearching && !error && results.length === 0 && debouncedQuery && (
            <div className="text-center text-white/70 py-4">
              No results. Try another query.
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((result) => (
                <button
                  key={result.videoId}
                  onClick={() => handleSelectVideo(result.videoId, result.title)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSelectVideo(result.videoId, result.title);
                    }
                  }}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left"
                  style={{
                    background:
                      selectedVideo === result.videoId
                        ? 'rgba(124, 58, 237, 0.3)'
                        : 'transparent',
                  }}
                  aria-label={`Play ${result.title} by ${result.channelTitle}`}
                >
                  <img
                    src={result.thumbnail}
                    alt=""
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">
                      {result.title}
                    </div>
                    <div className="text-white/60 text-xs truncate">
                      {result.channelTitle}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mini Player - Visual preview only (actual player is hidden offscreen) */}
        <div className="p-4 border-t border-white/10">
          {selectedVideo && (
            <div className="mb-3">
              <div className="w-full rounded-lg overflow-hidden bg-black/20 flex items-center justify-center" style={{ height: '200px' }}>
                <div className="text-white/40 text-sm">Player active</div>
              </div>
            </div>
          )}

          {!selectedVideo && (
            <div className="text-center text-white/60 py-8 text-sm">
              Search and select a video to play music
            </div>
          )}
          
          {selectedVideo && (
            <>

              {/* Controls */}
              {isReady && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePlayPause}
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
                    aria-label={isPlaying ? 'Pause music' : 'Play music'}
                  >
                    {isPlaying ? '⏸ Pause' : '▶ Play'}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVolumeChange(-10)}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-white transition-colors"
                      aria-label="Decrease volume"
                    >
                      🔉
                    </button>
                    <span className="text-white text-sm w-8 text-center">
                      {volume}
                    </span>
                    <button
                      onClick={() => handleVolumeChange(10)}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-white transition-colors"
                      aria-label="Increase volume"
                    >
                      🔊
                    </button>
                  </div>
                </div>
              )}

              {!isReady && (
                <div className="text-center text-white/60 py-2 text-sm">
                  Loading player...
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </div>
      )}

      {/* Screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .focus-ring:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}
