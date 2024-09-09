import { type Component, defineComponent, h, type PropType, shallowRef } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { Slot } from '../slot/index.ts'

export type AsTag =
  | 'a'
  | 'button'
  | 'div'
  | 'form'
  | 'h2'
  | 'h3'
  | 'img'
  | 'input'
  | 'label'
  | 'li'
  | 'nav'
  | 'ol'
  | 'p'
  | 'span'
  | 'svg'
  | 'ul'
  | 'template'
  | ({} & string) // any other string

export interface PrimitiveProps {
  as?: AsTag | object
}

const singleHtmlTags = new Set(['input', 'img'])

export const Primitive = defineComponent({
  name: 'Primitive',
  props: {
    as: {
      type: [String, Object] as PropType<AsTag | Component>,
      default: 'div',
    },
  },
  setup(props, ctx) {
    const asChild = props.as === 'template'
    if (asChild) {
      const $el = shallowRef<HTMLElement>()
      const forwardElement = useForwardElement($el)
      ctx.expose({ $el })

      return () => h(Slot, { ref: forwardElement }, { default: ctx.slots.default })
    }

    const isSingleHtmlTag = typeof props.as === 'string' && singleHtmlTags.has(props.as)

    if (isSingleHtmlTag) {
      return () => h(props.as, {})
    }

    const $el = shallowRef<HTMLElement>()
    const forwardElement = useForwardElement($el)
    ctx.expose({ $el })

    return () => h(props.as, { ref: forwardElement }, { default: ctx.slots.default })
  },
})
