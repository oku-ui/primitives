import type { PropType, Ref } from 'vue'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { createCollection } from '@oku-ui/collection'
import type { DismissableLayerEmits } from '@oku-ui/dismissable-layer'
import { visuallyHiddenProps } from '@oku-ui/visually-hidden'
import type { VisuallyHiddenElement, VisuallyHiddenNativeElement, VisuallyHiddenProps } from '@oku-ui/visually-hidden'

export type ScopeToast<T> = T & { scopeOkuToast?: Scope }

export const scopeToastProps = {
  scopeOkuToast: {
    ...ScopePropObject,
  },
}

export const TOAST_NAME = 'OkuToast'
export const TOAST_PROVIDER_NAME = 'OkuToastProvider'
export const TOAST_VIEWPORT_NAME = 'OkuToastViewport'
export const TOAST_FOCUS_PROXY_NAME = 'OkuToastFocusProxy'
export const TOAST_IMPL_NAME = 'OkuToastImpl'
export const TOAST_ANNOUNCE_NAME = 'OkuToastAnnounce'
export const TOAST_TITLE_NAME = 'OkuToastTitle'
export const TOAST_DESCRIPTION_NAME = 'OkuToastDescription'
export const TOAST_CLOSE_NAME = 'OkuToastClose'
export const TOAST_ACTION_NAME = 'OkuToastAction'
export const TOAST_ANNOUNCE_EXCLUDE_NAME = 'OkuAnnounceExclude'

/* -------------------------------------------------------------------------------------------------
 * ToastProvider
 * ----------------------------------------------------------------------------------------------- */

export const { CollectionProvider, CollectionSlot, CollectionItemSlot, useCollection, createCollectionScope } = createCollection<ToastElement>('Toast')

export type SwipeDirection = 'up' | 'down' | 'left' | 'right'

type ToastProviderProvideValue = {
  label: Ref<string>
  duration: Ref<number>
  swipeDirection: Ref<SwipeDirection>
  swipeThreshold: Ref<number>
  toastCount: Ref<number>
  viewport: Ref<ToastViewportElement | null>
  onViewportChange(viewport: ToastViewportElement): void
  onToastAdd(): void
  onToastRemove(): void
  isFocusedToastEscapeKeyDownRef: Ref<boolean>
  isClosePausedRef: Ref<boolean>
}

export const [createToastProvide, createToastScope] = createProvideScope('Toast', [createCollectionScope])

export const [toastProviderProvider, useToastProviderInject] = createToastProvide<ToastProviderProvideValue>(TOAST_PROVIDER_NAME)

export interface ToastProviderProps {
  /**
   * An author-localized label for each toast. Used to help screen reader users
   * associate the interruption with a toast.
   * @defaultValue 'Notification'
   */
  label: string
  /**
   * Time in milliseconds that each toast should remain visible for.
   * @defaultValue 5000
   */
  duration: number
  /**
   * Direction of pointer swipe that should close the toast.
   * @defaultValue 'right'
   */
  swipeDirection: SwipeDirection
  /**
   * Distance in pixels that the swipe must pass before a close is triggered.
   * @defaultValue 50
   */
  swipeThreshold: number
}

export const toastProviderProps = {
  props: {
    label: {
      type: String as PropType<ToastProviderProps['label']>,
      default: 'Notification',
      // if (props.label && typeof props.label === 'string' && !props.label.trim()) {
      // const error = `Invalid prop \`label\` supplied to \`${PROVIDER_NAME}\`. Expected non-empty \`string\`.`;
      // return new Error(error);
      // }
      // return null;
    },
    duration: {
      type: Number as PropType<ToastProviderProps['duration']>,
      default: 5000,
    },
    swipeDirection: {
      type: String as PropType<ToastProviderProps['swipeDirection']>,
      default: 'right',
    },
    swipeThreshold: {
      type: Number as PropType<ToastProviderProps['swipeThreshold']>,
      default: 50,
    },
  },
}

/* -------------------------------------------------------------------------------------------------
 * ToastViewport
 * ----------------------------------------------------------------------------------------------- */

export const VIEWPORT_NAME = 'ToastViewport'
export const VIEWPORT_DEFAULT_HOTKEY = ['F8']
export const VIEWPORT_PAUSE = 'toast.viewportPause'
export const VIEWPORT_RESUME = 'toast.viewportResume'

export type ToastViewportNativeElement = OkuElement<'ol'>
export type ToastViewportElement = HTMLOListElement

