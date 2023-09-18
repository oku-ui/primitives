import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { type PropType, computed, defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { useDirection } from '@oku-ui/direction'
import { composeEventHandlers } from '../../../core/utils/dist'
import { ACCORDION_KEYS, AccordionImplProvider, CollectionSlot, scopeAccordionProps, useCollection } from './utils'

const ACCORDION_IMPL_NAME = 'OkuAccordionImpl'

type AccordionImplNativeElement = OkuElement<'div'>

export interface AccordionImplProps extends PrimitiveProps {
  /**
   * Whether or not an accordion is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * The layout in which the Accordion operates.
   * @default vertical
   */
  orientation?: RovingFocusGroupProps['orientation']
  /**
   * The language read direction.
   */
  dir?: RovingFocusGroupProps['dir']

}
export interface AccordionImplEmits {
  valueChange: [value: string | string[]]
  keydown: [event: KeyboardEvent]
}
export const accordionImplProps = {
  props: {

    disabled: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    orientation: {
      type: String as PropType<RovingFocusGroupProps['orientation']>,
      default: 'vertical',
    },
    dir: {
      type: String as PropType<RovingFocusGroupProps['dir']>,
      default: undefined,
    },
  },
  emits: {
    /**
   * The callback that fires when the state of the accordion changes.
   */
    // eslint-disable-next-line unused-imports/no-unused-vars
    valueChange: (value: string | string[]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: KeyboardEvent) => true,
  },
}
const accordionImpl = defineComponent({
  name: ACCORDION_IMPL_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...accordionImplProps.props,
    ...scopeAccordionProps,
  },
  emits: accordionImplProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      scopeOkuAccordion, disabled, dir, orientation, ...accordionProps
    } = toRefs(props)
    const accordionRef = ref<HTMLDivElement | null>(null)

    const forwardRef = useForwardRef()
    const composedRefs = useComposedRefs(accordionRef, forwardRef)

    const getItems = useCollection(scopeOkuAccordion.value)
    const direction = useDirection(dir.value)
    const isDirectionLTR = direction.value === 'ltr'

    const handleKeyDown = composeEventHandlers<KeyboardEvent>((event) => {
      if (!ACCORDION_KEYS.includes(event.key)) {
        emit('keydown', event)
        return
      }
      const target = event.target as HTMLElement
      const triggerCollection = getItems().filter(item => !item.ref.value?.disabled)
      const triggerIndex = triggerCollection.findIndex(item => item.ref.value === target)
      const triggerCount = triggerCollection.length

      if (triggerIndex === -1) {
        emit('keydown', event)
        return
      }

      // Prevents page scroll while user is navigating
      event.preventDefault()

      let nextIndex = triggerIndex
      const homeIndex = 0
      const endIndex = triggerCount - 1

      const moveNext = () => {
        nextIndex = triggerIndex + 1
        if (nextIndex > endIndex)
          nextIndex = homeIndex
      }

      const movePrev = () => {
        nextIndex = triggerIndex - 1
        if (nextIndex < homeIndex)
          nextIndex = endIndex
      }

      switch (event.key) {
        case 'Home':
          nextIndex = homeIndex
          break
        case 'End':
          nextIndex = endIndex
          break
        case 'ArrowRight':
          if (orientation.value === 'horizontal') {
            if (isDirectionLTR)
              moveNext()

            else
              movePrev()
          }
          break
        case 'ArrowDown':
          if (orientation.value === 'vertical')
            moveNext()

          break
        case 'ArrowLeft':
          if (orientation.value === 'horizontal') {
            if (isDirectionLTR)
              movePrev()

            else
              moveNext()
          }
          break
        case 'ArrowUp':
          if (orientation.value === 'vertical')
            movePrev()

          break
      }

      const clampedIndex = nextIndex % triggerCount
      triggerCollection[clampedIndex].ref.value?.focus()

      emit('keydown', event)
    })

    const _accordionProps = reactive(accordionProps)

    AccordionImplProvider({
      scope: scopeOkuAccordion.value,
      disabled: computed(() => disabled.value),
      direction: computed(() => dir.value),
      orientation: computed(() => orientation.value),
    })

    return () => h(CollectionSlot, {
      scope: scopeOkuAccordion.value,
    }, {
      default: () => h(Primitive.div, {
        ...mergeProps(attrs, _accordionProps),
        'data-orientation': orientation.value,
        'ref': composedRefs,
        'onKeydown': disabled.value ? undefined : handleKeyDown,
      }, { default: () => slots.default?.() }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordionImpl = accordionImpl as typeof accordionImpl
&
(new () => {
  $props: AccordionImplNativeElement
})
