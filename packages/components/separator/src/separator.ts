import { defineComponent, h, ref } from 'vue'
import type { ComponentPropsWithoutRef, ElementRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

type PrimitiveSeparatorProps = ComponentPropsWithoutRef<typeof Primitive.div>

// interface SeparatorProps extends PrimitiveSeparatorProps {}
// type SeparatorElement = ElementRef<typeof Primitive.div>

const NAME = 'Separator'
const DEFAULT_ORIENTATION = 'horizontal'
const ORIENTATIONS = ['horizontal', 'vertical'] as const

type Orientation = typeof ORIENTATIONS[number]
type SeparatorElement = ElementRef<typeof Primitive.div>
interface SeparatorProps extends PrimitiveSeparatorProps {
  /**
   * Either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  orientation?: Orientation
  /**
   * Whether or not the component is purely decorative. When true, accessibility-related attributes
   * are updated so that that the rendered element is removed from the accessibility tree.
   */
  decorative?: boolean
//   height?: string
//   width?: string
}

const Separator = defineComponent<SeparatorProps>({
  name: NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, style } = attrs as any

    const orientation = ORIENTATIONS.includes(orientationProp) ? orientationProp : DEFAULT_ORIENTATION
    // `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
    const ariaOrientation = orientation === 'vertical' ? orientation : undefined
    const semanticProps = decorative ? { role: 'none' } : { 'aria-orientation': ariaOrientation, role: 'separator' }

    const inferRef = ref<SeparatorElement>()

    expose({
      inferRef,
    })

    return () =>
      h(
        Primitive.div,
        {
          ...attrs,
          ref: inferRef,
          ...semanticProps,
          dataOrientation: orientation,
          style: {
            ...style,
            border: 'none',
          },
        },
        slots.default?.(),
      )
  },
})

const OkuSeparator = Separator

export { OkuSeparator, Separator }
export type { SeparatorProps }
