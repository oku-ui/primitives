import { defineComponent, h, onMounted, ref } from 'vue'
import type { ComponentPropsWithoutRef, ElementRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

type PrimitiveLabelProps = ComponentPropsWithoutRef<typeof Primitive.label>

interface LabelProps extends PrimitiveLabelProps { }
type LabelElement = ElementRef<typeof Primitive.label> & { innerRef: LabelElement }

const NAME = 'Label'

const label = defineComponent<LabelProps>({
  name: NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    const innerRef = ref<LabelElement>()
    onMounted(() => {
      innerRef.value = innerRef.value?.innerRef
    })

    expose({
      innerRef,
    })

    return () => h(Primitive.label, {
      ...attrs,
      ref: innerRef,
      onMousedown: (event: MouseEvent) => {
        props.onMousedown?.(event)
        // prevent text selection when double clicking label
        if (!event.defaultPrevented && event.detail > 1)
          event.preventDefault()
      },
    },
    slots.default?.(),
    )
  },
})

const OkuLabel = label

export { OkuLabel, label }
export type { LabelProps }
