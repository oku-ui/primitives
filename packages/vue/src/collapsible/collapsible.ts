import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { createProvideScope } from '@oku-ui/provide'
import { Primitive, primitiveProps } from '@oku-ui/primitive'

import { reactiveOmit, useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
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

    const _reactive = reactive(collapsibleProps)
    const reactiveCollapsibleProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const modelValue = useModel(props, 'modelValue')

    const openProxy = computed(() => {
      if (openProp.value === undefined && modelValue.value === undefined)
        return undefined
      if (openProp.value !== undefined)
        return openProp.value
      if (modelValue.value !== undefined)
        return modelValue.value
    })

    const [open, setOpen] = useControllable({
      prop: computed(() => openProxy.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (result) => {
        emit('openChange', result)
        emit('update:modelValue', result)
      },
      initialValue: false,
    })

    collapsibleProvider({
      contentId: computed(() => useId()),
      disabled,
      onOpenToggle() {
        setOpen(!open.value)
      },
      scope: scopeOkuCollapsible.value,
      open,
    })

    const originalReturn = () => h(
      Primitive.div,
      {
        'data-state': getState(open.value),
        'data-disabled': disabled.value ? '' : undefined,
        ...mergeProps(attrs, reactiveCollapsibleProps),
        'ref': forwardedRef,
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
