import type { MutableRefObject } from '@oku-ui/hooks'

export interface SwitchBubbleInputProps {
  checked: boolean
  control: HTMLElement | undefined
  bubbles: MutableRefObject<boolean>
}
