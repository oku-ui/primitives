import type { ComponentPublicInstance, PropType } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

const NAME = 'Separator'
const DEFAULT_ORIENTATION = 'horizontal'
const ORIENTATIONS = ['horizontal', 'vertical'] as const

type Orientation = typeof ORIENTATIONS[number]
type SeparatorElement = ElementType<'div'>

interface SeparatorProps extends PrimitiveProps {
  /**
  * Whether or not the component is purely decorative. When true, accessibility-related attributes
  * are updated so that that the rendered element is removed from the accessibility tree.
  */
  decorative?: boolean
  /**
   * Either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  orientation?: Orientation
}

const Separator = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    /**
    * Whether or not the component is purely decorative. When true, accessibility-related attributes
    * are updated so that that the rendered element is removed from the accessibility tree.
    */
    decorative: {
      type: Boolean,
      default: false,
    },
    /**
     * Either `vertical` or `horizontal`. Defaults to `horizontal`.
     */
    orientation: {
      type: String as PropType<Orientation>,
      default: DEFAULT_ORIENTATION,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { ...domProps } = attrs as SeparatorElement
    const orientation = ORIENTATIONS.includes(props.orientation) ? props.orientation : DEFAULT_ORIENTATION
    // `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
    const ariaOrientation = orientation === 'vertical' ? orientation : undefined
    const semanticProps = props.decorative ? { role: 'none' } : { 'aria-orientation': ariaOrientation, 'role': 'separator' }
    const dataOrientation = { 'data-orientation': orientation }

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
          ...dataOrientation,
          style: {
            ...domProps,
            border: 'none',
          },
        },
        {
          default: () => slots.default?.(),
        },
      )

    return originalReturn as unknown as {
      innerRef: SeparatorElement
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _SeparatorProps = MergeProps<SeparatorProps, PrimitiveProps>
type SeparatorRef = RefElement<typeof Separator>

const OkuSeparator = Separator as typeof Separator & (new () => { $props: _SeparatorProps })

export { OkuSeparator }
export type {
  SeparatorProps,
  SeparatorElement,
  SeparatorRef,
}
