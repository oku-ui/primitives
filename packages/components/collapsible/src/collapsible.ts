import type { PropType, Ref } from 'vue'
import { Transition, computed, defineComponent, h, ref, toRefs } from 'vue'
import type { ElementType } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'

import { useControllable, useId, useRef } from '@oku-ui/use-composable'

// ---Collapsible---
interface CollapsibleProps { }
type CollapsibleElement = ElementType<'div'>
type CollapsibleTriggerElement = ElementType<'button'>
type CollapsibleContextValue = {
  contentId: string
  disabled?: Ref<boolean>
  open: Ref<boolean>
  onOpenToggle(): void
}

const COLLAPSIBLE_NAME = 'Collapsible'
const [createCollapsibleProvide, _createCollapsibleScope] = createProvideScope(COLLAPSIBLE_NAME)
const [collapsibleProvider, useCollapsibleInject]
  = createCollapsibleProvide<CollapsibleContextValue>(COLLAPSIBLE_NAME)

const Collapsible = defineComponent({
  name: COLLAPSIBLE_NAME,
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Boolean, String, Number] as PropType<
        boolean | string | number | undefined | 'indeterminate'
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
    scopeCollapsible: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    onOpenChange: {
      type: Function as PropType<(open: boolean) => void>,
    },
  },
  emits: ['update:open', 'update:modelValue'],
  setup(props, { attrs, slots, expose, emit }) {
    const { ...collapsibleAttr } = attrs as CollapsibleElement
    const { disabled, scopeCollapsible, open, defaultOpen } = toRefs(props)

    const { $el, newRef } = useRef<CollapsibleElement>()

    expose({
      innerRef: $el,
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => open.value),
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
      scope: scopeCollapsible.value,
      open: state as Ref<boolean>,
    })

    const originalReturn = () => h(
      Primitive.div,
      {
        'data-state': getState(state.value),
        'data-disabled': disabled.value ? '' : undefined,
        'ref': newRef,
        ...collapsibleAttr,
      },
      {
        default: () => slots.default && slots.default(),
      },
    )
    return originalReturn
  },
})

// ---CollapsibleTrigger---
const TRIGGER_NAME = 'CollapsibleTrigger'

const CollapsibleTrigger = defineComponent({
  name: TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    scopeCollapsible: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { scopeCollapsible } = toRefs(props)
    const { ...triggerProps } = attrs as CollapsibleTriggerElement
    const context = useCollapsibleInject(TRIGGER_NAME, scopeCollapsible.value)
    const { $el, newRef } = useRef<CollapsibleElement>()

    expose({
      innerRef: $el,
    })

    const originalReturn = () => h(
      Primitive.button,
      {
        'type': 'button',
        'aria-controls': context.value.contentId,
        'aria-expanded': context.value.open.value || false,
        'data-state': getState(context.value.open.value || false),
        'data-disabled': context.value.disabled?.value ? '' : undefined,
        'disabled': context.value.disabled?.value,
        ...triggerProps,
        'ref': newRef,
        'onClick': composeEventHandlers(triggerProps.onClick, context.value.onOpenToggle),
      },
      {
        default: () => slots.default && slots.default(),
      },
    )
    return originalReturn
  },
})

// ---CollapsibleContentImpl---
const CONTENT_NAME = 'CollapsibleContent'

const CollapsibleContentImpl = defineComponent({
  inheritAttrs: false,
  props: {
    present: {
      type: Boolean,
    },
    scopeCollapsible: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { scopeCollapsible, present } = toRefs(props)
    const { ...contentProps } = attrs
    const context = useCollapsibleInject(CONTENT_NAME, scopeCollapsible.value)
    const { $el, newRef } = useRef<CollapsibleElement>()

    expose({
      innerRef: $el,
    })
    const isPresent = ref(present.value)
    const isOpen = computed(() => context.value.open.value || isPresent.value)

    const originalReturn = () => h(
      Primitive.div,
      {
        'data-state': getState(context.value.open.value),
        'data-disabled': context.value.disabled?.value ? '' : undefined,
        'id': context.value.contentId,
        'hidden': !isOpen.value,
        ...contentProps,
        'ref': newRef,
        'style': {
          // ...attrs.style,
        },
      },
      isOpen.value
        ? {
            default: () => slots.default && slots.default(),
          }
        : undefined,
    )

    return originalReturn
  },
})

// ---CollapsibleContent---

const CollapsibleContent = defineComponent({
  name: CONTENT_NAME,
  components: {
    CollapsibleContentImpl,
    Transition,
  },
  inheritAttrs: false,
  props: {
    forceMount: {
      type: Boolean,
      default: true,
    },
    scopeCollapsible: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { scopeCollapsible } = toRefs(props)
    const { ...contentProps } = attrs

    const { $el, newRef } = useRef<CollapsibleElement>()

    expose({
      innerRef: $el,
    })

    // TODO: Transition
    const originalReturn = () => h(
      Transition,
      {},
      {
        default: () => h(
          CollapsibleContentImpl,
          {
            ...contentProps,
            ref: newRef,
            scopeCollapsible: scopeCollapsible.value,
          },
          {
            default: () => slots.default && slots.default(),
          },
        ),
      },
    )
    return originalReturn
  },
})

// ---export---
function getState(open?: boolean) {
  return open ? 'open' : 'closed'
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
}

export type {
  CollapsibleProps,
}
