import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('useCounter', () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);
  expect(result.current.increment).toBeInstanceOf(Function);
  expect(result.current.decrement).toBeInstanceOf(Function);
});

test('useCounter increment', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);

  act(() => {
    result.current.increment(10);
  });

  expect(result.current.count).toBe(11);
});

test('useCounter decrement', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(-1);

  act(() => {
    result.current.decrement(10);
  });

  expect(result.current.count).toBe(-11);
});

test('useCounter increment and decrement', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment(10);
  });

  expect(result.current.count).toBe(10);

  act(() => {
    result.current.decrement(10);
  });

  expect(result.current.count).toBe(0);
});
