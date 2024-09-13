import type { MutableRefObject } from '../hooks/index.ts'
import type { CheckedState } from './CheckboxRoot.ts'

export interface CheckboxBubbleInputProps {
  checked: CheckedState
  control: HTMLElement | undefined
  bubbles: MutableRefObject<boolean>
}
