import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { defineComponent, h, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuRovingFocusGroup, type RovingFocusGroupProps } from '@oku-ui/roving-focus'
import { useDirection } from '@oku-ui/direction'
import { scopeToggleGroupProps } from './utils'
import { toggleGroupProvide, useRovingFocusGroupScope } from './ToggleGroup'

const TOGGLE_GROUP_IMPL_NAME = 'OkuToggleGroupImpl'

export type ToggleGroupImplIntrinsicElement = ElementType<'div'>
export type ToggleGroupImplElement = HTMLDivElement

export interface ToggleGroupImplProps extends PrimitiveProps {
  /**
   * Whether the group is disabled from user interaction.
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * Whether the group should maintain roving focus of its buttons.
   * @defaultValue true
   */
  rovingFocus?: boolean
  /**
   * @defaultValue true
   */
  loop?: RovingFocusGroupProps['loop']
  orientation?: RovingFocusGroupProps['orientation']
  dir?: RovingFocusGroupProps['dir']
}

export const toggleGroupImplProps = {
  props: {
    /**
    * Whether the group is disabled from user interaction.
    * @defaultValue false
    */
    disabled: {
      type: [Boolean] as PropType<boolean>,
      default: false,
    },
    /**
     * Whether the group should maintain roving focus of its buttons.
     * @defaultValue true
     */
    rovingFocus: {
      type: [Boolean] as PropType<boolean>,
      default: true,
    },
    loop: {
      type: [Boolean, String] as PropType<RovingFocusGroupProps['loop']>,
      default: true,
    },
    orientation: {
      type: [String] as PropType<RovingFocusGroupProps['orientation'] | undefined>,
      default: undefined,
    },
    dir: {
      type: [String] as PropType<RovingFocusGroupProps['dir'] | undefined>,
      default: undefined,
    },
    ...primitiveProps,
  },
}

const toggleGroupImpl = defineComponent({
  name: TOGGLE_GROUP_IMPL_NAME,
  inheritAttrs: false,
  props: {
    ...toggleGroupImplProps.props,
    ...scopeToggleGroupProps,
    ...primitiveProps,
  },
  setup(props, { slots, attrs }) {
    const { dir, disabled, loop, orientation, rovingFocus } = toRefs(props)
    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuToggleGroup)
    const direction = useDirection(dir.value)

    const forwardedRef = useForwardRef()

    toggleGroupProvide({
      scope: props.scopeOkuToggleGroup,
      rovingFocus,
      disabled,
    })

    return () => rovingFocus.value
      ? h(OkuRovingFocusGroup, {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: orientation.value,
        dir: direction.value,
        loop: loop.value,
      }, {
        default: () => h(Primitive.div, {
          role: 'group',
          dir: direction.value,
          asChild: props.asChild,
          ...attrs,
          scopeOkuToggleGroup: props.scopeOkuToggleGroup,
          ref: forwardedRef,
        }, slots),
      })
      : h(Primitive.div, {
        role: 'group',
        dir: direction.value,
        ...attrs,
        asChild: props.asChild,
        ref: forwardedRef,
      }, slots)
  },
})

export const OkuToggleGroupImpl = toggleGroupImpl as typeof toggleGroupImpl &
(new () => {
  $props: Partial<ToggleGroupImplElement>
})
