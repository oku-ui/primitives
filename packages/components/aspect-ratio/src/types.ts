import type { ComponentPropsWithoutRef, ElementRef, Primitive } from '@oku-ui/primitive'

export type PrimitiveAspectRatioProps = ComponentPropsWithoutRef<typeof Primitive.div>
export type AspectRatioElement = ElementRef<typeof Primitive.div>

export interface AspectRatioProps extends PrimitiveAspectRatioProps {
  ratio?: number
}
