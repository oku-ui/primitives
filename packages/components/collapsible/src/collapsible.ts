import type { ComputedRef, PropType, Ref } from 'vue'
import { computed, defineComponent, h, toRefs, useModel } from 'vue'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import { Primitive, PrimitiveProps } from '@oku-ui/primitive'

import { useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { getState } from './utils'

interface CollapsibleProps extends IPrimitiveProps {
}
type CollapsibleElement = ElementType<'div'>
export type _CollapsibleEl = HTMLDivElement

type CollapsibleProvideValue = {
  contentId: string
  disabled?: Ref<boolean>
  open: ComputedRef<boolean>
  onOpenToggle(): void
}

const COLLAPSIBLE_NAME = 'Collapsible'
export const [createCollapsibleProvide, createCollapsibleScope] = createProvideScope(COLLAPSIBLE_NAME)
export const [collapsibleProvider, useCollapsibleInject]
  = createCollapsibleProvide<CollapsibleProvideValue>(COLLAPSIBLE_NAME)

const Collapsible = defineComponent({
  name: COLLAPSIBLE_NAME,
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Boolean] as PropType<
        boolean
      >,
      default: undefined,
    },
    defaultOpen: {
      type: Boolean,
    },
    open: {
      type: Boolean as PropType<boolean | undefined>,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onOpenChange: {
      type: Function as PropType<(open: boolean) => void>,
    },
    ...PrimitiveProps,
    scopeCollapsible: {
      ...ScopePropObject,
    },
  },
  emits: ['update:open', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const { ...collapsibleAttr } = attrs as CollapsibleElement
    const { disabled, open, defaultOpen } = toRefs(props)

    const modelValue = useModel(props, 'modelValue')

    const forwardedRef = useForwardRef()

    const { state, updateValue } = useControllable({
      prop: computed(() => modelValue.value ?? open.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (open) => {
        emit('update:open', open)
        emit('update:modelValue', open)
      },
    })

    collapsibleProvider({
      contentId: useId(),
      disabled,
      onOpenToggle() {
        updateValue(!state.value)
      },
      scope: props.scopeCollapsible,
      open: computed(() => state.value || false),
    })

    const originalReturn = () => h(
      Primitive.div,
      {
        'data-state': getState(state.value),
        'data-disabled': disabled.value ? '' : undefined,
        'ref': forwardedRef,
        'asChild': props.asChild,
        ...collapsibleAttr,
      },
      {
        default: () => slots.default && slots.default(),
      },
    )
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _CollapsibleProps = MergeProps<CollapsibleProps, CollapsibleElement>
type InstanceCollapsibleType = InstanceTypeRef<typeof Collapsible, _CollapsibleEl>

const OkuCollapsible = Collapsible as typeof Collapsible & (new () => { $props: _CollapsibleProps })

export { OkuCollapsible }
export type { CollapsibleProps, CollapsibleElement, InstanceCollapsibleType }
