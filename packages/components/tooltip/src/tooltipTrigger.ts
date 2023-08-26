import { defineComponent, h, ref, watchEffect } from 'vue'
import type { ElementType } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperAnchor } from '@oku-ui/popper'
import { composeEventHandlers } from '@oku-ui/utils'
import { usePopperScope } from './utils'
import type { ScopeTooltip } from './types'
import { scopeTooltipProps } from './types'
import { useTooltipProviderInject } from './tooltipProvider'
import { useTooltipInject } from './tooltip'

const TRIGGER_NAME = 'OkuTooltipTrigger'

export type TooltipTriggerIntrinsicElement = ElementType<'button'>
export type TooltipTriggerElement = HTMLButtonElement

export interface TooltipTriggerProps { }

export const tooltipTriggerProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerMove: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerLeave: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerDown: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focus: (event: FocusEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    blur: (event: FocusEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
  },
}

const tooltipTrigger = defineComponent({
  name: TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...scopeTooltipProps,
  },
  emits: tooltipTriggerProps.emits,
  setup(props, { attrs, slots, emit }) {
    const inject = useTooltipInject(TRIGGER_NAME, props.scopeOkuTooltip)
    const providerInject = useTooltipProviderInject(TRIGGER_NAME, props.scopeOkuTooltip)
    const popperScope = usePopperScope(props.scopeOkuTooltip)

    const buttonRef = ref<HTMLButtonElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(buttonRef, forwardedRef)

    const isPointerDownRef = ref(false)
    const hasPointerMoveOpenedRef = ref(false)
    const handlePointerUp = () => {
      isPointerDownRef.value = false
    }

    watchEffect((onCleanup) => {
      onCleanup(() => {
        document.removeEventListener('pointerup', handlePointerUp)
      })
    })

    return () => h(OkuPopperAnchor, {
      asChild: true,
      ...popperScope,
    }, {
      default: () => h(Primitive.button, {
        // We purposefully avoid adding `type=button` here because tooltip triggers are also
        // commonly anchors and the anchor `type` attribute signifies MIME type.
        'aria-describedby': inject.open.value ? inject.contentId.value : undefined,
        'data-state': inject.stateAttribute.value,
        ...attrs,
        'ref': composedRefs,
        'onPointermove': composeEventHandlers<PointerEvent>((el) => {
          emit('pointerMove', el)
        }, (event) => {
          if (event.pointerType === 'touch')
            return
          if (
            !hasPointerMoveOpenedRef.value
            && !providerInject.isPointerInTransitRef.value
          ) {
            inject.onTriggerEnter()
            hasPointerMoveOpenedRef.value = true
          }
        }),
        'onPointerLeave': composeEventHandlers<PointerEvent>((el) => {
          emit('pointerLeave', el)
        }, () => {
          inject.onTriggerLeave()
          hasPointerMoveOpenedRef.value = false
        }),
        'onPointerDown': composeEventHandlers<PointerEvent>((el) => {
          emit('pointerDown', el)
        }, () => {
          isPointerDownRef.value = true
          document.addEventListener('pointerup', handlePointerUp, { once: true })
        }),
        'onFocus': composeEventHandlers<FocusEvent>((el) => {
          emit('focus', el)
        }, () => {
          if (!isPointerDownRef.value)
            inject.onOpen()
        }),
        'onBlur': composeEventHandlers<FocusEvent>((el) => {
          emit('blur', el)
        }, inject.onClose),
        'onClick': composeEventHandlers<MouseEvent>((el) => {
          emit('click', el)
        }, inject.onClose),

      }, {
        default: () => slots.default?.(),
      }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltipTrigger = tooltipTrigger as typeof tooltipTrigger &
(new () => {
  $props: ScopeTooltip<Partial<TooltipTriggerElement>>
})
