import type { TooltipContentProps } from './TooltipContent.vue'

export type Point = { x: number, y: number }
export type Polygon = Point[]

export type Side = NonNullable<TooltipContentProps['side']>
