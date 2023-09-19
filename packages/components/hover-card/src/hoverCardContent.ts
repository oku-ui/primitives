import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuHoverCardContentImpl } from './hoverCardContentImpl'
import { excludeTouch, scopeHoverCardProps } from './utils'

import { CONTENT_NAME, hoverCardContentProps, useHoverCardInject, usePortalInject } from './props'
import type { HoverCardContentEmits, HoverCardContentNaviteElement } from './props'

const hoverCardContent = defineComponent({
  name: CONTENT_NAME,
  components: {
    OkuHoverCardContentImpl,
    OkuPresence,
  },
  inheritAttrs: false,
  props: {
    ...hoverCardContentProps.props,
    ...scopeHoverCardProps,
  },
  emits: hoverCardContentProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { forceMount: forceMountProps, ...contentProps } = toRefs(props)
    const _reactive = reactive(contentProps)
    const reactiveTriggerProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const portalInject = usePortalInject(CONTENT_NAME, props.scopeOkuHoverCard)
    const forceMount = computed(() => forceMountProps.value || portalInject.forceMount?.value)

    const forwardedRef = useForwardRef()

    const inject = useHoverCardInject(CONTENT_NAME, props.scopeOkuHoverCard)

    return () => h(OkuPresence, {
      present: computed(() => forceMount.value || inject.open.value).value,
    }, {
      default: () => h(OkuHoverCardContentImpl, {
        'data-state': inject.open.value ? 'open' : 'closed',
        ...mergeProps(attrs, reactiveTriggerProps),
        'onPointerenter': composeEventHandlers<HoverCardContentEmits['pointerenter'][0]>((el) => {
          emit('pointerenter', el)
        }, excludeTouch(inject.onOpen)),
        'onPointerleave': composeEventHandlers<HoverCardContentEmits['pointerleave'][0]>((el) => {
          emit('pointerleave', el)
        }, excludeTouch(inject.onClose)),
        'ref': forwardedRef,
      }, slots),
    })
  },
})

export const OkuHoverCardContent = hoverCardContent as typeof hoverCardContent &
(new () => {
  $props: HoverCardContentNaviteElement
})
