import type { ComponentPublicInstance, PropType } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import type { ComponentPropsWithoutRef, ElementRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { MergeProps } from '@oku-ui/utils'

type PrimitiveSeparatorProps = ComponentPropsWithoutRef<typeof Primitive.div>

const NAME = 'Separator'
const DEFAULT_ORIENTATION = 'horizontal'
const ORIENTATIONS = ['horizontal', 'vertical'] as const

type Orientation = typeof ORIENTATIONS[number]
type SeparatorElement = ElementRef<typeof Primitive.div>

type SeparatorProps = MergeProps<typeof Separator, PrimitiveSeparatorProps>

const Separator = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    /**
     * Either `vertical` or `horizontal`. Defaults to `horizontal`.
    */
    decorative: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether or not the component is purely decorative. When true, accessibility-related attributes
     * are updated so that that the rendered element is removed from the accessibility tree.
     */
    orientation: {
      type: String as unknown as PropType<Orientation>,
      default: DEFAULT_ORIENTATION,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { ...domProps } = attrs as PrimitiveSeparatorProps
    const orientation = ORIENTATIONS.includes(props.orientation) ? props.orientation : DEFAULT_ORIENTATION
    // `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
    const ariaOrientation = orientation === 'vertical' ? orientation : undefined
    const semanticProps = props.decorative ? { role: 'none' } : { 'aria-orientation': ariaOrientation, 'role': 'separator' }

    const innerRef = ref<ComponentPublicInstance>()

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () =>
      h(
        Primitive.div,
        {
          ...attrs,
          ref: innerRef,
          ...semanticProps,
          dataOrientation: orientation,
          style: {
            ...domProps,
            border: 'none',
          },
        },
        slots.default?.(),
      )

    return originalReturn as unknown as {
      innerRef: SeparatorElement
    }
  },
})

const OkuSeparator = Separator as typeof Separator & (new () => { $props: SeparatorProps })

type OkuSeparatorElement = Omit<InstanceType<typeof OkuSeparator>, keyof ComponentPublicInstance>

export { OkuSeparator }
export type { SeparatorProps, OkuSeparatorElement }
