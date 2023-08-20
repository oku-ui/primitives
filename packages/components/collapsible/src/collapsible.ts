import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, toRefs, useModel } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { createProvideScope } from '@oku-ui/provide'
import { Primitive, primitiveProps } from '@oku-ui/primitive'

import { useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import type { ScopeCollapsible } from './utils'
import { getState, scopeCollapsibleProps } from './utils'

interface CollapsibleProps extends PrimitiveProps {
  defaultOpen?: boolean
  open?: boolean
  disabled?: boolean
  onOpenChange?(open: boolean): void
}

export type CollapsibleIntrinsicElement = ElementType<'div'>
export type CollapsibleElement = HTMLDivElement

type CollapsibleProvideValue = {
  contentId: Ref<string>
  disabled?: Ref<boolean | undefined>
  open: Ref<boolean>
  onOpenToggle(): void
}

const collapsibleProps = {
  modelValue: {
    type: [Boolean] as PropType<
      boolean
    >,
    default: undefined,
  },
  defaultOpen: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  open: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
}

const COLLAPSIBLE_NAME = 'OkuCollapsible'

export const [createCollapsibleProvide, createCollapsibleScope] = createProvideScope(COLLAPSIBLE_NAME)

export const [collapsibleProvider, useCollapsibleInject]
  = createCollapsibleProvide<CollapsibleProvideValue>(COLLAPSIBLE_NAME)

const collapsible = defineComponent({
  name: COLLAPSIBLE_NAME,
  inheritAttrs: false,
  props: {
    ...collapsibleProps,
    ...primitiveProps,
    ...scopeCollapsibleProps,
  },
  emits: ['update:modelValue', 'openChange'],
  setup(props, { attrs, slots, emit }) {
    const { ...collapsibleAttr } = attrs as CollapsibleIntrinsicElement
    const { disabled, open, defaultOpen } = toRefs(props)

    const modelValue = useModel(props, 'modelValue')

    const forwardedRef = useForwardRef()

    const proxyOpen = computed({
      get: () => modelValue.value !== undefined
        ? modelValue.value
        : open.value !== undefined ? open.value : undefined,
      set: () => {
      },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyOpen.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (open) => {
        emit('update:modelValue', open)
        emit('openChange', open)
      },
    })

    collapsibleProvider({
      contentId: computed(() => useId()),
      disabled,
      onOpenToggle() {
        updateValue(!state.value)
      },
      scope: props.scopeOkuCollapsible,
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
        default: () => slots.default?.(),
      },
    )
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCollapsible = collapsible as typeof collapsible &
(new () => {
  $props: ScopeCollapsible<Partial<CollapsibleElement>>
})

export type { CollapsibleProps }
