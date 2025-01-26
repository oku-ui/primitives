import type { Component, PropType } from 'vue'
import { defineComponent, h } from 'vue'
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
  inheritAttrs: false,
  props: {
    as: {
      type: [String, Object] as PropType<AsTag | Component>,
      default: 'div',
    },
  },
  setup(props, ctx) {
    const asChild = props.as === 'template'
    if (asChild) {
      return () => h(Slot, ctx.attrs, { default: ctx.slots.default })
    }

    const isSingleHtmlTag = typeof props.as === 'string' && singleHtmlTags.has(props.as)

    if (isSingleHtmlTag) {
      return () => h(props.as, ctx.attrs)
    }

    return () => h(props.as, ctx.attrs, { default: ctx.slots.default })
  },
})
