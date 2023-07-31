// same inspiration and resource https://github.com/chakra-ui/ark/blob/main/packages/vue/src/factory.tsx

import type {
  ComponentPropsOptions,
  ComponentPublicInstance,
  DefineComponent,
  FunctionalComponent,
  HTMLAttributes,
  IntrinsicElementAttributes,
} from 'vue'
import {
  cloneVNode,
  defineComponent,
  getCurrentInstance,
  h,
  mergeProps,
  onMounted,
} from 'vue'
import { isValidVNodeElement, renderSlotFragments } from './utils'

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
type ComponentProps<
  T extends keyof JSX.IntrinsicElements | ElementConstructor<any>,
> = T extends ElementConstructor<infer P>
  ? P
  : T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : {}

type RefElement<T extends abstract new (...args: any) => any> = Omit<
  InstanceType<T>,
  keyof ComponentPublicInstance | 'class' | 'style'
>

type InstanceTypeRef<C extends abstract new (...args: any) => any, T> = Omit<InstanceType<C>, '$el'> & {
  $el: T
}

type ComponentPublicInstanceRef<T> = Omit<ComponentPublicInstance, '$el'> & {
  $el: T
}

type MergeProps<T, U> = U & T

interface PrimitiveProps {
  asChild?: boolean
}

type PrimitivePropsWithRef<E extends keyof HTMLElementTagNameMap> =
  HTMLAttributes &
  ComponentPropsOptions & {
    asChild?: boolean
  }

type PropsWithoutRef<P> = P extends any
  ? 'ref' extends keyof P
    ? Pick<P, Exclude<keyof P, 'ref'>>
    : P
  : P

type ComponentPropsWithoutRef<
  T extends keyof HTMLElementTagNameMap | DefineComponent<any>,
> = PropsWithoutRef<ComponentPropsOptions<T>>

type Primitives = {
  [E in (typeof NODES)[number]]: DefineComponent<{
    asChild?: boolean
  }>;
}

type ElementType<T extends keyof IntrinsicElementAttributes> = Partial<
  IntrinsicElementAttributes[T]
>

const Primitive = NODES.reduce((primitive, node) => {
  const Node = defineComponent({
    name: `Primitive${node}`,
    inheritAttrs: false,
    props: {
      asChild: Boolean,
    },
    setup(props, { attrs, slots }) {
      const instance = getCurrentInstance()

      onMounted(() => {
        (window as any)[Symbol.for('oku-ui')] = true
      })
      const Tag: any = props.asChild ? 'slot' : node

      if (!props.asChild) {
        return () =>
          h(
            Tag,
            { ...attrs },
            {
              default: () => slots.default && slots.default(),
            },
          )
      }
      else {
        return () => {
          let children = slots.default?.()
          children = renderSlotFragments(children || [])

          if (Object.keys(attrs).length > 0) {
            const [firstChild, ...otherChildren] = children
            if (!isValidVNodeElement(firstChild) || otherChildren.length > 0) {
              const componentName = instance?.parent?.type.name
                ? `<${instance.parent.type.name} />`
                : 'component'
              throw new Error(
                [
                  `Detected an invalid children for \`${componentName}\` with \`asChild\` prop.`,
                  '',
                  'Note: All components accepting `asChild` expect only one direct child of valid VNode type.',
                  'You can apply a few solutions:',
                  [
                    'Provide a single child element so that we can forward the props onto that element.',
                    'Ensure the first child is an actual element instead of a raw text node or comment node.',
                  ]
                    .map(line => `  - ${line}`)
                    .join('\n'),
                ].join('\n'),
              )
            }

            const mergedProps = mergeProps(firstChild.props ?? {}, attrs)
            const cloned = cloneVNode(firstChild, mergedProps)
            // Explicitly override props starting with `on`.
            // It seems cloneVNode from Vue doesn't like overriding `onXXX` props. So
            // we have to do it manually.
            for (const prop in mergedProps) {
              if (prop.startsWith('on')) {
                cloned.props ||= {}
                cloned.props[prop] = mergedProps[prop]
              }
            }
            return cloned
          }
          else if (Array.isArray(children)) {
            if (children.length === 1) {
              return children[0]
            }
            else {
              const componentName = instance?.parent?.type.name
                ? `<${instance.parent.type.name} />`
                : 'component'
              throw new Error(
                [
                  `Detected an invalid children for \`${componentName}\` with \`asChild\` prop.`,
                  '',
                  'Note: All components accepting `asChild` expect only one direct child of valid VNode type.',
                  'You can apply a few solutions:',
                  [
                    'Provide a single child element so that we can forward the props onto that element.',
                    'Ensure the first child is an actual element instead of a raw text node or comment node.',
                  ]
                    .map(line => `  - ${line}`)
                    .join('\n'),
                ].join('\n'),
              )
            }
          }
          else {
            // No children.
            return null
          }
        }
      }
    },
  })

  return { ...primitive, [node]: Node }
}, {} as Primitives)

const OkuPrimitive = Primitive

export { OkuPrimitive, Primitive }
export type {
  ComponentProps,
  MergeProps,
  PrimitiveProps,
  RefElement,
  ElementType,
  PrimitivePropsWithRef,
  ComponentPropsWithoutRef,
  InstanceTypeRef,
  ComponentPublicInstanceRef,
}
