/**
 * Ensures x-values are increasing in magnitude. It reverses y if x was reversed.
 *
 * * Does not mutate arrays
 * * Assumes that X is either increasing or decreasing, not any random order.
 * * Expects x and y to be the same length
 * @param x - array of x values
 * @param y - array of y values
 * @returns Tuple with potentially reversed x and y arrays
 */
export function ensureIncreasingXValues(
  x: Float64Array,
  y: Float64Array,
): [Float64Array, Float64Array] {
  const xL = x.length;
  if (xL !== 0) {
    if (y.length !== xL) {
      //wouldn't really make sense for x and y to be !==
      throw new RangeError('x and y length must be the same');
    }

    const firstX = x[0];
    const lastX = x[x.length - 1];

    if (firstX > lastX) {
      return [x.slice().reverse(), y.slice().reverse()];
    }
  }
  return [x, y];
}
