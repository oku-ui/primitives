export { default as TabsRoot } from './TabsRoot.vue'
export { default as TabsList } from './TabsList.vue'
export { default as TabsTrigger } from './TabsTrigger.vue'
export { default as TabsContent } from './TabsContent.vue'

export {
  type TabsRootProps,
  type TabsRootEmits,
  type TabsContext,
  provideTabsContext,
  useTabsContext,
} from './TabsRoot.ts'
export { type TabsListProps } from './TabsList.ts'
export { type TabsTriggerProps, type TabsTriggerEmits } from './TabsTrigger.ts'
export { type TabsContentProps } from './TabsContent.ts'
