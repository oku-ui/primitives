export { default as ToggleGroupRoot } from './ToggleGroupRoot.vue'
export { default as ToggleGroupItem } from './ToggleGroupItem.vue'

export {
  type ToggleGroupType,
  type ToggleGroupProps,
  type ToggleGroupEmits,
  type ToggleGroupContext,
  provideToggleGroupContext,
  useToggleGroupContext,
} from './ToggleGroupRoot.ts'
export type { ToggleGroupItemProps } from './ToggleGroupItem.ts'
