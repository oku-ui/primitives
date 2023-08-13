import { createToastContext } from './toast-provider'

// type SwipeEvent = { currentTarget: EventTarget & ToastElement } & Omit<
//   CustomEvent<{ originalEvent: React.PointerEvent; delta: { x: number; y: number } }>,
//   'currentTarget'
// >;

const [ToastInteractiveProvider, useToastInteractiveContext] = createToastContext(TOAST_NAME, {
  onClose() {},
})

// type ToastImplElement = React.ElementRef<typeof Primitive.li>;
// type DismissableLayerProps = Radix.ComponentPropsWithoutRef<typeof DismissableLayer.Root>;
// type ToastImplPrivateProps = { open: boolean; onClose(): void };
// type PrimitiveListItemProps = Radix.ComponentPropsWithoutRef<typeof Primitive.li>;
// interface ToastImplProps extends ToastImplPrivateProps, PrimitiveListItemProps {
//   type?: 'foreground' | 'background';
//   /**
//    * Time in milliseconds that toast should remain visible for. Overrides value
//    * given to `ToastProvider`.
//    */
//   duration?: number;
//   onEscapeKeyDown?: DismissableLayerProps['onEscapeKeyDown'];
//   onPause?(): void;
//   onResume?(): void;
//   onSwipeStart?(event: SwipeEvent): void;
//   onSwipeMove?(event: SwipeEvent): void;
//   onSwipeCancel?(event: SwipeEvent): void;
//   onSwipeEnd?(event: SwipeEvent): void;
// }

// const ToastImpl = React.forwardRef<ToastImplElement, ToastImplProps>(
//   (props: ScopedProps<ToastImplProps>, forwardedRef) => {
//     const {
//       __scopeToast,
//       type = 'foreground',
//       duration: durationProp,
//       open,
//       onClose,
//       onEscapeKeyDown,
//       onPause,
//       onResume,
//       onSwipeStart,
//       onSwipeMove,
//       onSwipeCancel,
//       onSwipeEnd,
//       ...toastProps
//     } = props;
//     const context = useToastProviderContext(TOAST_NAME, __scopeToast);
//     const [node, setNode] = React.useState<ToastImplElement | null>(null);
//     const composedRefs = useComposedRefs(forwardedRef, (node) => setNode(node));
//     const pointerStartRef = React.useRef<{ x: number; y: number } | null>(null);
//     const swipeDeltaRef = React.useRef<{ x: number; y: number } | null>(null);
//     const duration = durationProp || context.duration;
//     const closeTimerStartTimeRef = React.useRef(0);
//     const closeTimerRemainingTimeRef = React.useRef(duration);
//     const closeTimerRef = React.useRef(0);
//     const { onToastAdd, onToastRemove } = context;
//     const handleClose = useCallbackRef(() => {
//       // focus viewport if focus is within toast to read the remaining toast
//       // count to SR users and ensure focus isn't lost
//       const isFocusInToast = node?.contains(document.activeElement);
//       if (isFocusInToast) context.viewport?.focus();
//       onClose();
//     });

//     const startTimer = React.useCallback(
//       (duration: number) => {
//         if (!duration || duration === Infinity) return;
//         window.clearTimeout(closeTimerRef.current);
//         closeTimerStartTimeRef.current = new Date().getTime();
//         closeTimerRef.current = window.setTimeout(handleClose, duration);
//       },
//       [handleClose]
//     );

//     React.useEffect(() => {
//       const viewport = context.viewport;
//       if (viewport) {
//         const handleResume = () => {
//           startTimer(closeTimerRemainingTimeRef.current);
//           onResume?.();
//         };
//         const handlePause = () => {
//           const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.current;
//           closeTimerRemainingTimeRef.current = closeTimerRemainingTimeRef.current - elapsedTime;
//           window.clearTimeout(closeTimerRef.current);
//           onPause?.();
//         };
//         viewport.addEventListener(VIEWPORT_PAUSE, handlePause);
//         viewport.addEventListener(VIEWPORT_RESUME, handleResume);
//         return () => {
//           viewport.removeEventListener(VIEWPORT_PAUSE, handlePause);
//           viewport.removeEventListener(VIEWPORT_RESUME, handleResume);
//         };
//       }
//     }, [context.viewport, duration, onPause, onResume, startTimer]);

//     // start timer when toast opens or duration changes.
//     // we include `open` in deps because closed !== unmounted when animating
//     // so it could reopen before being completely unmounted
//     React.useEffect(() => {
//       if (open && !context.isClosePausedRef.current) startTimer(duration);
//     }, [open, duration, context.isClosePausedRef, startTimer]);

//     React.useEffect(() => {
//       onToastAdd();
//       return () => onToastRemove();
//     }, [onToastAdd, onToastRemove]);

//     const announceTextContent = React.useMemo(() => {
//       return node ? getAnnounceTextContent(node) : null;
//     }, [node]);

//     if (!context.viewport) return null;

//     return (
//       <>
//         {announceTextContent && (
//           <ToastAnnounce
//             __scopeToast={__scopeToast}
//             // Toasts are always role=status to avoid stuttering issues with role=alert in SRs.
//             role="status"
//             aria-live={type === 'foreground' ? 'assertive' : 'polite'}
//             aria-atomic
//           >
//             {announceTextContent}
//           </ToastAnnounce>
//         )}

