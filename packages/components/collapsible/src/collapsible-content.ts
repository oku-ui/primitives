import type { ComputedRef } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { OkuCollapsibleContentImpl } from './collapsible-content-impl'
import { COLLAPSIBLE_CONTENT_NAME, collapsibleContentProps, scopeCollapsibleProps, useCollapsibleInject } from './props'
import type { CollapsibleContentNativeElement } from './props'

const collapsibleContent = defineComponent({
  name: COLLAPSIBLE_CONTENT_NAME,
  components: {
    OkuCollapsibleContentImpl,
  },
  inheritAttrs: false,
  props: {
    ...collapsibleContentProps.props,
    ...scopeCollapsibleProps,
  },
  emits: collapsibleContentProps.emits,
  setup(props, { attrs, slots }) {
    const { forceMount, ...contentProps } = toRefs(props)

    const _reactive = reactive(contentProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useCollapsibleInject(COLLAPSIBLE_CONTENT_NAME, props.scopeOkuCollapsible)

    return () => h(OkuPresence, {
      present: computed(() => forceMount.value || inject.open.value).value,
    }, {
      default: ({ isPresent }: { isPresent: ComputedRef<boolean> }) => h(OkuCollapsibleContentImpl, {
        ...mergeProps(attrs, otherProps),
        ref: forwardedRef,
        present: isPresent.value,
      }, () => slots.default?.()),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCollapsibleContent = collapsibleContent as typeof collapsibleContent & (new () => { $props: CollapsibleContentNativeElement })
