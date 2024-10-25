import type { PrimitiveProps } from '../primitive/index.ts'
import { isClient } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, onWatcherCleanup, type Ref, shallowRef, watchEffect } from 'vue'
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { useSize } from '../hooks/index.ts'
import { type IAttrsData, mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useCollection, useSliderContext, useSliderOrientationContext } from './SliderRoot.ts'
import { convertValueToPercentage, getLabel, getThumbInBoundsOffset } from './utils.ts'

export interface SliderThumbProps {
  as?: PrimitiveProps['as']
  name?: string
}

export const DEFAULT_SLIDER_THUMB_PROPS = {
  as: 'span',
} satisfies PrimitiveDefaultProps<SliderThumbProps>

// export interface SliderThumbContext {
//   bubbleInput: {
//     name: () => string | undefined
//     value: Ref<number | undefined>
//   }
// }

// export const [provideSliderThumbContext, useSliderThumbContext] = createContext<SliderThumbContext>('Checkbox')

export interface UseSliderThumbProps {
  el?: Ref<HTMLElement>
  name?: () => string | undefined
}

export function useSliderThumb(props: UseSliderThumbProps = {}): RadixPrimitiveReturns<{
  bubbleInput: {
    name: () => string | undefined
    value: Ref<number | undefined>
    index: Ref<number>
  }
  isFormControl: Ref<boolean>
  wrapperAttrs: () => IAttrsData
  attrs: RadixPrimitiveGetAttrs
}> {
  const el = props.el || shallowRef<HTMLElement>()
  const setElRef = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  const getItems = useCollection()

  const index = computed(() => el.value ? getItems().findIndex(item => item === el.value) : -1)

  const context = useSliderContext('SliderThumbImpl')
  const orientation = useSliderOrientationContext('SliderThumbImpl')

  // We set this to true by default so that events bubble to forms without JS (SSR)
  const isFormControl = computed(() => el.value ? Boolean(el.value.closest('form')) : true)
  const size = useSize(el)

  // We cast because index could be `-1` which would return undefined
  const value = computed(() => context.values.value[index.value])

  const percent = computed(() => value.value === undefined ? 0 : convertValueToPercentage(value.value, context.min(), context.max()))
  const label = computed(() => getLabel(index.value, context.values.value.length))

  const thumbInBoundsOffset = computed(() => {
    const orientationSize = size.value?.[orientation.value.size]
    return orientationSize ? getThumbInBoundsOffset(orientationSize, percent.value, orientation.value.direction) : 0
  })

  onMounted(() => {
    context.thumbs.add(el.value!)
  })

  onBeforeUnmount(() => {
    context.thumbs.delete(el.value!)
  })

  function onFocus(event: FocusEvent) {
    if (event.defaultPrevented) {
      return
    }
    context.valueIndexToChangeRef.value = index.value
  }

  return {
    bubbleInput: {
      name() {
        const propsName = props.name?.()
        if (propsName != null)
          return propsName

        const contextName = context.name()

        return (contextName ? contextName + (context.values.value.length > 1 ? '[]' : '') : undefined)
      },
      value,
      index,
    },
    isFormControl,
    wrapperAttrs(): IAttrsData {
      const attrs = {
        style: {
          transform: 'var(--radix-slider-thumb-transform)',
          position: 'absolute',
          [orientation.value.startEdge]: `calc(${percent.value}% + ${thumbInBoundsOffset.value}px)`,
        },
      }

      return attrs
    },
    attrs(extraAttrs) {
      const _orientation = context.orientation
      const _disabled = context.disabled()
      const attrs = {
        'elRef': setElRef,
        'role': 'slider',
        'aria-label': label.value,
        'aria-valuemin': context.min(),
        'aria-valuenow': value.value,
        'aria-valuemax': context.max(),
        'aria-orientation': _orientation,
        'data-orientation': _orientation,
        'data-disabled': _disabled ? '' : undefined,
        'tabindex': _disabled ? undefined : 0,
        [DATA_COLLECTION_ITEM]: true,

        'style': {
          /**
           * There will be no value on initial render while we work out the index so we hide thumbs
           * without a value, otherwise SSR will render them in the wrong position before they
           * snap into the correct position during hydration which would be visually jarring for
           * slower connections.
           */
          ...value.value === undefined ? { display: 'none' } : undefined,
        },
        onFocus,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
