import { useState, useCallback, useEffect, useRef } from "react";

interface UseRowScrollOptions {
  scrollAmount?: number; // percentage of visible width to scroll (0-1)
}

interface UseRowScrollReturn {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
  isDragging: boolean;
}

export function useRowScroll({
  scrollAmount = 0.85,
}: UseRowScrollOptions = {}): UseRowScrollReturn {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // ── Drag-to-scroll state ────────────────────────
  const isDragging = useRef(false);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const hasMoved = useRef(false);

  // ── Check scroll bounds ─────────────────────────
  const checkScrollBounds = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  // ── Scroll by visible width ─────────────────────
  const scrollLeftFn = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const distance = el.clientWidth * scrollAmount;
    el.scrollBy({ left: -distance, behavior: "smooth" });
  }, [scrollAmount]);

  const scrollRightFn = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const distance = el.clientWidth * scrollAmount;
    el.scrollBy({ left: distance, behavior: "smooth" });
  }, [scrollAmount]);

  // ── Drag-to-scroll handlers ─────────────────────
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    isDragging.current = true;
    setIsDraggingState(true);
    hasMoved.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollStart.current = el.scrollLeft;
    el.style.scrollSnapType = "none";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const el = scrollRef.current;
    if (!el) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.2; // multiplier for faster feel

    if (Math.abs(walk) > 5) hasMoved.current = true;

    el.scrollLeft = scrollStart.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.style.scrollSnapType = "";

    isDragging.current = false;
    setIsDraggingState(false);

    // Prevent click events if we were dragging
    if (hasMoved.current) {
      const preventClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      };

      document.addEventListener("click", preventClick, {
        capture: true,
        once: true,
      });

      // Safety cleanup
      setTimeout(() => {
        document.removeEventListener("click", preventClick, { capture: true });
      }, 100);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) {
      handleMouseUp();
    }
  }, [handleMouseUp]);

  // ── Observe scroll position ─────────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollBounds();

    el.addEventListener("scroll", checkScrollBounds, { passive: true });

    const resizeObserver = new ResizeObserver(checkScrollBounds);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScrollBounds);
      resizeObserver.disconnect();
    };
  }, [checkScrollBounds]);

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft: scrollLeftFn,
    scrollRight: scrollRightFn,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    isDragging: isDraggingState,
  };
}
