import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { OkuArrow } from '@oku-ui/arrow'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { ARROW_NAME, OPPOSITE_SIDE, popperArrowProps, scopePopperProps, usePopperContentInject } from './props'
import type { PopperArrowNaviteElement } from './props'

const popperArrow = defineComponent({
  name: ARROW_NAME,
  inheritAttrs: false,
  props: {
    ...popperArrowProps.props,
    ...scopePopperProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuPopper, ...arrowProps } = toRefs(props)
    const _reactive = reactive(arrowProps)
    const reactiveArrowProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

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
            left: contentInject.arrowX?.value ? `${contentInject.arrowX?.value}px` : undefined,
            top: contentInject.arrowY?.value ? `${contentInject.arrowY?.value}px` : undefined,
            [baseSide.value]: '0px',
            transformOrigin: {
              top: '',
              right: '0 0',
              bottom: 'center 0',
              left: '100% 0',
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
            ...mergeProps(reactiveArrowProps, attrs),
            ref: forwardedRef,
            style: {
              ...attrs.style as any,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: 'block',
            },
          }, {
            default: () => slots.default?.(),
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
