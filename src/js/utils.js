/**
 * Shared utilities for nicart.space
 */

/**
 * Get normalized mouse position relative to an element (0-1 range)
 * @param {MouseEvent} e
 * @param {HTMLElement} el
 * @returns {{x: number, y: number}} normalized coords (0 to 1)
 */
export function getRelativeMousePos(e, el) {
  const rect = el.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) / rect.width,
    y: (e.clientY - rect.top) / rect.height,
  };
}

/**
 * Get centered mouse position relative to an element (-1 to 1 range)
 * @param {MouseEvent} e
 * @param {HTMLElement} el
 * @returns {{x: number, y: number}} centered coords (-1 to 1)
 */
export function getCenteredMousePos(e, el) {
  const pos = getRelativeMousePos(e, el);
  return {
    x: (pos.x - 0.5) * 2,
    y: (pos.y - 0.5) * 2,
  };
}

/**
 * Clamp a value between min and max
 */
export function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

/**
 * Linear interpolation
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}
