import type { ComponentPublicInstance, PropType, Ref } from 'vue'
import { computed, defineComponent, h, ref, toRefs } from 'vue'
import type { ElementType } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'

import { useId } from '@oku-ui/use-composable'

// import { useId } from '../../../core/use-composable/src/index'

// ---Collapsible---
interface CollapsibleProps {}
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
  },
  setup(props, { attrs, slots, expose }) {
    const innerRef = ref<ComponentPublicInstance>()
    const { ...CollapsibleProps } = attrs as CollapsibleElement
    const { disable, scopeCollapsible } = toRefs(props)
    const open = ref(props.open)

    // const { _ref: collapsibleRef, refEl: collapsibleRefEl } = useRef<CollapsibleElement>()

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })

    collapsibleProvider({
      contentId: useId(),
      disabled: disable,
      open,
      onOpenToggle() {
        console.log('sx', open.value)
        open.value = !open.value
      },
      scope: scopeCollapsible.value,
    })

    const originalReturn = () => h(
      Primitive.div,
      {
        'data-state': getState(open.value),
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

    console.log('context', context.value)

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

// ---CollapsibleContent---
const CONTENT_NAME = 'CollapsibleContent'

const CollapsibleContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    const { forceMount } = toRefs(props)
    const { ...contentProps } = attrs
  },
})

// ---export---
function getState(open?: boolean) {
  return open ? 'open' : 'closed'
}

export {
  Collapsible,
  CollapsibleTrigger,
}

export type {
  CollapsibleProps,
}
