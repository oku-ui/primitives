import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useListeners, usePrevious, useSize } from '@oku-ui/use-composable'
import { SWITCH_BUBBLE_INPUT_NAME, bubbleInputProps } from './props'
import type { BubbleInputNativeElement } from './props'

const bubbleInput = defineComponent({
  name: SWITCH_BUBBLE_INPUT_NAME,
  components: { },
  inheritAttrs: false,
  props: {
    ...bubbleInputProps.props,
  },
  emits: {
    ...bubbleInputProps.emits,
  },
  setup(props, { attrs }) {
    const {
      checked,
      bubbles,
      control,
      ...inputProps
    } = toRefs(props)

    const _reactive = reactive(inputProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const emits = useListeners()

    const inputRef = ref<HTMLInputElement | null>(null)
    const prevChecked = usePrevious(checked)
    const controlSize = computed(() => useSize(control))

    // Bubble checked change to parents (e.g form change event)
    watchEffect(() => {
      const input = inputRef.value!
      const inputProto = window.HTMLInputElement.prototype
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked') as PropertyDescriptor
      const setChecked = descriptor.set

      if (prevChecked.value !== checked.value && setChecked) {
        const event = new Event('click', { bubbles: bubbles.value })
        setChecked.call(input, checked.value)
        input.dispatchEvent(event)
      }
    })

    return () => h('input', {
      'type': 'checkbox',
      'aria-hidden': true,
      'defaultChecked': checked.value ? false : checked.value,
      ...mergeProps(attrs, otherProps, emits),
      'tabIndex': -1,
      'ref': inputRef,
      'style': {
        ...attrs.style as any,
        ...controlSize.value,
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: '0px',
      },
    })
  },
})

export const OkuBubbleInput = bubbleInput as typeof bubbleInput & (new () => { $props: BubbleInputNativeElement })