//         <ToastInteractiveProvider scope={__scopeToast} onClose={handleClose}>
//           {ReactDOM.createPortal(
//             <Collection.ItemSlot scope={__scopeToast}>
//               <DismissableLayer.Root
//                 asChild
//                 onEscapeKeyDown={composeEventHandlers(onEscapeKeyDown, () => {
//                   if (!context.isFocusedToastEscapeKeyDownRef.current) handleClose();
//                   context.isFocusedToastEscapeKeyDownRef.current = false;
//                 })}
//               >
//                 <Primitive.li
//                   // Ensure toasts are announced as status list or status when focused
//                   role="status"
//                   aria-live="off"
//                   aria-atomic
//                   tabIndex={0}
//                   data-state={open ? 'open' : 'closed'}
//                   data-swipe-direction={context.swipeDirection}
//                   {...toastProps}
//                   ref={composedRefs}
//                   style={{ userSelect: 'none', touchAction: 'none', ...props.style }}
//                   onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
//                     if (event.key !== 'Escape') return;
//                     onEscapeKeyDown?.(event.nativeEvent);
//                     if (!event.nativeEvent.defaultPrevented) {
//                       context.isFocusedToastEscapeKeyDownRef.current = true;
//                       handleClose();
//                     }
//                   })}
//                   onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
//                     if (event.button !== 0) return;
//                     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//                   })}
//                   onPointerMove={composeEventHandlers(props.onPointerMove, (event) => {
//                     if (!pointerStartRef.current) return;
//                     const x = event.clientX - pointerStartRef.current.x;
//                     const y = event.clientY - pointerStartRef.current.y;
//                     const hasSwipeMoveStarted = Boolean(swipeDeltaRef.current);
//                     const isHorizontalSwipe = ['left', 'right'].includes(context.swipeDirection);
//                     const clamp = ['left', 'up'].includes(context.swipeDirection)
//                       ? Math.min
//                       : Math.max;
//                     const clampedX = isHorizontalSwipe ? clamp(0, x) : 0;
//                     const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0;
//                     const moveStartBuffer = event.pointerType === 'touch' ? 10 : 2;
//                     const delta = { x: clampedX, y: clampedY };
//                     const eventDetail = { originalEvent: event, delta };
//                     if (hasSwipeMoveStarted) {
//                       swipeDeltaRef.current = delta;
//                       handleAndDispatchCustomEvent(TOAST_SWIPE_MOVE, onSwipeMove, eventDetail, {
//                         discrete: false,
//                       });
//                     } else if (isDeltaInDirection(delta, context.swipeDirection, moveStartBuffer)) {
//                       swipeDeltaRef.current = delta;
//                       handleAndDispatchCustomEvent(TOAST_SWIPE_START, onSwipeStart, eventDetail, {
//                         discrete: false,
//                       });
//                       (event.target as HTMLElement).setPointerCapture(event.pointerId);
//                     } else if (Math.abs(x) > moveStartBuffer || Math.abs(y) > moveStartBuffer) {
//                       // User is swiping in wrong direction so we disable swipe gesture
//                       // for the current pointer down interaction
//                       pointerStartRef.current = null;
//                     }
//                   })}
//                   onPointerUp={composeEventHandlers(props.onPointerUp, (event) => {
//                     const delta = swipeDeltaRef.current;
//                     const target = event.target as HTMLElement;
//                     if (target.hasPointerCapture(event.pointerId)) {
//                       target.releasePointerCapture(event.pointerId);
//                     }
//                     swipeDeltaRef.current = null;
//                     pointerStartRef.current = null;
//                     if (delta) {
//                       const toast = event.currentTarget;
//                       const eventDetail = { originalEvent: event, delta };
//                       if (
//                         isDeltaInDirection(delta, context.swipeDirection, context.swipeThreshold)
//                       ) {
//                         handleAndDispatchCustomEvent(TOAST_SWIPE_END, onSwipeEnd, eventDetail, {
//                           discrete: true,
//                         });
//                       } else {
//                         handleAndDispatchCustomEvent(
//                           TOAST_SWIPE_CANCEL,
//                           onSwipeCancel,
//                           eventDetail,
//                           {
//                             discrete: true,
//                           }
//                         );
//                       }
//                       // Prevent click event from triggering on items within the toast when
//                       // pointer up is part of a swipe gesture
//                       toast.addEventListener('click', (event) => event.preventDefault(), {
//                         once: true,
//                       });
//                     }
//                   })}
//                 />
//               </DismissableLayer.Root>
//             </Collection.ItemSlot>,
//             context.viewport
//           )}
//         </ToastInteractiveProvider>
//       </>
//     );
//   }
// );

// ToastImpl.propTypes = {
//   type(props) {
//     if (props.type && !['foreground', 'background'].includes(props.type)) {
//       const error = `Invalid prop \`type\` supplied to \`${TOAST_NAME}\`. Expected \`foreground | background\`.`;
//       return new Error(error);
//     }
//     return null;
//   },
// };

// type _ToastProvider = MergeProps<ToastProviderProps, ToastProviderElement>
// type InstanceToastProviderType = InstanceTypeRef<typeof ToastProvider, _ToastProviderEl>

// const OkuToastProvider = ToastProvider as typeof ToastProvider & (new () => { $props: _ToastProvider })

// export { OkuToastProvider, useToastProviderContext, createToastScope, createToastContext, useCollection }

// export type { ToastProviderProps, InstanceToastProviderType }

export { useToastInteractiveContext }
