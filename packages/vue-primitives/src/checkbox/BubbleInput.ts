import type { CheckedState } from './CheckboxRoot.ts'

export interface BubbleInputProps {
  checked: CheckedState
  control: HTMLElement | undefined
  bubbles: boolean
}
