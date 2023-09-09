import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { createProvideScope } from '@oku-ui/provide'
import { Primitive, primitiveProps } from '@oku-ui/primitive'

import { useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { getState, scopeCollapsibleProps } from './utils'

export type CollapsibleNaviteElement = OkuElement<'div'>
export type CollapsibleElement = HTMLDivElement

export type CollapsibleProvideValue = {
  contentId: Ref<string>
  disabled?: Ref<boolean | undefined>
  open: Ref<boolean>
  onOpenToggle(): void
}

export interface CollapsibleProps extends PrimitiveProps {
  defaultOpen?: boolean
  open?: boolean
  disabled?: boolean
}

export type CollapsibleEmits = {
  'update:modelValue': [open: boolean]
  'openChange': [open: boolean]
}

export const collapsibleProps = {
  props: {
    modelValue: {
      type: [Boolean, undefined] as PropType<
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
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (open: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (open: boolean) => true,
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
    ...collapsibleProps.props,
    ...primitiveProps,
    ...scopeCollapsibleProps,
  },
  emits: collapsibleProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      modelValue: _modelValue,
      scopeOkuCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      ...collapsibleProps
    } = toRefs(props)

    const reactiveCollapsibleProps = reactive(collapsibleProps)

    const modelValue = useModel(props, 'modelValue')

    const forwardedRef = useForwardRef()

    const proxyOpen = computed({
      get: () => modelValue.value !== undefined
        ? modelValue.value
        : openProp.value !== undefined ? openProp.value : undefined,
      set: () => {
      },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyOpen.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (open) => {
        emit('openChange', open as boolean)
        modelValue.value = open
      },
      initialValue: false,
    })

    collapsibleProvider({
      contentId: computed(() => useId()),
      disabled,
      onOpenToggle() {
        updateValue(!state.value)
      },
      scope: scopeOkuCollapsible.value,
      open: state,
    })

    const originalReturn = () => h(
      Primitive.div,
      {
        'data-state': getState(state.value),
        'data-disabled': disabled.value ? '' : undefined,
        'ref': forwardedRef,
        ...mergeProps(attrs, reactiveCollapsibleProps),
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
  $props: CollapsibleNaviteElement
})
