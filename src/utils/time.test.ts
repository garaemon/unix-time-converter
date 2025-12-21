import { describe, it, expect } from 'vitest';
import { detectUnit, normalizeToMillis } from './time';

describe('detectUnit', () => {
  it('should detect seconds', () => {
    expect(detectUnit(1700000000)).toBe('s');
  });

  it('should detect milliseconds', () => {
    expect(detectUnit(1700000000000)).toBe('ms');
  });

  it('should detect microseconds', () => {
    expect(detectUnit(1700000000000000)).toBe('us');
  });

  it('should detect nanoseconds', () => {
    expect(detectUnit(1700000000000000000)).toBe('ns');
  });
});

describe('normalizeToMillis', () => {
  it('should convert seconds to millis', () => {
    expect(normalizeToMillis(1, 's')).toBe(1000);
  });

  it('should keep millis as is', () => {
    expect(normalizeToMillis(1000, 'ms')).toBe(1000);
  });

  it('should convert microseconds to millis', () => {
    expect(normalizeToMillis(1000000, 'us')).toBe(1000);
  });

  it('should convert nanoseconds to millis', () => {
    expect(normalizeToMillis(1000000000, 'ns')).toBe(1000);
  });
});
