import { defineComponent, h } from 'vue'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'

type LabelElement = ElementType<'label'>
export type _LabelEl = HTMLLabelElement
interface LabelProps extends IPrimitiveProps {}

const NAME = 'Label'

const label = defineComponent({
  name: NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    const { ...restAttrs } = attrs as LabelElement

    const forwardedRef = useForwardRef()

    const originalReturn = () => h(Primitive.label, {
      ...restAttrs,
      ref: forwardedRef,
      onMousedown: (event: MouseEvent) => {
        restAttrs.onMousedown?.(event)
        // prevent text selection when double clicking label
        if (!event.defaultPrevented && event.detail > 1)
          event.preventDefault()
      },
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _LabelProps = MergeProps<LabelProps, LabelElement>
type InstanceLabelType = InstanceTypeRef<typeof label, _LabelEl>

const OkuLabel = label as typeof label & (new () => { $props: _LabelProps })

export { OkuLabel }
export type { LabelProps, LabelElement, InstanceLabelType }
