import type { Ref } from 'vue'
import { defineComponent, onMounted, onUnmounted, ref, toRefs } from 'vue'
import { DEFAULT_DELAY_DURATION, createTooltipProvide } from './utils'
import { scopeTooltipProps } from './types'

const PROVIDER_NAME = 'TooltipProvider'

type TooltipProviderProvideValue = {
  isOpenDelayed: Ref<boolean>
  delayDuration: Ref<number>
  onOpen(): void
  onClose(): void
  onPointerInTransitChange(inTransit: boolean): void
  isPointerInTransitRef: Ref<boolean>
  disableHoverableContent: Ref<boolean>
}

export const [tooltipProviderProvide, useTooltipProviderInject]
  = createTooltipProvide<TooltipProviderProvideValue>(PROVIDER_NAME)

export interface TooltipProviderProps {
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

export const tooltipProviderProps = {
  props: {
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
  },
}

const NAME = 'OkuTooltipProvider'

const tooltipProvider = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...tooltipProviderProps.props,
    ...scopeTooltipProps,
  },
  setup(props, { slots }) {
    const {
      delayDuration,
      disableHoverableContent,
      scopeOkuTooltip,
      skipDelayDuration,
    } = toRefs(props)

    const isOpenDelayed = ref(true)
    const isPointerInTransitRef = ref(false)
    const skipDelayTimerRef = ref(0)
    const skipDelayTimer = ref()

    onMounted(() => {
      skipDelayTimer.value = skipDelayTimerRef.value
    })

    onUnmounted(() => {
      window.clearTimeout(skipDelayTimer.value)
    })

    tooltipProviderProvide({
      scope: scopeOkuTooltip.value,
      isOpenDelayed,
      delayDuration,
      onOpen() {
        window.clearTimeout(skipDelayTimerRef.value)
        isOpenDelayed.value = false
      },
      onClose() {
        window.clearTimeout(skipDelayTimerRef.value)
        skipDelayTimerRef.value = window.setTimeout(
          () => isOpenDelayed.value = false,
          skipDelayDuration.value,
        )
      },
      isPointerInTransitRef,
      onPointerInTransitChange(inTransit: boolean) {
        isPointerInTransitRef.value = inTransit
      },
      disableHoverableContent,
    })

    return () => slots.default?.()
  },
})

export const OkuTooltipProvider = tooltipProvider
