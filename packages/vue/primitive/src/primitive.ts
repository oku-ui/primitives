import type { DefineComponent, FunctionalComponent, IntrinsicElementAttributes, Ref } from 'vue'
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

// <T extends keyof JSX.IntrinsicElements | ElementConstructor<any>>
type ComponentProps<T> =
  T extends ElementConstructor<infer P>
    ? P
    : T extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[T]
      : {}

 type ComponentType<T = {}> = DefineComponent<T> | FunctionalComponent<T>

 type ComponentPropsWithoutRef<T> = PropsWithoutRef<
  ComponentProps<T>
>

 type ElementType<P = any> = {
   [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never
 }[keyof JSX.IntrinsicElements] |
 ComponentType<P>

type PropsWithoutRef<P> = P extends any ? ('ref' extends keyof P ? Pick<P, Exclude<keyof P, 'ref' | 'ref_for' | 'ref_key'>> : P) : P

type PropsWithRef<P> =
  'ref' extends keyof P
    ? P extends { ref?: infer R | undefined }
      ? string extends R
        ? PropsWithoutRef<P> & { ref?: Exclude<R, string> | undefined }
        : any
      : any
    : any

type VueComponentPropsWithRef<T extends ElementType> =
     T extends new () => { $props: infer P }
       ? PropsWithoutRef<P> & { ref?: Ref<ComponentProps<T>> }
       : PropsWithRef<ComponentProps<T>>

type Primitives = { [E in typeof NODES[number]]: PrimitiveDefineComponent<E> }

type PrimitivePropsWithRef<E extends ElementType> = VueComponentPropsWithRef<E> & {
  asChild?: boolean
}

type ElementRef<T extends keyof JSX.IntrinsicElements | ElementConstructor<any>> =
   T extends PrimitiveDefineComponent<infer E>
     ? E extends keyof IntrinsicElementAttributes
       ? IntrinsicElementAttributes[E]
       : never
     : never

interface PrimitiveDefineComponent<E extends ElementType> {
  new (...args: any[]): {
    $props: PrimitivePropsWithRef<E>
  }
}

const Primitive = NODES.reduce((primitive, node) => {
  const Node = defineComponent<PrimitivePropsWithRef<typeof node>>({
    name: `Primitive${node}`,
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
      onMounted(() => {
        (window as any)[Symbol.for('okui-vue')] = true
      })
      const Tag: any = props.asChild ? 'slot' : node

      return () => h(Tag, attrs, slots.default && slots.default())
    },
  })
  return { ...primitive, [node]: Node }
}, {} as Primitives)

const OkuPrimitive = Primitive

export {
  OkuPrimitive,
  Primitive,
}
export type { ComponentPropsWithoutRef, ElementRef }
