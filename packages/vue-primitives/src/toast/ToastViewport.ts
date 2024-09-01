import type { PrimitiveProps } from '../primitive/index.ts'

export interface ToastViewportProps {
  as?: PrimitiveProps['as']
  /**
   * The keys to use as the keyboard shortcut that will move focus to the toast viewport.
   * @defaultValue ['F8']
   */
  hotkey?: string[]
  /**
   * An author-localized label for the toast viewport to provide context for screen reader users
   * when navigating page landmarks. The available `{hotkey}` placeholder will be replaced for you.
   * @defaultValue 'Notifications ({hotkey})'
   */
  label?: string
}

export const VIEWPORT_PAUSE = 'toast.viewportPause'
export const VIEWPORT_RESUME = 'toast.viewportResume'
