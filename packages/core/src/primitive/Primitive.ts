import { type Component, computed, defineComponent, h, type PropType, useSSRContext, vShow, withDirectives } from 'vue'
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
      validator: (value: AsTag | Component) => {
        if (typeof value === 'string') {
          return true
        }
        return typeof value === 'object'
      },
    },
    vapor: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const ssrContext = useSSRContext()
    const isServer = !!ssrContext

    const isTemplateElement = computed(() => props.as === 'template')
    const isSingleElement = computed(() =>
      typeof props.as === 'string' && singleHtmlTags.has(props.as),
    )

    const renderElement = () => {
      try {
        if (isTemplateElement.value) {
          return h(Slot, ctx.attrs, { default: ctx.slots.default })
        }

        if (isSingleElement.value) {
          return h(props.as, ctx.attrs)
        }

        return h(props.as, ctx.attrs, { default: ctx.slots.default })
      }
      catch (error) {
        console.error(`Failed to render primitive element:`, error)
        // Fallback to div if rendering fails
        return h('div', ctx.attrs, { default: ctx.slots.default })
      }
    }

    const renderVaporElement = () => {
      const baseElement = props.as || 'div'
      const attrs = {
        ...ctx.attrs,
        _vapor: '',
        _ssr: isServer ? '' : undefined,
      }

      if (props.as === 'template') {
        return withDirectives(h(Slot, attrs, {
          default: ctx.slots.default,
        }), [[vShow, true]])
      }

      if (typeof props.as === 'string' && singleHtmlTags.has(props.as)) {
        return withDirectives(h(baseElement, attrs), [[vShow, true]])
      }

      return withDirectives(h(baseElement, attrs, {
        default: ctx.slots.default,
      }), [[vShow, true]])
    }

    return props.vapor ? renderVaporElement : renderElement
  },
})
