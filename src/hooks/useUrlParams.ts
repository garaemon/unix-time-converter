import { useState } from 'react';
import type { TimeUnit } from '../utils/time';

interface UrlParams {
  time: string | null;
  unit: TimeUnit | null;
  tz: string | null;
}

export function useUrlParams(): UrlParams {
  const [params] = useState<UrlParams>(() => {
    if (typeof window === 'undefined') {
        return { time: null, unit: null, tz: null };
    }
    const searchParams = new URLSearchParams(window.location.search);
    return {
      time: searchParams.get('time'),
      unit: searchParams.get('unit') as TimeUnit | null,
      tz: searchParams.get('tz'),
    };
  });

  return params;
}