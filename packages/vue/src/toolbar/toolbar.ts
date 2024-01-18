import type { PropType, Ref } from 'vue'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { createScope } from '@oku-ui/provide'
import { OkuRovingFocusGroup, createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'
import { createToggleGroupScope } from '@oku-ui/toggle-group'
import { useDirection } from '@oku-ui/direction'
import { scopeToolbarProps } from './utils'

const TOOLBAR_NAME = 'OkuToolbar'

const [createToolbarProvider, createToolbarScope] = createScope(TOOLBAR_NAME, [
  createRovingFocusGroupScope,
  createToggleGroupScope,
])
// TODO exported
export const useRovingFocusGroupScope = createRovingFocusGroupScope()
export const useToggleGroupScope = createToggleGroupScope()

type ToolbarProvideValue = {
  orientation: Ref<RovingFocusGroupProps['orientation']>
  dir: Ref<RovingFocusGroupProps['dir']>
}

// TODO added export
export const [toolbarProvider, useToolbarInject]
  = createToolbarProvider<ToolbarProvideValue>(TOOLBAR_NAME)

export type ToolbarNaviteElement = OkuElement<'div'>
export type ToolbarElement = HTMLDivElement

export interface ToolbarProps extends PrimitiveProps {
  orientation?: RovingFocusGroupProps['orientation']
  loop?: RovingFocusGroupProps['loop']
  dir?: RovingFocusGroupProps['dir']
}

export const toolbarProps = {
  props: {
    orientation: {
      type: String as PropType<RovingFocusGroupProps['orientation'] | undefined>,
      default: 'horizontal',
    },
    loop: {
      type: Boolean as PropType<RovingFocusGroupProps['loop'] | undefined>,
      default: true,
    },
    dir: {
      type: String as PropType<RovingFocusGroupProps['dir'] | undefined>,
      default: undefined,
    },
    ...primitiveProps,
  },
}

const toolbar = defineComponent({
  name: TOOLBAR_NAME,
  inheritAttrs: false,
  props: {
    ...toolbarProps.props,
    ...scopeToolbarProps,
  },
  setup(props, { attrs, slots }) {
    const {
      orientation,
      dir,
      loop,
      scopeOkuToolbar,
      ...toolbarProps
    } = toRefs(props)
    const _reactive = reactive(toolbarProps)
    const reactiveToolbarProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuToolbar.value)
    const direction = useDirection(dir)

    const forwardedRef = useForwardRef()

    toolbarProvider({
      dir,
      orientation,
      scope: scopeOkuToolbar.value,
    })

    return () => h(OkuRovingFocusGroup, {
      asChild: true,
      ...rovingFocusGroupScope,
      orientation: orientation.value,
      dir: direction.value,
      loop: loop.value,
    }, {
      default: () => h(Primitive.div, {
        role: 'toolbar',
        ariaOrientation: orientation.value,
        dir: direction.value,
        ...mergeProps(attrs, reactiveToolbarProps),
        ref: forwardedRef,
      }, slots),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbar = toolbar as typeof toolbar &
  (new () => {
    $props: ToolbarNaviteElement
  })

export {
  createToolbarScope,
}
