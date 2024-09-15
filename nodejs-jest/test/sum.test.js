import { sum } from '../src/sum.js';

test('sum(1,2) must be 3', () => {
  const result = sum(1, 3);
  expect(result).toBe(3);
});
