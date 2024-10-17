import { OkuPresence } from '@oku-ui/presence'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { OkuPopoverContentModal } from './popoverContentModal'
import { OkuPopoverContentNonModal } from './popoverContentNonModal'
import { CONTENT_NAME, popoverContentProps, scopePopoverProps, usePopoverInject, usePortalInject } from './props'

const popoverContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...popoverContentProps.props,
    ...scopePopoverProps,
  },
  emits: popoverContentProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuPopover, forceMount: asForceMount, ...contentProps } = toRefs(props)

    const _reactive = reactive(contentProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const portalInject = usePortalInject(CONTENT_NAME, scopeOkuPopover.value)
    const forceMount = computed(() => asForceMount.value || portalInject.forceMount?.value)
    const inject = usePopoverInject(CONTENT_NAME, scopeOkuPopover.value)

    return () => h(OkuPresence, {
      present: forceMount.value || inject.open.value,
    }, () => [inject.modal.value
      ? h(OkuPopoverContentModal, {
        ...mergeProps(attrs, otherProps),
        ref: forwardedRef,
      }, () => slots.default?.())
      : h(OkuPopoverContentNonModal, {
        ...mergeProps(attrs, otherProps),
        ref: forwardedRef,
      }, () => slots.default?.()),
    ])
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverContent = popoverContent
