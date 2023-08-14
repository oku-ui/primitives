import type { PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'

import type {
  ElementType,
  IPrimitiveProps,
  InstanceTypeRef,
  MergeProps,
} from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
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
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs }) {
    const { ...attrsElement } = attrs as PopperArrowElement
    const contentInject = usePopperContentInject(ARROW_NAME, props.scopePopper)
    const baseSide = computed(() => {
      return OPPOSITE_SIDE[contentInject.value.placedSide.value]
    })

    const forwardedRef = useForwardRef()

    const originalReturn = () =>
      h(
        'span',
        {
          ref: (el: any) => {
            contentInject.value.onAnchorChange(el)
            return undefined
          },
          style: {
            position: 'absolute',
            left: contentInject.value.arrowX?.value,
            top: contentInject.value.arrowY?.value,
            [baseSide.value]: '0px',
            transformOrigin: {
              top: '',
              right: '0px 0px',
              bottom: 'center 0px',
              left: '100% 0px',
            }[contentInject.value.placedSide.value],
            transform: {
              top: 'translateY(100%)',
              right: 'translateY(50%) rotate(90deg) translateX(-50%)',
              bottom: 'rotate(180deg)',
              left: 'translateY(50%) rotate(-90deg) translateX(50%)',
            }[contentInject.value.placedSide.value],
            visibility: contentInject.value.shouldHideArrow.value
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
