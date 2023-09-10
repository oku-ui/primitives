import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { defineComponent, h, mergeProps, reactive, toRef, toRefs } from 'vue'
import type { PropType } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuRovingFocusGroup, type RovingFocusGroupProps } from '@oku-ui/roving-focus'
import { useDirection } from '@oku-ui/direction'
import { scopeToggleGroupProps } from './utils'
import { toggleGroupProvide, useRovingFocusGroupScope } from './ToggleGroup'

const TOGGLE_GROUP_IMPL_NAME = 'OkuToggleGroupImpl'

export type ToggleGroupImplNaviteElement = OkuElement<'div'>
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
      required: false,
    },
    /**
     * Whether the group should maintain roving focus of its buttons.
     * @defaultValue true
     */
    rovingFocus: {
      type: [Boolean] as PropType<boolean>,
      default: true,
      required: false,
    },
    loop: {
      type: [Boolean, String] as PropType<RovingFocusGroupProps['loop']>,
      default: true,
      required: false,
    },
    orientation: {
      type: [String] as PropType<RovingFocusGroupProps['orientation'] | undefined>,
      default: undefined,
      required: false,
    },
    dir: {
      type: [String] as PropType<RovingFocusGroupProps['dir'] | undefined>,
      default: undefined,
      required: false,
    },
    ...primitiveProps,
  },
}

const toggleGroupImpl = defineComponent({
  name: TOGGLE_GROUP_IMPL_NAME,
  components: {
    Primitive,
    OkuRovingFocusGroup,
  },
  inheritAttrs: false,
  props: {
    ...toggleGroupImplProps.props,
    ...scopeToggleGroupProps,
    ...primitiveProps,
  },
  setup(props, { slots, attrs }) {
    const {
      scopeOkuToggleGroup,
      disabled,
      rovingFocus,
      orientation,
      dir,
      loop,
      ...toggleGroupProps
    } = toRefs(props)
    const _reactive = reactive(toggleGroupProps)
    const reactiveGroupProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuToggleGroup.value)
    const direction = useDirection(dir.value)

    const forwardedRef = useForwardRef()

    toggleGroupProvide({
      scope: scopeOkuToggleGroup.value,
      rovingFocus: toRef(props, 'rovingFocus'),
      disabled: toRef(() => disabled.value),
    })

    return () => rovingFocus
      ? h(OkuRovingFocusGroup, {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: orientation.value,
        dir: direction.value,
        loop: loop.value,
      }, {
        default: () => h(Primitive.div, {
          role: 'radiogroup',
          dir: direction.value,
          ...mergeProps(attrs, reactiveGroupProps),
          ref: forwardedRef,
        }, slots),
      })
      : h(Primitive.div, {
        role: 'radiogroup',
        dir: direction.value,
        ...mergeProps(attrs, reactiveGroupProps),
        ref: forwardedRef,
      }, slots)
  },
})

export const OkuToggleGroupImpl = toggleGroupImpl as typeof toggleGroupImpl &
(new () => {
  $props: ToggleGroupImplNaviteElement
})
