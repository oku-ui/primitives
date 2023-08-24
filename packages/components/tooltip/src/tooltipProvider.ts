import type { Ref } from 'vue'
import { defineComponent, ref, toRefs, watchEffect } from 'vue'
import { DEFAULT_DELAY_DURATION, createTooltipProvide } from './utils'
import { scopeTooltipProps } from './types'

const PROVIDER_NAME = 'TooltipProvider'

type TooltipProviderContextValue = {
  isOpenDelayed: Ref<boolean>
  delayDuration: Ref<number>
  onOpen(): void
  onClose(): void
  onPointerInTransitChange(inTransit: boolean): void
  isPointerInTransitRef: Ref<boolean>
  disableHoverableContent: Ref<boolean>
}

export const [tooltipProviderProvide, useTooltipProviderInject]
  = createTooltipProvide<TooltipProviderContextValue>(PROVIDER_NAME)

interface TooltipProviderProps {
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   * @defaultValue 700
   */
  delayDuration?: number
  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   * @defaultValue 300
   */
  skipDelayDuration?: number
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean
}

const tooltipProviderProps = {
  delayDuration: {
    type: Number,
    default: DEFAULT_DELAY_DURATION,
  },
  skipDelayDuration: {
    type: Number,
    default: 300,
  },
  disableHoverableContent: {
    type: Boolean,
    default: false,
  },
}

const NAME = 'OkuTooltipProvider'

const tooltipProvider = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...tooltipProviderProps,
    ...scopeTooltipProps,
  },
  setup(props, { slots }) {
    const {
      delayDuration,
      disableHoverableContent,
      scopeOkuTooltip,
      skipDelayDuration,
    } = toRefs(props)

    const isOpenDelayed = ref(false)
    const isPointerInTransitRef = ref(false)
    const skipDelayTimerRef = ref(0)

    watchEffect((onClean) => {
      const skipDelayTimer = skipDelayTimerRef.value
      onClean(() => {
        window.clearTimeout(skipDelayTimer)
      })
    })

    tooltipProviderProvide({
      scope: scopeOkuTooltip.value,
      delayDuration,
      disableHoverableContent,
      isOpenDelayed,
      isPointerInTransitRef,
      onOpen() {
        window.clearTimeout(skipDelayTimerRef.value)
        isOpenDelayed.value = true
      },
      onClose() {
        window.clearTimeout(skipDelayTimerRef.value)
        skipDelayTimerRef.value = window.setTimeout(() =>
          isOpenDelayed.value = false, skipDelayDuration.value)
      },
      onPointerInTransitChange(inTransit) {
        isPointerInTransitRef.value = inTransit
      },
    })

    return () => slots
  },
})

export const OkuTooltipProvider = tooltipProvider
