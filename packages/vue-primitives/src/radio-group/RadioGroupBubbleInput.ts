import type { MutableRefObject } from '../hooks/index.ts'

export interface RadioGroupBubbleInputProps {
  checked: boolean
  control: HTMLElement | undefined
  bubbles: MutableRefObject<boolean>
}
