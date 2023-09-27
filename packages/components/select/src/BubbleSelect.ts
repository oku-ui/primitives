import {
  reactiveOmit,
  useComposedRefs,
  useForwardRef,
  usePrevious,
} from '@oku-ui/use-composable'
import {
  defineComponent,
  h,
  mergeProps,
  reactive,
  ref,
  toRefs,
  watchEffect,
} from 'vue'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'

export type BubbleSelectElement = HTMLSelectElement

export interface BubblSelectProps extends Omit<BubbleSelectElement, 'value'> {
  value: string | number
}

const BUBBLE_SELECT = 'OkuBubbleSelect'

const bubbleSelectProps = {
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
  },
}

export const BubbleSelect = defineComponent({
  name: BUBBLE_SELECT,
  props: {
    ...bubbleSelectProps.props,
  },
  setup(props, { attrs }) {
    const { value: defaultValue, ...selectProps } = toRefs(props)

    const _reactive = reactive(selectProps)
    const reactiveSelectProps = reactiveOmit(
      _reactive,
      (key, _value) => key === undefined,
    )

    const selectRef = ref<HTMLSelectElement | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(selectRef, forwardedRef)
    const prevValue = usePrevious(defaultValue)

    // Bubble value change to parents (e.g form change event)
    watchEffect(() => {
      const select = selectRef.value!
      const selectProto = window.HTMLSelectElement.prototype
      const descriptor = Object.getOwnPropertyDescriptor(
        selectProto,
        'value',
      ) as PropertyDescriptor

      const setValue = descriptor.set
      if (prevValue.value !== defaultValue.value && setValue) {
        const event = new Event('change', { bubbles: true })
        setValue.call(select, defaultValue.value)
        select.dispatchEvent(event)
      }
    })

    /**
     * We purposefully use a `select` here to support form autofill as much
     * as possible.
     *
     * We purposefully do not add the `value` attribute here to allow the value
     * to be set programatically and bubble to any parent form `onChange` event.
     * Adding the `value` will cause React to consider the programatic
     * dispatch a duplicate and it will get swallowed.
     *
     * We use `VisuallyHidden` rather than `display: "none"` because Safari autofill
     * won't work otherwise.
     */
    const originalReturn = () =>
      h(
        OkuVisuallyHidden,
        {
          asChild: true,
        },
        {
          default: () =>
            h('select', {
              ...mergeProps(attrs, reactiveSelectProps),
              ref: composedRefs,
              defaultValue: defaultValue.value,
            }),
        },
      )

    return originalReturn
  },
})

export const OkuBubbleInput = BubbleSelect as typeof BubbleSelect &
(new () => {
  $props: BubbleSelectElement
})
