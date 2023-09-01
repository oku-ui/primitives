import type { PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'

const NAME = 'OkuSeparator'
const DEFAULT_ORIENTATION = 'horizontal'
const ORIENTATIONS = ['horizontal', 'vertical'] as const

type Orientation = typeof ORIENTATIONS[number]

export type SeparatorIntrinsicElement = ElementType<'div'>
export type SeparatorElement = HTMLDivElement

export interface SeparatorProps extends PrimitiveProps {
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

export const separatorProps = {
  props: {
    /**
  * Whether or not the component is purely decorative. When true, accessibility-related attributes
  * are updated so that that the rendered element is removed from the accessibility tree.
  */
    decorative: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    /**
     * Either `vertical` or `horizontal`. Defaults to `horizontal`.
     */
    orientation: {
      type: String as PropType<Orientation | undefined>,
      default: undefined,
    },
    ...primitiveProps,
  },
}

const separator = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...separatorProps.props,
  },
  setup(props, { attrs, slots }) {
    const { ...separatorAttrs } = attrs as SeparatorIntrinsicElement
    const orientation = computed(() => ORIENTATIONS.includes(props.orientation || DEFAULT_ORIENTATION) ? props.orientation : DEFAULT_ORIENTATION)
    // `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
    const ariaOrientation = orientation.value === 'vertical' ? orientation : undefined
    const semanticProps = props.decorative ? { role: 'none' } : { 'aria-orientation': ariaOrientation?.value, 'role': 'separator' }

    const forwardedRef = useForwardRef()

    const originalReturn = () =>
      h(
        Primitive.div,
        {
          ...attrs,
          'ref': forwardedRef,
          ...semanticProps,
          'data-orientation': orientation.value,
          'style': {
            ...separatorAttrs,
            border: 'none',
          },
          'asChild': props.asChild,
        },
        {
          default: () => slots.default?.(),
        },
      )

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSeparator = separator as typeof separator &
(new () => {
  $props: Partial<SeparatorElement>
})
