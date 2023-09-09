import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { scopePopoverProps } from './utils'
import { usePortalInject } from './popoverPortal'
import { usePopoverInject } from './popover'
import type { PopoverContentTypeProps } from './popoverContentModal'
import { OkuPopoverContentModal, popoverContentTypeProps } from './popoverContentModal'
import { OkuPopoverContentNonModal } from './popoverContentNonModal'

export const CONTENT_NAME = 'OkuPopoverContent'

// TODO: PopoverContentTypeProps

export interface PopoverContentProps extends PopoverContentTypeProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const popoverContentProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    ...popoverContentTypeProps.props,
  },
  emits: {
    ...popoverContentTypeProps.emits,
  },
}

const popoverContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...popoverContentProps.props,
    ...primitiveProps,
    ...scopePopoverProps,
  },
  emits: popoverContentProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuPopover, forceMount: asForceMount, ...contentProps } = toRefs(props)
    const reactiveContentProps = reactive(contentProps)

    const portalInject = usePortalInject(CONTENT_NAME, scopeOkuPopover.value)
    const forceMount = computed(() => asForceMount.value || portalInject.forceMount?.value)
    const inject = usePopoverInject(CONTENT_NAME, scopeOkuPopover.value)
    const forwardedRef = useForwardRef()

    return () => h(OkuPresence, {
      present: computed(() => forceMount.value || inject.open.value).value,
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
