import { defineComponent, h, mergeProps, onBeforeMount, onMounted, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { hideOthers } from 'aria-hidden'
import type { MenuRootContentTypeElement, MenuRootContentTypeEmits, MenuRootContentTypeNativeElement } from './props'
import { MENU_CONTENT_NAME, MENU_ROOT_CONTENT_MODAL_NAME, menuRootContentTypeProps, scopedMenuProps, useMenuInject } from './props'
import { OkuMenuContentImpl } from './menu-content-impl'

const menuRootContentModel = defineComponent({
  name: MENU_ROOT_CONTENT_MODAL_NAME,
  components: {
    OkuMenuContentImpl,
  },
  inheritAttrs: false,
  props: {
    ...menuRootContentTypeProps.props,
    ...scopedMenuProps,
  },
  emits: menuRootContentTypeProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      ...restProps
    } = toRefs(props)

    const _other = reactive(restProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    // const emits = useListeners()

    const inject = useMenuInject(MENU_CONTENT_NAME, scopeOkuMenu.value)
    const menuRootContentRef = ref<MenuRootContentTypeElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, menuRootContentRef)
    const content = ref<MenuRootContentTypeElement | null>(null)

    // Hide everything from ARIA except the `MenuContent`
    onMounted(() => {
      content.value = menuRootContentRef.value
    })

    onBeforeMount(() => {
      if (content.value)
        return hideOthers(content.value)
    })

    return () => h(OkuMenuContentImpl, {
      ...mergeProps(attrs, otherProps),
      ref: composedRefs,
      // we make sure we're not trapping once it's been closed
      // (closed !== unmounted when animating out)
      trapFocus: inject.open.value,
      // make sure to only disable pointer events when open
      // this avoids blocking interactions while animating out
      disableOutsidePointerEvents: inject.open.value,
      disableOutsideScroll: true,
      // When focus is trapped, a `focusout` event may still happen.
      // We make sure we don't trigger our `onDismiss` in such case.
      onFocusOutside: composeEventHandlers<MenuRootContentTypeEmits['focusOutside'][0]>((event) => {
        emit('focusOutside', event)
      }, event => event.preventDefault(), { checkForDefaultPrevented: false }),
      onDismiss: () => inject.onOpenChange(false),
    }, () => slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuRootContentModal = menuRootContentModel as typeof menuRootContentModel & (new () => { $props: MenuRootContentTypeNativeElement })