export interface ToastViewportProps extends PrimitiveProps {
  /**
   * The keys to use as the keyboard shortcut that will move focus to the toast viewport.
   * @defaultValue ['F8']
   */
  hotkey: string[]
  /**
   * An author-localized label for the toast viewport to provide context for screen reader users
   * when navigating page landmarks. The available `{hotkey}` placeholder will be replaced for you.
   * @defaultValue 'Notifications ({hotkey})'
   */
  label: string
}

export const toastViewportProps = {
  props: {
    hotkey: {
      type: Array as PropType<ToastViewportProps['hotkey']>,
      default: VIEWPORT_DEFAULT_HOTKEY,
    },
    label: {
      type: String as PropType<ToastViewportProps['label']>,
      default: 'Notifications ({hotkey})',
    },
    ...primitiveProps,
  },
  emits: { },
}

/* -------------------------------------------------------------------------------------------------
 * FocusProxy
 * ----------------------------------------------------------------------------------------------- */

export type FocusProxyNativeElement = VisuallyHiddenNativeElement
export type FocusProxyElement = VisuallyHiddenElement

export interface FocusProxyProps extends VisuallyHiddenProps { }

// export interface FocusProxyPropsEmit extends VisuallyHiddenEmits {
export interface FocusProxyPropsEmit {
  focusFromOutsideViewport: []
}

