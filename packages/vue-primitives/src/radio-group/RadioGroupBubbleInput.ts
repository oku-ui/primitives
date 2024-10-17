import type { MutableRefObject } from '@oku-ui/hooks'

export interface RadioGroupBubbleInputProps {
  checked: boolean
  control: HTMLElement | undefined
  bubbles: MutableRefObject<boolean>
}
