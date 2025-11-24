import { useMemo } from 'react';
import anniversaries from '../constants/anniversaries.js';
import { getNextAnniversary } from '../utils/dateUtils.js';

export default function useAnniversaries() {
  const next = useMemo(() => getNextAnniversary(anniversaries), []);
  const timeline = useMemo(
    () =>
      anniversaries.map((item) => ({
        ...item
      })),
    []
  );

  return { timeline, next };
}
