import type { ComponentPublicInstance } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

type LabelElement = ElementType<'label'>
interface LabelProps extends PrimitiveProps {}

const NAME = 'Label'

const label = defineComponent({
  name: NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    const innerRef = ref<ComponentPublicInstance>()
    const { ...restAttrs } = attrs as LabelElement

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })
    const originalReturn = () => h(Primitive.label, {
      ...restAttrs,
      ref: innerRef,
      onMousedown: (event: MouseEvent) => {
        restAttrs.onMousedown?.(event)
        // prevent text selection when double clicking label
        if (!event.defaultPrevented && event.detail > 1)
          event.preventDefault()
      },
    },
    () => slots.default?.(),
    )
    return originalReturn as unknown as {
      innerRef: LabelElement
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _LabelProps = MergeProps<LabelProps, LabelElement>
type LabelRef = RefElement<typeof label>

const OkuLabel = label as typeof label & (new () => { $props: _LabelProps })

export { OkuLabel }
export type { LabelProps, LabelElement, LabelRef }
