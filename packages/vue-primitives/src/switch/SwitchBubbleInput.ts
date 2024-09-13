import type { MutableRefObject } from '../hooks'

export interface SwitchBubbleInputProps {
  checked: boolean
  control: HTMLElement | undefined
  bubbles: MutableRefObject<boolean>
}
