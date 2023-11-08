import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { CONTENT_NAME, popoverContentProps, scopePopoverProps, usePopoverInject, usePortalInject } from './props'
import { OkuPopoverContentModal } from './popoverContentModal'
import { OkuPopoverContentNonModal } from './popoverContentNonModal'

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
    const reactiveContentProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const portalInject = usePortalInject(CONTENT_NAME, scopeOkuPopover.value)
    const forceMount = computed(() => asForceMount.value || portalInject.forceMount?.value)
    const inject = usePopoverInject(CONTENT_NAME, scopeOkuPopover.value)
    const forwardedRef = useForwardRef()

    return () => h(OkuPresence, {
      present: forceMount.value || inject.open.value,
    }, {
      default: () => inject.modal.value
        ? h(OkuPopoverContentModal, {
          ...mergeProps(attrs, reactiveContentProps),
          ref: forwardedRef,
        }, slots)
        : h(OkuPopoverContentNonModal, {
          ...mergeProps(attrs, reactiveContentProps),
          ref: forwardedRef,
        }, slots),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverContent = popoverContent
