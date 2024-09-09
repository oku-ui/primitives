export { type CheckboxIndicatorProps } from './CheckboxIndicator.ts'
export { default as CheckboxIndicator } from './CheckboxIndicator.vue'

export {
  type CheckboxContext,
  type CheckboxRootEmits,
  type CheckboxRootProps,
  type CheckedState,
  provideCheckboxContext,
  useCheckboxContext,
} from './CheckboxRoot.ts'
export { default as CheckboxRoot } from './CheckboxRoot.vue'

export { isIndeterminate } from './utils.ts'
