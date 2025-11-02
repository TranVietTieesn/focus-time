/**
 * useYouTubePlayer - Manages YouTube IFrame Player API
 * No autoplay before user interaction
 * Load script, initialize player, control playback (cue, play/pause, volume)
 */

import { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YT {
  Player: new (elementId: string, config: YTPlayerConfig) => YTPlayer;
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

interface YTPlayerConfig {
  height?: string;
  width?: string;
  videoId?: string;
  playerVars?: {
    autoplay?: 0 | 1;
    controls?: 0 | 1;
    modestbranding?: 0 | 1;
    rel?: 0 | 1;
    fs?: 0 | 1;
    listType?: 'search' | 'playlist';
    list?: string;
    origin?: string;
  };
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
    onStateChange?: (event: { data: number; target: YTPlayer }) => void;
  };
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  cueVideoById: (videoId: string) => void;
  loadVideoById: (videoId: string) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getPlayerState: () => number;
  destroy: () => void;
}

interface UseYouTubePlayerProps {
  containerId: string;
  onReady?: () => void;
  onStateChange?: (state: number) => void;
}

export function useYouTubePlayer({
  containerId,
  onReady,
  onStateChange,
}: UseYouTubePlayerProps) {
  const playerRef = useRef<YTPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(50);

  // Load YouTube IFrame API script
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  // Initialize player
  const initPlayer = useCallback(() => {
    if (!window.YT || !window.YT.Player || playerRef.current) {
      return;
    }

    try {
      playerRef.current = new window.YT.Player(containerId, {
        height: '200',
        width: '100%',
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          fs: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            setIsReady(true);
            event.target.setVolume(volume);
            onReady?.();
          },
          onStateChange: (event) => {
            const state = event.data;
            setIsPlaying(state === window.YT.PlayerState.PLAYING);
            onStateChange?.(state);
          },
        },
      });
    } catch (error) {
      console.error('Failed to initialize YouTube player:', error);
    }
  }, [containerId, volume, onReady, onStateChange]);

  // Wait for API to load, then initialize
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }
  }, [initPlayer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Failed to destroy YouTube player:', error);
        }
        playerRef.current = null;
      }
    };
  }, []);

  // Control methods
  const cueVideo = useCallback((videoId: string) => {
    if (playerRef.current && isReady) {
      playerRef.current.cueVideoById(videoId);
    }
  }, [isReady]);

  const play = useCallback(() => {
    if (playerRef.current && isReady) {
      playerRef.current.playVideo();
    }
  }, [isReady]);

  const pause = useCallback(() => {
    if (playerRef.current && isReady) {
      playerRef.current.pauseVideo();
    }
  }, [isReady]);

  const stop = useCallback(() => {
    if (playerRef.current && isReady) {
      playerRef.current.stopVideo();
    }
  }, [isReady]);

  const setVolume = useCallback((vol: number) => {
    const clampedVol = Math.max(0, Math.min(100, vol));
    setVolumeState(clampedVol);
    if (playerRef.current && isReady) {
      playerRef.current.setVolume(clampedVol);
    }
  }, [isReady]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return {
    isReady,
    isPlaying,
    volume,
    cueVideo,
    play,
    pause,
    stop,
    setVolume,
    togglePlayPause,
  };
}
