import type { ComponentPublicInstance, PropType, Ref } from 'vue'
import { Transition, computed, defineComponent, h, ref, toRefs } from 'vue'
import type { ElementType } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'

import { useControllableRef, useId } from '@oku-ui/use-composable'

// import { useId } from '../../../core/use-composable/src/index'

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
const [createCollapsibleContext, createCollapsibleScope] = createProvideScope(COLLAPSIBLE_NAME)
const [collapsibleProvider, useCollapsibleContext]
  = createCollapsibleContext<CollapsibleContextValue>(COLLAPSIBLE_NAME)

const Collapsible = defineComponent({
  name: COLLAPSIBLE_NAME,
  inheritAttrs: false,
  props: {
    defaultOpen: {
      type: Boolean,
    },
    open: {
      type: Boolean,
      default: false,
    },
    disable: {
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
  setup(props, { attrs, slots, expose }) {
    const innerRef = ref<ComponentPublicInstance>()
    const { ...CollapsibleProps } = attrs as CollapsibleElement
    const { disable, scopeCollapsible, open, defaultOpen } = toRefs(props)

    // const { _ref: collapsibleRef, refEl: collapsibleRefEl } = useRef<CollapsibleElement>()

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })

    const { state } = useControllableRef({
      prop: open.value,
      onChange: props.onOpenChange,
      defaultProp: defaultOpen.value,
    })

    collapsibleProvider({
      contentId: useId(),
      disabled: disable,
      open: state,
      onOpenToggle() {
        // TODO: Need Help!!!
        state.value = !state.value
      },
      scope: scopeCollapsible.value,
    })

    const originalReturn = () => h(
      Primitive.div,
      {
        'data-state': getState(state.value),
        'data-disable': disable.value ? '' : undefined,
        'ref': innerRef,
        ...CollapsibleProps,
      },
      slots.default && slots.default(),
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
    const innerRef = ref<ComponentPublicInstance>()
    const { ...triggerProps } = attrs as CollapsibleTriggerElement
    const context = useCollapsibleContext(TRIGGER_NAME, scopeCollapsible.value)

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => h(
      Primitive.button,
      {
        'type': 'button',
        'aria-controls': context.value.contentId,
        'aria-expanded': context.value.open.value || false,
        'data-state': getState(context.value.open.value),
        'data-disabled': context.value.disabled?.value ? '' : undefined,
        'disabled': context.value.disabled?.value,
        ...triggerProps,
        'ref': innerRef,
        'onClick': composeEventHandlers(triggerProps.onClick, context.value.onOpenToggle),
      },
      slots.default && slots.default(),
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
    const context = useCollapsibleContext(CONTENT_NAME, scopeCollapsible.value)
    const innerRef = ref<ComponentPublicInstance>()

    const isPresent = ref(present.value)
    const isOpen = computed(() => context.value.open.value || isPresent.value)

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => h(
      Primitive.div,
      {
        'data-state': getState(context.value.open.value),
        'data-disabled': context.value.disabled?.value ? '' : undefined,
        'id': context.value.contentId,
        'hidden': !isOpen.value,
        ...contentProps,
        'ref': innerRef,
        'style': {
          // ...attrs.style,
        },
      },
      isOpen.value ? slots.default : undefined,
    )

    return originalReturn
  },
})

// ---CollapsibleContent---

const CollapsibleContent = defineComponent({
  name: CONTENT_NAME,
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
    const { forceMount, scopeCollapsible } = toRefs(props)
    const { ...contentProps } = attrs
    const innerRef = ref<ComponentPublicInstance>()
    const context = useCollapsibleContext(CONTENT_NAME, scopeCollapsible.value)

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => h(
      Transition,
      {},
      h(
        CollapsibleContentImpl,
        {
          ...contentProps,
          ref: innerRef,
        },
        slots.default && slots.default(),
      ),
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
