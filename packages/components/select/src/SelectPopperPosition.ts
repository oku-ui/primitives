import type { CSSProperties } from 'vue'
import { defineComponent, h, mergeProps, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperContent } from '@oku-ui/popper'
import {
  POPPER_POSITION_NAME,
  scopeSelectProps,
  selectPopperPositionProps,
  usePopperScope,
} from './props'
import type { SelectPopperPositionElement } from './props'

const SelectPopperPosition = defineComponent({
  name: POPPER_POSITION_NAME,
  inheritAttrs: false,
  props: {
    ...selectPopperPositionProps.props,
    ...scopeSelectProps,
  },
  setup(props, { slots, attrs }) {
    const {
      scopeOkuSelect,
      align,
      collisionPadding,
      ...selectPopperPositionProps
    } = toRefs(props)

    const popperScope = usePopperScope(scopeOkuSelect.value)

    const forwardedRef = useForwardRef()

    return () =>
      h(
        OkuPopperContent,
        {
          ...popperScope,
          ...mergeProps(attrs, selectPopperPositionProps),
          ref: forwardedRef,
          align: align.value,
          collisionPadding: collisionPadding.value,
          style: {
            ...(attrs.style as CSSProperties),
            // Ensure border-box for floating-ui calculations
            'box-sizing': 'border-box',
            // re-namespace exposed content custom properties
            ...{
              '--oku-select-content-transform-origin':
                'var(--oku-popper-transform-origin)',
              '--oku-select-content-available-width':
                'var(--oku-popper-available-width)',
              '--oku-select-content-available-height':
                'var(--oku-popper-available-height)',
              '--oku-select-trigger-width': 'var(--oku-popper-anchor-width)',
              '--oku-select-trigger-height': 'var(--oku-popper-anchor-height)',
            },
          },
        },
        slots,
      )
  },
})

export const OkuSelectPopperPosition
  = SelectPopperPosition as typeof SelectPopperPosition &
  (new () => {
    $props: SelectPopperPositionElement
  })
