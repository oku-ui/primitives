import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { OkuPopperAnchor } from '@oku-ui/popper'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
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
    ...scopedMenuProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuMenu, ...otherPropsRef } = toRefs(props)

    const _other = reactive(otherPropsRef)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    // const emits = useLis

    const popperScope = usePopperScope(scopeOkuMenu.value)

    return () => h(OkuPopperAnchor, {
      ...mergeProps(attrs, otherProps),
      ...popperScope,
      ref: forwardedRef,
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuAnchor = menuAnchor as typeof menuAnchor &
(new () => { $props: MenuAnchorNativeElement })
