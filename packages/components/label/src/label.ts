import type { ComponentPublicInstance } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import type { ComponentPropsWithoutRef, ElementRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { MergeProps } from '@oku-ui/utils'

type PrimitiveLabelProps = ComponentPropsWithoutRef<typeof Primitive.label>

type LabelElement = ElementRef<typeof Primitive.label>

type LabelProps = MergeProps<typeof label, PrimitiveLabelProps>

const NAME = 'Label'

const label = defineComponent({
  name: NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    const innerRef = ref<ComponentPublicInstance>()
    const { ...restAttrs } = attrs as LabelProps

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

const OkuLabel = label as typeof label & (new () => { $props: LabelProps })
type OkuLabelElement = Omit<InstanceType<typeof label>, keyof ComponentPublicInstance>

export { OkuLabel }
export type { LabelProps, OkuLabelElement }
