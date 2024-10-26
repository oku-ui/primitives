import type { TeleportProps } from 'vue'

export interface PortalProps {
  /**
   * Vue native teleport component prop `:to`
   *
   * {@link https://vuejs.org/guide/built-ins/teleport.html#basic-usage}
   */
  to?: TeleportProps['to']
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean
}
