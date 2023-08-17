import { computed, defineComponent, h } from 'vue'

import {
  type ElementType,
  type PrimitiveProps,
  primitiveProps,
} from '@oku-ui/primitive'
import { type Scope } from '@oku-ui/provide'
import type { ArrowProps } from '@oku-ui/arrow'
import { OkuArrow } from '@oku-ui/arrow'
import { useForwardRef } from '@oku-ui/use-composable'
import { type ScopePopper, type Side, scopePopperProps } from './utils'
import { usePopperContentInject } from './popperContent'

const ARROW_NAME = 'OkuPopperArrow'

const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}

export type PopperArrowIntrinsicElement = ElementType<'svg'>
export type PopperArrowElement = SVGSVGElement

interface PopperArrowProps extends PrimitiveProps, ArrowProps {
  scopePopper?: Scope
}

const popperArrow = defineComponent({
  name: ARROW_NAME,
  props: {
    ...scopePopperProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...attrsElement } = attrs as PopperArrowIntrinsicElement
    const contentInject = usePopperContentInject(ARROW_NAME, props.scopeOkuPopper)
    const baseSide = computed(() => {
      return OPPOSITE_SIDE[contentInject.placedSide.value]
    })

    const forwardedRef = useForwardRef()

    const originalReturn = () =>
      h(
        'span',
        {
          ref: (el: any) => {
            contentInject.onAnchorChange(el)
            return undefined
          },
          style: {
            position: 'absolute',
            left: contentInject.arrowX?.value,
            top: contentInject.arrowY?.value,
            [baseSide.value]: '0px',
            transformOrigin: {
              top: '',
              right: '0px 0px',
              bottom: 'center 0px',
              left: '100% 0px',
            }[contentInject.placedSide.value],
            transform: {
              top: 'translateY(100%)',
              right: 'translateY(50%) rotate(90deg) translateX(-50%)',
              bottom: 'rotate(180deg)',
              left: 'translateY(50%) rotate(-90deg) translateX(50%)',
            }[contentInject.placedSide.value],
            visibility: contentInject.shouldHideArrow.value
              ? 'hidden'
              : undefined,
          },
        },
        [
          h(OkuArrow, {
            ...attrsElement as any,
            ref: forwardedRef,
            style: {
              ...(attrsElement.style as any),
              display: 'block',
            },
          }),
        ],
      )
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopperArrow = popperArrow as typeof popperArrow
& (new () => {
  $props: ScopePopper<Partial<PopperArrowIntrinsicElement>>
})

export type { PopperArrowProps }