export const focusProxyProps = {
  props: {
    ...visuallyHiddenProps.props,
  },
  emits: {
    focusFromOutsideViewport: () => true,
    ...visuallyHiddenProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * ToastImpl
 * ----------------------------------------------------------------------------------------------- */

export type ToastImplNativeElement = OkuElement<'li'>
export type ToastImplElement = HTMLLIElement

export type SwipeEvent = { currentTarget: EventTarget & ToastElement } & Omit<
  CustomEvent<{ originalEvent: PointerEvent, delta: { x: number, y: number } }>,
  'currentTarget'
>

// export const [toastInteractiveProvider, useToastInteractiveInject] = createToastContext(TOAST_NAME, {
//   onClose() {},
// })
export const [toastInteractiveProvider, useToastInteractiveInject] = createToastProvide(TOAST_NAME, {
  onClose() { },
})

// type DismissableLayerProps = Radix.ComponentPropsWithoutRef<typeof DismissableLayer.Root>
// type PrimitiveListItemProps = Radix.ComponentPropsWithoutRef<typeof Primitive.li>

export type ToastImplPrivateProps = { open: boolean }

export type ToastImplPrivateEmits = {
  close: []
}

export const toastImplPrivateProps = {
  props: {
    open: {
      type: Boolean as PropType<ToastImplPrivateProps['open']>,
      required: true,
    },
  },
  emits: {
    close: () => true,
  },
}

export interface ToastImplProps extends ToastImplPrivateProps, PrimitiveProps {
  type?: 'foreground' | 'background'
  /**
   * Time in milliseconds that toast should remain visible for. Overrides value
   * given to `ToastProvider`.
   */
  duration?: number
}

export interface ToastImplEmits extends ToastImplPrivateEmits {
  escapeKeydown: [event: DismissableLayerEmits['escapeKeydown'][0]]
  pause: []
  resume: []
  swipeStart: [event: SwipeEvent]
  swipeMove: [event: SwipeEvent]
  swipeCancel: [event: SwipeEvent]
  swipeEnd: [event: SwipeEvent]

  keydown: [event: KeyboardEvent]
  pointerdown: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  pointerup: [event: PointerEvent]
}

export const toastImplProps = {
  props: {
    type: {
      type: String as PropType<ToastImplProps['type']>,
      default: 'foreground',
      required: false,
    },
    duration: {
      type: Number as PropType<ToastImplProps['duration']>,
      required: false,
    },
    ...toastImplPrivateProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    escapeKeydown: (event: DismissableLayerEmits['escapeKeydown'][0]) => true,
    pause: () => true,
    resume: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    swipeStart: (event: SwipeEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    swipeMove: (event: SwipeEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    swipeCancel: (event: SwipeEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    swipeEnd: (event: SwipeEvent) => true,

    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointermove: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerup: (event: PointerEvent) => true,
    ...toastImplPrivateProps.emits,
  },
}

// ToastImpl.propTypes = {
//   type(props) {
//     if (props.type && !['foreground', 'background'].includes(props.type)) {
//       const error = `Invalid prop \`type\` supplied to \`${TOAST_NAME}\`. Expected \`foreground | background\`.`;
//       return new Error(error);
//     }
//     return null;
//   },
// };

/* -------------------------------------------------------------------------------------------------
 * Toast
 * ----------------------------------------------------------------------------------------------- */

export const TOAST_SWIPE_START = 'toast.swipeStart'
export const TOAST_SWIPE_MOVE = 'toast.swipeMove'
export const TOAST_SWIPE_CANCEL = 'toast.swipeCancel'
export const TOAST_SWIPE_END = 'toast.swipeEnd'

export type ToastNativeElement = ToastImplNativeElement
export type ToastElement = ToastImplElement

export interface ToastProps extends Omit<ToastImplProps, keyof ToastImplPrivateProps> {
  open?: boolean
  defaultOpen?: boolean
  modelValue?: boolean
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export interface ToastEmits extends Omit<ToastImplEmits, keyof ToastImplPrivateEmits> {
  openChange: [open: boolean]
  'update:modelValue': [value: boolean]
}

export const toastProps = {
  props: {
    ...toastImplProps.props,
    open: {
      type: Boolean as PropType<ToastProps['open']>,
      default: undefined,
    },
    defaultOpen: {
      type: Boolean as PropType<ToastProps['defaultOpen']>,
      default: undefined,
    },
    modelValue: {
      type: Boolean as PropType<ToastProps['modelValue']>,
      default: undefined,
    },
    forceMount: {
      type: Boolean as PropType<ToastProps['forceMount']>,
    },
  },
  emits: {
    ...propsOmit(toastImplProps.emits, ['close']),
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (value: ToastEmits['openChange'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: ToastEmits['update:modelValue'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * ToastAnnounce
 * ----------------------------------------------------------------------------------------------- */

// export type ToastAnnounceNaviteElement = OkuElement<'div'>
// export type ToastAnnounceElement = HTMLDivElement

// interface ToastAnnounceProps
//   extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>,
//   ScopedProps<{ children: string[] }> {}
export interface ToastAnnounceProps extends PrimitiveProps { }

export const toastAnnounceProps = {
  props: {
    ...primitiveProps,
  },
  emits: { },
}

/* -------------------------------------------------------------------------------------------------
 * ToastTitle
 * ----------------------------------------------------------------------------------------------- */

export type ToastTitleNativeElement = OkuElement<'div'>
export type ToastTitleElement = HTMLDivElement

export interface ToastTitleProps extends PrimitiveProps { }

export const toastTitleProps = {
  props: {
    ...primitiveProps,
  },
  emits: { },
}

/* -------------------------------------------------------------------------------------------------
 * ToastDescription
 * ----------------------------------------------------------------------------------------------- */

export type ToastDescriptionNativeElement = OkuElement<'div'>
export type ToastDescriptionElement = HTMLDivElement

export interface ToastDescriptionProps extends PrimitiveProps { }

export const toastDescriptionProps = {
  props: {
    ...primitiveProps,
  },
  emits: { },
}

/* -------------------------------------------------------------------------------------------------
 * ToastClose
 * ----------------------------------------------------------------------------------------------- */

export type ToastCloseNativeElement = OkuElement<'button'>
export type ToastCloseElement = HTMLButtonElement

export interface ToastCloseProps extends PrimitiveProps { }

export type ToastCloseEmits = {
  click: [event: MouseEvent]
}

export const toastCloseProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: ToastCloseEmits['click'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * ToastAction
 * ----------------------------------------------------------------------------------------------- */

export type ToastActionNativeElement = ToastCloseNativeElement
export type ToastActionElement = ToastCloseElement

export interface ToastActionProps extends ToastCloseProps {
  /**
   * A short description for an alternate way to carry out the action. For screen reader users
   * who will not be able to navigate to the button easily/quickly.
   * @example <ToastAction altText="Goto account settings to upgrade">Upgrade</ToastAction>
   * @example <ToastAction altText="Undo (Alt+U)">Undo</ToastAction>
   */
  altText: string
}

export interface ToastActionEmits extends ToastCloseEmits { }

export const toastActionProps = {
  props: {
    altText: {
      type: String as PropType<ToastActionProps['altText']>,
      required: true,
    },
    ...toastCloseProps.props,
  },
  emits: {
    ...toastCloseProps.emits,
  },
}

// ToastAction.propTypes = {
//   altText(props) {
//     if (!props.altText) {
//       return new Error(`Missing prop \`altText\` expected on \`${ACTION_NAME}\``);
//     }
//     return null;
//   },
// };

/* -------------------------------------------------------------------------------------------------
 * ToastAnnounceExclude
 * ----------------------------------------------------------------------------------------------- */

export type ToastAnnounceExcludeNativeElement = OkuElement<'div'>
export type ToastAnnounceExcludeElement = HTMLDivElement

export interface ToastAnnounceExcludeProps extends PrimitiveProps {
  altText?: string
}

export const toastAnnounceExcludeProps = {
  props: {
    altText: {
      type: String as PropType<ToastAnnounceExcludeProps['altText']>,
      required: false,
    },
    ...primitiveProps,
  },
  emits: { },
}
