import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuRovingFocusGroup, type RovingFocusGroupProps } from '@oku-ui/roving-focus'
import { useDirection } from '@oku-ui/direction'
import type { ScopeToggleGroup } from './utils'
import { scopeToggleGroupProps } from './utils'
import { toggleGroupProvide, useRovingFocusGroupScope } from './ToggleGroup'

const TOGGLE_GROUP_IMPL_NAME = 'OkuToggleGroupImpl'

export type ToggleGroupImplIntrinsicElement = ElementType<'div'>
export type ToggleGroupImplElement = HTMLDivElement

interface ToggleGroupImplProps extends PrimitiveProps {
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

export const toggleGroupImplPropsObject = {
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
}

const toggleGroupImpl = defineComponent({
  name: TOGGLE_GROUP_IMPL_NAME,
  inheritAttrs: false,
  props: {
    ...toggleGroupImplPropsObject,
    ...scopeToggleGroupProps,
    ...primitiveProps,
  },
  setup(props, { slots, emit, attrs }) {
    const { dir, disabled, loop, orientation, rovingFocus } = toRefs(props)
    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuToggleGroup)
    const direction = useDirection(dir.value)
    const commonProps = computed(() => {
      return {
        role: 'group',
        dir: direction.value,
        disabled: disabled.value,
        loop: loop.value,
        orientation: orientation.value,
        rovingFocus: rovingFocus.value,
      }
    })
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
          ...commonProps.value,
          ref: forwardedRef,
        }, slots),
      })
      : h(Primitive.div, {
        ...commonProps.value,
        ref: forwardedRef,
      }, slots)
  },
})

export const OkuToggleGroupImpl = toggleGroupImpl as typeof toggleGroupImpl &
(new () => {
  $props: ScopeToggleGroup<Partial<ToggleGroupImplElement>>
})

export type { ToggleGroupImplProps }
