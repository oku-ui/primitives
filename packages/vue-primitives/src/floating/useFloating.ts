import { computePosition } from '@floating-ui/dom'

import {
  type CSSProperties,
  type MaybeRefOrGetter,
  computed,
  onWatcherCleanup,
  shallowRef,
  toValue,
  watchEffect,
} from 'vue'
import type {
  ComputePositionConfig,
  MiddlewareData,
  ReferenceType,
  UseFloatingCofnig,
  UseFloatingOptions,
  UseFloatingReturn,
} from './types.ts'
import { getDPR } from './utils/getDPR.ts'
import { roundByDPR } from './utils/roundByDPR.ts'

/**
 * Computes the `x` and `y` coordinates that will place the floating element next to a reference element when it is given a certain CSS positioning strategy.
 * @param options The floating options.
 * @param config The floating configuration.
 * @see https://floating-ui.com/docs/vue
 */
export function useFloating<RT extends ReferenceType = ReferenceType>(
  options: UseFloatingOptions<RT>,
  config: MaybeRefOrGetter<UseFloatingCofnig> = {},
): UseFloatingReturn {
  let configValue: UseFloatingCofnig

  watchEffect(() => {
    const shouldUpdate = configValue !== undefined
    configValue = toValue(config)

    if (shouldUpdate) {
      update()
    }
  })

  const {
    transform = true,
    whileElementsMounted,
    elements: {
      referenceEl,
      floatingEl,
    },
  } = options

  const x = shallowRef(0)
  const y = shallowRef(0)
  const strategy = shallowRef(configValue!.strategy ?? 'absolute')
  const placement = shallowRef(configValue!.placement ?? 'bottom')
  const middlewareData = shallowRef<MiddlewareData>({})
  const isPositioned = shallowRef(false)

  let referenceRef: ReferenceType | undefined
  let floatingRef: HTMLElement | undefined

  function update() {
    if (!referenceRef || !floatingRef)
      return

    const config: ComputePositionConfig = {
      placement: configValue.placement,
      strategy: configValue.strategy,
      middleware: configValue.middleware,
    }

    if (configValue.platform)
      config.platform = configValue.platform

    computePosition(referenceRef, floatingRef, config).then(
      (data) => {
        x.value = data.x
        y.value = data.y
        strategy.value = data.strategy
        placement.value = data.placement
        middlewareData.value = data.middlewareData
        isPositioned.value = true
      },
    )
  }

  watchEffect(() => {
    if (referenceEl.value)
      referenceRef = referenceEl.value

    if (floatingEl.value)
      floatingRef = floatingEl.value

    if (!referenceEl.value || !floatingEl.value)
      return

    if (!whileElementsMounted) {
      update()
      return
    }

    onWatcherCleanup(whileElementsMounted(referenceEl.value, floatingEl.value, update))
  })

  const floatingStyles = computed<CSSProperties>(() => {
    const initialStyles = {
      position: strategy.value,
      left: 0,
      top: 0,
    }

    const floating = floatingEl.value
    if (!floating)
      return initialStyles

    const xVal = roundByDPR(floating, x.value)
    const yVal = roundByDPR(floating, y.value)

    if (transform) {
      return {
        ...initialStyles,
        transform: `translate(${xVal}px, ${yVal}px)`,
        ...(getDPR(floating) >= 1.5 && { willChange: 'transform' }),
      }
    }

    return {
      position: strategy.value,
      left: `${xVal}px`,
      top: `${yVal}px`,
    }
  })

  return {
    x,
    y,
    strategy,
    placement,
    middlewareData,
    isPositioned,
    floatingStyles,
    update,
  }
}
