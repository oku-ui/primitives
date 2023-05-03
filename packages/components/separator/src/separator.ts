import { defineComponent, h, ref } from "vue"
import type { ComponentPropsWithoutRef, ElementRef } from '@oku-ui/primitive'
import { Primitive } from "@oku-ui/primitive"

type PrimitiveSeparatorProps = ComponentPropsWithoutRef<typeof Primitive.div>

interface SeparatorProps extends PrimitiveSeparatorProps {}
type SeparatorElement = ElementRef<typeof Primitive.div>

const NAME = "Separator"

const Separator = defineComponent<SeparatorProps>({
  name: NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    const inferRef = ref<SeparatorElement>()

    expose({
      inferRef,
    })

    return () =>
      h(
        Primitive.div,
        {
          ...attrs,
          ref: inferRef,
        },
        slots.default?.(),
      )
  },
})

const OkuSeparator = Separator

export { OkuSeparator, Separator }
export type { SeparatorProps }
