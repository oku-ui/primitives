export { default as CollapsibleRoot } from './CollapsibleRoot.vue'
export { default as CollapsibleTrigger } from './CollapsibleTrigger.vue'
export { default as CollapsibleContent } from './CollapsibleContent.vue'

export {
  type CollapsibleRootProps,
  type CollapsibleRootEmits,
  type CollapsibleContext,
  provideCollapsibleContext,
  useCollapsibleContext,
} from './CollapsibleRoot.ts'
export { type CollapsibleTriggerProps, type CollapsibleTriggerEmits } from './CollapsibleTrigger.ts'
export { type CollapsibleContentProps } from './CollapsibleContent.ts'
