import { defineComponent, h } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { composeEventHandlers } from '@oku-ui/utils'
import type { ScopeToolbar } from './utils'
import { scopeToolbarProps } from './utils'
import { useRovingFocusGroupScope } from './toolbar'

const LINK_NAME = 'OkuToolbarLink'

export type ToolbarLinkIntrinsicElement = ElementType<'a'>
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
  'keydown': [event: KeyboardEvent]
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
    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuToolbar)

    const forwardedRef = useForwardRef()

    return () => h(OkuRovingFocusGroupItem, {
      asChild: true,
      ...rovingFocusGroupScope,
      focusable: true,
    }, {
      default: () => h(Primitive.a, {
        ...attrs,
        ref: forwardedRef,
        onKeyDown: composeEventHandlers<ToolbarLinkEmits['keydown'][0]>((e) => {
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
  $props: ScopeToolbar<Partial<ToolbarLinkElement>>
})
