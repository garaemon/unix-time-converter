export type TimeUnit = 's' | 'ms' | 'us' | 'ns';

export function detectUnit(timestamp: number): TimeUnit {
  const digits = Math.floor(Math.log10(Math.abs(timestamp))) + 1;
  
  // Heuristics based on typical current timestamps (around 1.7 billion for seconds)
  if (digits <= 11) return 's'; // Up to ~100 billion seconds (year 5138)
  if (digits <= 14) return 'ms';
  if (digits <= 17) return 'us';
  return 'ns';
}

export function normalizeToMillis(timestamp: number, unit: TimeUnit): number {
  switch (unit) {
    case 's': return timestamp * 1000;
    case 'ms': return timestamp;
    case 'us': return Math.floor(timestamp / 1000);
    case 'ns': return Math.floor(timestamp / 1000000);
  }
}

export function formatUnit(unit: TimeUnit): string {
  switch (unit) {
    case 's': return 'Seconds';
    case 'ms': return 'Milliseconds';
    case 'us': return 'Microseconds';
    case 'ns': return 'Nanoseconds';
  }
}
