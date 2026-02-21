import { useState, useCallback, useEffect, useRef } from "react";

interface UseHeroCarouselOptions {
  totalSlides: number;
  autoRotateInterval: number;
  enabled?: boolean;
}

interface UseHeroCarouselReturn {
  currentIndex: number;
  previousIndex: number;
  goTo: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  isPaused: boolean;
  togglePause: () => void;
  pause: () => void;
  resume: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  showVideo: boolean;
  setShowVideo: (show: boolean) => void;
  isTransitioning: boolean;
}

export function useHeroCarousel({
  totalSlides,
  autoRotateInterval,
  enabled = true,
}: UseHeroCarouselOptions): UseHeroCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // ── Clear all timers ────────────────────────────
  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (videoDelayRef.current) {
      clearTimeout(videoDelayRef.current);
      videoDelayRef.current = null;
    }
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  }, []);

  // ── Transition to a specific slide ──────────────
  const goTo = useCallback(
    (index: number) => {
      if (index === currentIndex || isTransitioning) return;

      setIsTransitioning(true);
      setPreviousIndex(currentIndex);
      setShowVideo(false);
      setCurrentIndex(index);

      // Allow transition animation to complete
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 600);

      // Delay video playback after slide settles
      videoDelayRef.current = setTimeout(() => {
        setShowVideo(true);
      }, 2000);
    },
    [currentIndex, isTransitioning],
  );

  const goToNext = useCallback(() => {
    const next = (currentIndex + 1) % totalSlides;
    goTo(next);
  }, [currentIndex, totalSlides, goTo]);

  const goToPrevious = useCallback(() => {
    const prev = (currentIndex - 1 + totalSlides) % totalSlides;
    goTo(prev);
  }, [currentIndex, totalSlides, goTo]);

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((m) => !m);
  }, []);

  // ── Auto-rotation timer ─────────────────────────
  useEffect(() => {
    if (!enabled || isPaused || totalSlides <= 1) {
      clearTimers();
      return;
    }

    timerRef.current = setTimeout(goToNext, autoRotateInterval);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    currentIndex,
    isPaused,
    enabled,
    totalSlides,
    autoRotateInterval,
    goToNext,
    clearTimers,
  ]);

  // ── Start video after initial mount ─────────────
  useEffect(() => {
    videoDelayRef.current = setTimeout(() => {
      setShowVideo(true);
    }, 2000);

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentIndex,
    previousIndex,
    goTo,
    goToNext,
    goToPrevious,
    isPaused,
    togglePause,
    pause,
    resume,
    isMuted,
    toggleMute,
    showVideo,
    setShowVideo,
    isTransitioning,
  };
}
