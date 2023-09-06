import { computed, defineComponent, h, toRefs } from 'vue'

import type { ArrowElement, ArrowNaviteElement, ArrowProps } from '@oku-ui/arrow'
import { OkuArrow, arrowProps } from '@oku-ui/arrow'

import { useForwardRef } from '@oku-ui/use-composable'
import { type Side, scopePopperProps } from './utils'
import { usePopperContentInject } from './popperContent'

const ARROW_NAME = 'OkuPopperArrow'

const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}

export type PopperArrowNaviteElement = ArrowNaviteElement
export type PopperArrowElement = ArrowElement

export interface PopperArrowProps extends ArrowProps {
}

export const popperArrowProps = {
  props: {
    ...arrowProps.props,
  },
  emits: {},
}

const popperArrow = defineComponent({
  name: ARROW_NAME,
  props: {
    ...popperArrowProps.props,
    ...scopePopperProps,
  },
  setup(props, { attrs }) {
    const { height, width, asChild, scopeOkuPopper } = toRefs(props)
    const contentInject = usePopperContentInject(ARROW_NAME, scopeOkuPopper.value)
    const baseSide = computed(() => {
      return contentInject?.placedSide.value ? OPPOSITE_SIDE[contentInject.placedSide.value] : ''
    })

    const forwardedRef = useForwardRef()

    const originalReturn = () =>
      h(
        'span',
        {
          ref: (el: any) => {
            contentInject.onArrowChange(el)
            return undefined
          },
          style: {
            position: 'absolute',
            left: `${contentInject.arrowX?.value}px`,
            top: `${contentInject.arrowY?.value}px`,
            [baseSide.value]: '0px',
            transformOrigin: {
              top: '',
              right: '0px 0px',
              bottom: 'center 0px',
              left: '100% 0px',
            }[contentInject.placedSide.value!],
            transform: {
              top: 'translateY(100%)',
              right: 'translateY(50%) rotate(90deg) translateX(-50%)',
              bottom: 'rotate(180deg)',
              left: 'translateY(50%) rotate(-90deg) translateX(50%)',
            }[contentInject.placedSide.value!],
            visibility: contentInject.shouldHideArrow.value
              ? 'hidden'
              : undefined,
          },
        },
        [
          h(OkuArrow, {
            ...attrs as any,
            asChild: asChild.value,
            ref: forwardedRef,
            width: width.value,
            height: height.value,
            style: {
              ...attrs.style as any,
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
  $props: PopperArrowNaviteElement
})
