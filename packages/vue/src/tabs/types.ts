import type { Scope } from '@oku-ui/provide'

export type Orientation = 'horizontal' | 'vertical'
export type Direction = 'ltr' | 'rtl'
/**
 * Whether a tab is activated automatically or manually.
 * @defaultValue automatic
 */
export type ActivationMode = 'automatic' | 'manual'

export interface TabsScopeProps {
  scopeOkuTabs?: Scope
}
