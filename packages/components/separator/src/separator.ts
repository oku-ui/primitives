import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'

const NAME = 'OkuSeparator'
const DEFAULT_ORIENTATION = 'horizontal'
const ORIENTATIONS = ['horizontal', 'vertical'] as const

type Orientation = typeof ORIENTATIONS[number]

export type SeparatorNaviteElement = OkuElement<'div'>
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
    const { decorative, orientation: asOrientation, ...domProps } = toRefs(props)
    const _reactive = reactive(domProps)
    const reactiveDomProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const orientation = computed(() => ORIENTATIONS.includes(asOrientation.value!) ? asOrientation.value : DEFAULT_ORIENTATION)
    // `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
    const ariaOrientation = computed(() => orientation.value === 'vertical' ? orientation.value : undefined)
    const semanticProps = computed(() => decorative.value ? { role: 'none' } : { 'aria-orientation': ariaOrientation?.value, 'role': 'separator' })

    const forwardedRef = useForwardRef()

    const originalReturn = () => {
      if (!isValidOrientation(orientation.value))
        return new Error(getInvalidOrientationError(String(orientation.value), NAME))

      return h(
        Primitive.div,
        {
          'data-orientation': orientation.value,
          ...semanticProps.value,
          ...mergeProps(attrs, reactiveDomProps),
          'ref': forwardedRef,
        },
        {
          default: () => slots.default?.(),
        },
      )
    }

    return originalReturn
  },
})

// Split this out for clearer readability of the error message.
function getInvalidOrientationError(value: string, componentName: string) {
  return `Invalid prop \`orientation\` of value \`${value}\` supplied to \`${componentName}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${DEFAULT_ORIENTATION}\`.`
}

function isValidOrientation(orientation: any): orientation is Orientation {
  return ORIENTATIONS.includes(orientation)
}

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSeparator = separator as typeof separator &
(new () => {
  $props: SeparatorNaviteElement
})
