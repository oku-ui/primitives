export type Point = [number, number]
export type Polygon = Point[]

// @see floatin-ui
export function isPointInPolygon(point: Point, polygon: Polygon) {
  const [x, y] = point
  let isInside = false
  const length = polygon.length
  for (let i = 0, j = length - 1; i < length; j = i++) {
    const [xi, yi] = polygon[i] || [0, 0]
    const [xj, yj] = polygon[j] || [0, 0]
    const intersect
      // eslint-disable-next-line style/no-mixed-operators
      = yi >= y !== yj >= y && x <= ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) {
      isInside = !isInside
    }
  }
  return isInside
}
