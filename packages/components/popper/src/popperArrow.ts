import { computed, defineComponent, h } from 'vue'

import type {
  ElementType,
  IPrimitiveProps,
  InstanceTypeRef,
  MergeProps,
} from '@oku-ui/primitive'
import { type Scope, ScopePropObject } from '@oku-ui/provide'
import type { ArrowProps, _ArrowEl } from '@oku-ui/arrow'
import { OkuArrow } from '@oku-ui/arrow'
import { useForwardRef } from '@oku-ui/use-composable'
import type { Side } from './utils'
import { usePopperContentInject } from './popperContent'

const ARROW_NAME = 'PopperArrow'

const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}

type PopperArrowElement = ElementType<'svg'>
interface PopperArrowProps extends IPrimitiveProps, ArrowProps {
  scopePopper?: Scope
}

const PopperArrow = defineComponent({
  name: ARROW_NAME,
  props: {
    scopePopper: {
      ...ScopePropObject,
    },
  },
  setup(props, { attrs }) {
    const { ...attrsElement } = attrs as PopperArrowElement
    const contentInject = usePopperContentInject(ARROW_NAME, props.scopePopper)
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
            ...attrsElement,
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

type _PopperArrow = MergeProps<PopperArrowProps, PopperArrowElement>
type InstancePopperArrowType = InstanceTypeRef<typeof PopperArrow, _ArrowEl>

const OkuPopperArrow = PopperArrow as typeof PopperArrow &
(new () => { $props: _PopperArrow })

export { OkuPopperArrow }

export type { PopperArrowProps, InstancePopperArrowType }
