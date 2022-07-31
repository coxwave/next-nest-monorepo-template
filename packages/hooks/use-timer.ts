import { useCallback, useRef } from 'react';

import type { MaybePromise } from '@packages/types';

export function useTimer() {
  const timer = useRef<NodeJS.Timeout>();

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const resetTimer = useCallback(
    (autoCloseMS: number, callback: () => MaybePromise<void>) => {
      clearTimer();
      timer.current = setTimeout(callback, autoCloseMS);
    },
    [clearTimer],
  );

  return { resetTimer, clearTimer };
}
