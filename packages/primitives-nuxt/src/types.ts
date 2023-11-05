export type SelectPackage =
'aspect-ratio' |
'avatar' |
'checkbox' |
'collapsible' |
'dialog' |
'hover-card' |
'label' |
'popover' |
'progress' |
'radio-group' |
'separator' |
'slider' |
'switch' |
'tabs' |
'toast' |
'toggle' |
'toggle-group' |
'toolbar' |
'tooltip' |
'accordion' |
'alert-dialog' |
'scroll-area'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Select which primitives to include
   * @default {}
   * @example
   * ```ts
   * installComponents: {
   *  'aspect-ratio': true,
   *  'avatar': true,
   *  'checkbox': true,
   *  'collapsible': true,
   *  }
   * ```
   *
   */
  installComponents: {
    [key in SelectPackage]?: boolean
  } | boolean
  /**
   * Show splash message
   * @default true
   */
  splash?: boolean
  autoInstall?: boolean
}
