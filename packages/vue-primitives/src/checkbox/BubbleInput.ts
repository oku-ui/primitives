import type { CheckedState } from './Checkbox.ts'

export interface BubbleInputProps {
  checked: CheckedState
  control: HTMLElement | undefined
  bubbles: boolean
}
