import { computePosition } from '@floating-ui/dom'
import {
  type CSSProperties,
  type MaybeRefOrGetter,
  computed,
  onWatcherCleanup,
  shallowRef,
  toValue,
  watch,
  watchEffect,
} from 'vue'

import { useRef } from '../hooks/useRef.ts'
import type {
  ComputePositionConfig,
  MiddlewareData,
  ReferenceType,
  UseFloatingCofnig,
  UseFloatingOptions,
  UseFloatingReturn,
} from './types.ts'
import { roundByDPR } from './utils/roundByDPR.ts'
import { getDPR } from './utils/getDPR.ts'

/**
 * Computes the `x` and `y` coordinates that will place the floating element next to a reference element when it is given a certain CSS positioning strategy.
 * @param options The floating options.
 * @param config The floating configuration.
 * @see https://floating-ui.com/docs/vue
 */
export function useFloating<RT extends ReferenceType = ReferenceType>(
  options: UseFloatingOptions<RT> = {},
  config: MaybeRefOrGetter<UseFloatingCofnig> = {},
): UseFloatingReturn<RT> {
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
    open,
    elements: {
      reference: externalReference,
      floating: externalFloating,
    } = {},
  } = options

  const x = shallowRef(0)
  const y = shallowRef(0)
  const strategy = shallowRef(configValue!.strategy ?? 'absolute')
  const placement = shallowRef(configValue!.placement ?? 'bottom')
  const middlewareData = shallowRef<MiddlewareData>({})
  const isPositioned = shallowRef(false)

  const referenceRef = useRef<ReferenceType>()
  const floatingRef = useRef<HTMLElement>()

  const _reference = shallowRef<RT>()
  const _floating = shallowRef<HTMLElement>()

  function setReference(node: RT | undefined) {
    if (node !== referenceRef.current) {
      referenceRef.current = node
      _reference.value = node
    }
  }

  function setFloating(node: HTMLElement | undefined) {
    if (node !== floatingRef.current) {
      floatingRef.current = node
      _floating.value = node
    }
  }

  const referenceEl = computed(() => externalReference?.value || _reference.value)
  const floatingEl = computed(() => externalFloating?.value || _floating.value)

  function update() {
    if (!referenceRef.current || !floatingRef.current)
      return

    const config: ComputePositionConfig = {
      placement: configValue.placement,
      strategy: configValue.strategy,
      middleware: configValue.middleware,
    }

    if (configValue.platform)
      config.platform = configValue.platform

    computePosition(referenceRef.current, floatingRef.current, config).then(
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

  watch(() => toValue(open), (openVal) => {
    if (openVal === false && isPositioned.value)
      isPositioned.value = false
  })

  watch([referenceEl, floatingEl], ([referenceEl, floatingEl]) => {
    if (referenceEl)
      referenceRef.current = referenceEl

    if (floatingEl)
      floatingRef.current = floatingEl

    if (!referenceEl || !floatingEl)
      return

    if (!whileElementsMounted) {
      update()
      return
    }

    onWatcherCleanup(whileElementsMounted(referenceEl, floatingEl, update))
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
    refs: {
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating,
    },
    elements: {
      reference: referenceEl,
      floating: floatingEl,
    },
    update,
  }
}
