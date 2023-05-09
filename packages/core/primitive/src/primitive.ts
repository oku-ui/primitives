// TODO: IntrinsicElementAttributes vue 3.3 add
import type { ComponentPublicInstance, DefineComponent, FunctionalComponent, IntrinsicElementAttributes } from 'vue'
import { defineComponent, h, onMounted } from 'vue'

/* -------------------------------------------------------------------------------------------------
 * Primitive
 * ----------------------------------------------------------------------------------------------- */
const NODES = [
  'a',
  'button',
  'div',
  'form',
  'h2',
  'h3',
  'img',
  'input',
  'label',
  'li',
  'nav',
  'ol',
  'p',
  'span',
  'svg',
  'ul',
] as const

type ElementConstructor<P> =
  | (new () => { $props: P })
  | ((props: P, ...args: any) => FunctionalComponent<any, any>)

//  extends keyof JSX.IntrinsicElements | ElementConstructor<any>
type ComponentProps<T extends keyof JSX.IntrinsicElements | ElementConstructor<any>> =
  T extends ElementConstructor<infer P>
    ? P
    : T extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[T]
      : {}

type RefElement<T extends abstract new (...args: any) => any> = Omit<InstanceType<T>, keyof ComponentPublicInstance | 'class' | 'style'>

type MergeProps<T, U> = U & T

interface PrimitiveProps {
  asChild?: boolean
}

type Primitives = { [E in typeof NODES[number]]: DefineComponent<{
  asChild?: boolean
}> }

type ElementType<T extends keyof IntrinsicElementAttributes> = Partial<IntrinsicElementAttributes[T]>

const Primitive = NODES.reduce((primitive, node) => {
  const Node = defineComponent({
    name: `Primitive${node}`,
    inheritAttrs: false,
    props: {
      asChild: Boolean,
    },
    setup(props, { attrs, slots }) {
      onMounted(() => {
        (window as any)[Symbol.for('oku-ui')] = true
      })
      const Tag: any = props.asChild ? 'slot' : node

      return () => props.asChild ? slots.default?.() : h(Tag, { ...attrs }, slots.default?.())
    },
  })
  return { ...primitive, [node]: Node }
}, {} as Primitives)

const OkuPrimitive = Primitive

export {
  OkuPrimitive,
  Primitive,
}
export type { ComponentProps, MergeProps, PrimitiveProps, RefElement, ElementType }
