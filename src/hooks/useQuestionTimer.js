import { useCallback, useEffect, useRef, useState } from "react";

export function useQuestionTimer(duration, active, onTimeout) {
  const [remaining, setRemaining] = useState(duration);
  const startRef = useRef(0);
  const timeoutRef = useRef(onTimeout);
  const firedRef = useRef(false);
  timeoutRef.current = onTimeout;

  useEffect(() => {
    setRemaining(duration);
    firedRef.current = false;
    if (!active) return undefined;
    startRef.current = performance.now();
    let frame;
    const tick = (now) => {
      const left = Math.max(0, duration - (now - startRef.current) / 1000);
      setRemaining(left);
      if (left <= 0) {
        if (!firedRef.current) {
          firedRef.current = true;
          timeoutRef.current?.(duration * 1000);
        }
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, active]);

  const elapsedMs = useCallback(() => performance.now() - startRef.current, []);
  return { remaining, elapsedMs };
}
