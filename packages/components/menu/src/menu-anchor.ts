import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { OkuPopperAnchor } from '@oku-ui/popper'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import { MENU_ANCHOR_NAME, menuAnchorProps, scopedMenuProps, usePopperScope } from './props'
import type { MenuAnchorNativeElement } from './props'

const menuAnchor = defineComponent({
  name: MENU_ANCHOR_NAME,
  components: {
    OkuPopperAnchor,
  },
  inheritAttrs: false,
  props: {
    ...menuAnchorProps.props,
    // ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuAnchorProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuMenu } = toRefs(props)

    const _reactive = reactive(menuAnchorProps)
    const reactiveMenuAnchorProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const popperScope = usePopperScope(scopeOkuMenu.value)

    return () => h(OkuPopperAnchor,
      {
        ...mergeProps(attrs, reactiveMenuAnchorProps),
        ...popperScope,
        ref: forwardedRef,
      },
      {
        default: () => slots.default?.(),
      },
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuAnchor = menuAnchor as typeof menuAnchor &
(new () => { $props: MenuAnchorNativeElement })
