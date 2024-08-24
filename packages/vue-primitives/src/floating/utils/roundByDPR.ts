import { getDPR } from './getDPR.ts'

export function roundByDPR(element: Element, value: number) {
  const dpr = getDPR(element)

  return Math.round(value * dpr) / dpr
}
