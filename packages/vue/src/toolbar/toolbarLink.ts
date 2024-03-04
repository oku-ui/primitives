import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { composeEventHandlers } from '@oku-ui/utils'
import { scopeToolbarProps } from './utils'
import { useRovingFocusGroupScope } from './toolbar'

const LINK_NAME = 'OkuToolbarLink'

export type ToolbarLinkNaviteElement = OkuElement<'a'>
export type ToolbarLinkElement = HTMLAnchorElement

export interface ToolbarLinkProps extends PrimitiveProps {
}

export const toolbarLinkProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (e: KeyboardEvent) => true,
  },
}

export type ToolbarLinkEmits = {
  keydown: [event: KeyboardEvent]
}

const toolbarLink = defineComponent({
  name: LINK_NAME,
  inheritAttrs: false,
  props: {
    ...toolbarLinkProps.props,
    ...scopeToolbarProps,
  },
  emits: toolbarLinkProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { scopeOkuToolbar, ...linkProps } = toRefs(props)
    const _reactive = reactive(linkProps)
    const reactiveLinkProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuToolbar.value)

    const forwardedRef = useForwardRef()

    return () => h(OkuRovingFocusGroupItem, {
      asChild: true,
      ...rovingFocusGroupScope,
      focusable: true,
    }, {
      default: () => h(Primitive.a, {
        ...mergeProps(attrs, reactiveLinkProps),
        ref: forwardedRef,
        onKeydown: composeEventHandlers<ToolbarLinkEmits['keydown'][0]>((e) => {
          emit('keydown', e)
        }, (event) => {
          if (event.key === ' ')
            (event.currentTarget as HTMLElement)?.click()
        }),
      }, {
        default: () => slots.default?.(),
      }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarLink = toolbarLink as typeof toolbarLink &
  (new () => {
    $props: ToolbarLinkNaviteElement
  })
