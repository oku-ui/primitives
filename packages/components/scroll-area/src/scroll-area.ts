/// <reference types="resize-observer-browser" />

// import { useLayoutEffect } from '@Oku-ui/use-layout-effect';
// import { composeEventHandlers } from '@Oku-ui/primitive';

// import type {
//   ElementType,
// } from '@oku-ui/primitive'

// import { useDirection } from '@Oku-ui/dirction'

export type Direction = 'ltr' | 'rtl'
export type Sizes = {
  content: number
  viewport: number
  scrollbar: {
    size: number
    paddingStart: number
    paddingEnd: number
  }
}

/* -------------------------------------------------------------------------------------------------
 * ScrollArea
 * ----------------------------------------------------------------------------------------------- */

// const SCROLL_AREA_NAME = 'ScrollArea'

// type ScrollAreaElement = ElementType<'div'>
// export type _ScrollAreaEl = HTMLDivElement

// type ScopedProps<P> = P & { __scopeScrollArea?: Scope }
// const [createScrollAreaContext, createScrollAreaScope] = createProvideScope(SCROLL_AREA_NAME)

// type ScrollAreaContextValue = {
//   type: 'auto' | 'always' | 'scroll' | 'hover'
//   dir: Direction
//   scrollHideDelay: number
//   scrollArea: ScrollAreaElement | null
//   viewport: ScrollAreaViewportElement | null
//   onViewportChange(viewport: ScrollAreaViewportElement | null): void
//   content: HTMLDivElement | null
//   onContentChange(content: HTMLDivElement): void
//   scrollbarX: ScrollAreaScrollbarElement | null
//   onScrollbarXChange(scrollbar: ScrollAreaScrollbarElement | null): void
//   scrollbarXEnabled: boolean
//   onScrollbarXEnabledChange(rendered: boolean): void
//   scrollbarY: ScrollAreaScrollbarElement | null
//   onScrollbarYChange(scrollbar: ScrollAreaScrollbarElement | null): void
//   scrollbarYEnabled: boolean
//   onScrollbarYEnabledChange(rendered: boolean): void
//   onCornerWidthChange(width: number): void
//   onCornerHeightChange(height: number): void
// }

// const [ScrollAreaProvider, useScrollAreaContext]
//   = createScrollAreaContext<ScrollAreaContextValue>(SCROLL_AREA_NAME)

// interface ScrollAreaProps extends PrimitiveProps {
// interface ScrollAreaProps extends useScrollAreaContext {
//   type?: ScrollAreaContextValue['type']
//   dir?: ScrollAreaContextValue['dir']
//   scrollHideDelay?: number
// }

// const ScrollArea = defineComponent({
//   name: SCROLL_AREA_NAME,
//   inheritAttrs: false,
//   props: {
//     type: {
//       type: String as PropType<ScrollAreaProps['type']>,
//       required: false,
//     },
//     dir: {
//       type: String as PropType<ScrollAreaProps['dir']>,
//       required: false,
//     },
//     scrollHideDelay: {
//       type: Number,
//       required: false,
//     },
//     asChild: {
//       type: Boolean,
//       default: undefined,
//     },
//   },
//   setup(props, { slots, attrs }) {
//     const { ...ScrollAreaProps } = attrs as ScrollAreaElement

//     const {
//       type = 'hover',
//       dir,
//       scrollHideDelay = 600,
//       ...scrollAreaProps
//     } = toRefs(props)

//     const scrollArea = ref<ScrollAreaElement | null>(null)
//     const viewport = ref<ScrollAreaViewportElement | null>(null)
//     const content = ref<HTMLDivElement | null>(null)
//     const scrollbarX = ref<ScrollAreaScrollbarElement | null>(null)
//     const scrollbarY = ref<ScrollAreaScrollbarElement | null>(null)
//     const cornerWidth = ref(0)
//     const cornerHeight = ref(0)
//     const scrollbarXEnabled = ref(false)
//     const scrollbarYEnabled = ref(false)
//     const forwardedRef = useForwardRef()
// const composedRefs = useComposedRefs(forwardedRef, (node) => {
//   if (node instanceof HTMLElement)
//     scrollArea.value = node
// })

// const direction = useDirection(props.dir)

// const originalReturn = () => h(Primitive.div, {
// ref: composedRefs,
// ...ScrollAreaProps,
// asChild: asChild.value,
// }, {
// default: () => slots.default?.(),
// })
//
// return originalReturn
// },
// })

//     return (
//       <ScrollAreaProvider
//         scope={__scopeScrollArea}
//         type={type}
//         dir={direction}
//         scrollHideDelay={scrollHideDelay}
//         scrollArea={scrollArea}
//         viewport={viewport}
//         onViewportChange={setViewport}
//         content={content}
//         onContentChange={setContent}
//         scrollbarX={scrollbarX}
//         onScrollbarXChange={setScrollbarX}
//         scrollbarXEnabled={scrollbarXEnabled}
//         onScrollbarXEnabledChange={setScrollbarXEnabled}
//         scrollbarY={scrollbarY}
//         onScrollbarYChange={setScrollbarY}
//         scrollbarYEnabled={scrollbarYEnabled}
//         onScrollbarYEnabledChange={setScrollbarYEnabled}
//         onCornerWidthChange={setCornerWidth}
//         onCornerHeightChange={setCornerHeight}
//       >
//         <Primitive.div
//           dir={direction}
//           {...scrollAreaProps}
//           ref={composedRefs}
//           style={{
//             position: 'relative',
//             // Pass corner sizes as CSS vars to reduce re-renders of context consumers
//             ['--@Oku-scroll-area-corner-width' as any]: cornerWidth + 'px',
//             ['--@Oku-scroll-area-corner-height' as any]: cornerHeight + 'px',
//             ...props.style,
//           }}
//         />
//       </ScrollAreaProvider>
//     );
//   }
// );

// // ScrollArea.displayName = SCROLL_AREA_NAME;

// /* -----------------------------------------------------------------------------------------------*/

// type ScrollAreaScrollbarHoverElement = ScrollAreaScrollbarAutoElement;
// interface ScrollAreaScrollbarHoverProps extends ScrollAreaScrollbarAutoProps {
//   forceMount?: true;
// }

// const ScrollAreaScrollbarHover = React.forwardRef<
//   ScrollAreaScrollbarHoverElement,
//   ScrollAreaScrollbarHoverProps
// >((props: ScopedProps<ScrollAreaScrollbarHoverProps>, forwardedRef) => {
//   const { forceMount, ...scrollbarProps } = props;
//   const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
//   const [visible, setVisible] = React.useState(false);

//   React.useEffect(() => {
//     const scrollArea = context.scrollArea;
//     let hideTimer = 0;
//     if (scrollArea) {
//       const handlePointerEnter = () => {
//         window.clearTimeout(hideTimer);
//         setVisible(true);
//       };
//       const handlePointerLeave = () => {
//         hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
//       };
//       scrollArea.addEventListener('pointerenter', handlePointerEnter);
//       scrollArea.addEventListener('pointerleave', handlePointerLeave);
//       return () => {
//         window.clearTimeout(hideTimer);
//         scrollArea.removeEventListener('pointerenter', handlePointerEnter);
//         scrollArea.removeEventListener('pointerleave', handlePointerLeave);
//       };
//     }
//   }, [context.scrollArea, context.scrollHideDelay]);

//   return (
//     <Presence present={forceMount || visible}>
//       <ScrollAreaScrollbarAuto
//         data-state={visible ? 'visible' : 'hidden'}
//         {...scrollbarProps}
//         ref={forwardedRef}
//       />
//     </Presence>
//   );
// });

// type ScrollAreaScrollbarScrollElement = ScrollAreaScrollbarVisibleElement;
// interface ScrollAreaScrollbarScrollProps extends ScrollAreaScrollbarVisibleProps {
//   forceMount?: true;
// }

// const ScrollAreaScrollbarScroll = React.forwardRef<
//   ScrollAreaScrollbarScrollElement,
//   ScrollAreaScrollbarScrollProps
// >((props: ScopedProps<ScrollAreaScrollbarScrollProps>, forwardedRef) => {
//   const { forceMount, ...scrollbarProps } = props;
//   const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
//   const isHorizontal = props.orientation === 'horizontal';
//   const debounceScrollEnd = useDebounceCallback(() => send('SCROLL_END'), 100);
//   const [state, send] = useStateMachine('hidden', {
//     hidden: {
//       SCROLL: 'scrolling',
//     },
//     scrolling: {
//       SCROLL_END: 'idle',
//       POINTER_ENTER: 'interacting',
//     },
//     interacting: {
//       SCROLL: 'interacting',
//       POINTER_LEAVE: 'idle',
//     },
//     idle: {
//       HIDE: 'hidden',
//       SCROLL: 'scrolling',
//       POINTER_ENTER: 'interacting',
//     },
//   });

//   React.useEffect(() => {
//     if (state === 'idle') {
//       const hideTimer = window.setTimeout(() => send('HIDE'), context.scrollHideDelay);
//       return () => window.clearTimeout(hideTimer);
//     }
//   }, [state, context.scrollHideDelay, send]);

//   React.useEffect(() => {
//     const viewport = context.viewport;
//     const scrollDirection = isHorizontal ? 'scrollLeft' : 'scrollTop';

//     if (viewport) {
//       let prevScrollPos = viewport[scrollDirection];
//       const handleScroll = () => {
//         const scrollPos = viewport[scrollDirection];
//         const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
//         if (hasScrollInDirectionChanged) {
//           send('SCROLL');
//           debounceScrollEnd();
//         }
//         prevScrollPos = scrollPos;
//       };
//       viewport.addEventListener('scroll', handleScroll);
//       return () => viewport.removeEventListener('scroll', handleScroll);
//     }
//   }, [context.viewport, isHorizontal, send, debounceScrollEnd]);

//   return (
//     <Presence present={forceMount || state !== 'hidden'}>
//       <ScrollAreaScrollbarVisible
//         data-state={state === 'hidden' ? 'hidden' : 'visible'}
//         {...scrollbarProps}
//         ref={forwardedRef}
//         onPointerEnter={composeEventHandlers(props.onPointerEnter, () => send('POINTER_ENTER'))}
//         onPointerLeave={composeEventHandlers(props.onPointerLeave, () => send('POINTER_LEAVE'))}
//       />
//     </Presence>
//   );
// });

// type ScrollAreaScrollbarAutoElement = ScrollAreaScrollbarVisibleElement;
// interface ScrollAreaScrollbarAutoProps extends ScrollAreaScrollbarVisibleProps {
//   forceMount?: true;
// }

// const ScrollAreaScrollbarAuto = React.forwardRef<
//   ScrollAreaScrollbarAutoElement,
//   ScrollAreaScrollbarAutoProps
// >((props: ScopedProps<ScrollAreaScrollbarAutoProps>, forwardedRef) => {
//   const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
//   const { forceMount, ...scrollbarProps } = props;
//   const [visible, setVisible] = React.useState(false);
//   const isHorizontal = props.orientation === 'horizontal';
//   const handleResize = useDebounceCallback(() => {
//     if (context.viewport) {
//       const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
//       const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
//       setVisible(isHorizontal ? isOverflowX : isOverflowY);
//     }
//   }, 10);

//   useResizeObserver(context.viewport, handleResize);
//   useResizeObserver(context.content, handleResize);

//   return (
//     <Presence present={forceMount || visible}>
//       <ScrollAreaScrollbarVisible
//         data-state={visible ? 'visible' : 'hidden'}
//         {...scrollbarProps}
//         ref={forwardedRef}
//       />
//     </Presence>
//   );
// });

/* ----------------------------------------------------------------------------------------------- */

// type ScrollAreaScrollbarVisibleElement = ScrollAreaScrollbarAxisElement;
// interface ScrollAreaScrollbarVisibleProps
//   extends Omit<ScrollAreaScrollbarAxisProps, keyof ScrollAreaScrollbarAxisPrivateProps> {
//   orientation?: 'horizontal' | 'vertical';
// }

// const ScrollAreaScrollbarVisible = React.forwardRef<
//   ScrollAreaScrollbarVisibleElement,
//   ScrollAreaScrollbarVisibleProps
// >((props: ScopedProps<ScrollAreaScrollbarVisibleProps>, forwardedRef) => {
//   const { orientation = 'vertical', ...scrollbarProps } = props;
//   const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
//   const thumbRef = React.useRef<ScrollAreaThumbElement | null>(null);
//   const pointerOffsetRef = React.useRef(0);
//   const [sizes, setSizes] = React.useState<Sizes>({
//     content: 0,
//     viewport: 0,
//     scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
//   });
//   const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);

//   type UncommonProps = 'onThumbPositionChange' | 'onDragScroll' | 'onWheelScroll';
//   const commonProps: Omit<ScrollAreaScrollbarAxisPrivateProps, UncommonProps> = {
//     ...scrollbarProps,
//     sizes,
//     onSizesChange: setSizes,
//     hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
//     onThumbChange: (thumb) => (thumbRef.current = thumb),
//     onThumbPointerUp: () => (pointerOffsetRef.current = 0),
//     onThumbPointerDown: (pointerPos) => (pointerOffsetRef.current = pointerPos),
//   };

//   function getScrollPosition(pointerPos: number, dir?: Direction) {
//     return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
//   }

//   if (orientation === 'horizontal') {
//     return (
//       <ScrollAreaScrollbarX
//         {...commonProps}
//         ref={forwardedRef}
//         onThumbPositionChange={() => {
//           if (context.viewport && thumbRef.current) {
//             const scrollPos = context.viewport.scrollLeft;
//             const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
//             thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
//           }
//         }}
//         onWheelScroll={(scrollPos) => {
//           if (context.viewport) context.viewport.scrollLeft = scrollPos;
//         }}
//         onDragScroll={(pointerPos) => {
//           if (context.viewport) {
//             context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
//           }
//         }}
//       />
//     );
//   }

//   if (orientation === 'vertical') {
//     return (
//       <ScrollAreaScrollbarY
//         {...commonProps}
//         ref={forwardedRef}
//         onThumbPositionChange={() => {
//           if (context.viewport && thumbRef.current) {
//             const scrollPos = context.viewport.scrollTop;
//             const offset = getThumbOffsetFromScroll(scrollPos, sizes);
//             thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
//           }
//         }}
//         onWheelScroll={(scrollPos) => {
//           if (context.viewport) context.viewport.scrollTop = scrollPos;
//         }}
//         onDragScroll={(pointerPos) => {
//           if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
//         }}
//       />
//     );
//   }

//   return null;
// });

/* ----------------------------------------------------------------------------------------------- */

// type ScrollAreaScrollbarAxisPrivateProps = {
//   hasThumb: boolean;
//   sizes: Sizes;
//   onSizesChange(sizes: Sizes): void;
//   onThumbChange(thumb: ScrollAreaThumbElement | null): void;
//   onThumbPointerDown(pointerPos: number): void;
//   onThumbPointerUp(): void;
//   onThumbPositionChange(): void;
//   onWheelScroll(scrollPos: number): void;
//   onDragScroll(pointerPos: number): void;
// };

// type ScrollAreaScrollbarAxisElement = ScrollAreaScrollbarImplElement;
// interface ScrollAreaScrollbarAxisProps
//   extends Omit<ScrollAreaScrollbarImplProps, keyof ScrollAreaScrollbarImplPrivateProps>,
//     ScrollAreaScrollbarAxisPrivateProps {}

// const ScrollAreaScrollbarX = React.forwardRef<
//   ScrollAreaScrollbarAxisElement,
//   ScrollAreaScrollbarAxisProps
// >((props: ScopedProps<ScrollAreaScrollbarAxisProps>, forwardedRef) => {
//   const { sizes, onSizesChange, ...scrollbarProps } = props;
//   const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
//   const [computedStyle, setComputedStyle] = React.useState<CSSStyleDeclaration>();
//   const ref = React.useRef<ScrollAreaScrollbarAxisElement>(null);
//   const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);

//   React.useEffect(() => {
//     if (ref.current) setComputedStyle(getComputedStyle(ref.current));
//   }, [ref]);

//   return (
//     <ScrollAreaScrollbarImpl
//       data-orientation="horizontal"
//       {...scrollbarProps}
//       ref={composeRefs}
//       sizes={sizes}
//       style={{
//         bottom: 0,
//         left: context.dir === 'rtl' ? 'var(--@Oku-scroll-area-corner-width)' : 0,
//         right: context.dir === 'ltr' ? 'var(--@Oku-scroll-area-corner-width)' : 0,
//         ['--@Oku-scroll-area-thumb-width' as any]: getThumbSize(sizes) + 'px',
//         ...props.style,
//       }}
//       onThumbPointerDown={(pointerPos) => props.onThumbPointerDown(pointerPos.x)}
//       onDragScroll={(pointerPos) => props.onDragScroll(pointerPos.x)}
//       onWheelScroll={(event, maxScrollPos) => {
//         if (context.viewport) {
//           const scrollPos = context.viewport.scrollLeft + event.deltaX;
//           props.onWheelScroll(scrollPos);
//           // prevent window scroll when wheeling on scrollbar
//           if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
//             event.preventDefault();
//           }
//         }
//       }}
//       onResize={() => {
//         if (ref.current && context.viewport && computedStyle) {
//           onSizesChange({
//             content: context.viewport.scrollWidth,
//             viewport: context.viewport.offsetWidth,
//             scrollbar: {
//               size: ref.current.clientWidth,
//               paddingStart: toInt(computedStyle.paddingLeft),
//               paddingEnd: toInt(computedStyle.paddingRight),
//             },
//           });
//         }
//       }}
//     />
//   );
// });

// const ScrollAreaScrollbarY = React.forwardRef<
//   ScrollAreaScrollbarAxisElement,
//   ScrollAreaScrollbarAxisProps
// >((props: ScopedProps<ScrollAreaScrollbarAxisProps>, forwardedRef) => {
//   const { sizes, onSizesChange, ...scrollbarProps } = props;
//   const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
//   const [computedStyle, setComputedStyle] = React.useState<CSSStyleDeclaration>();
//   const ref = React.useRef<ScrollAreaScrollbarAxisElement>(null);
//   const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);

//   React.useEffect(() => {
//     if (ref.current) setComputedStyle(getComputedStyle(ref.current));
//   }, [ref]);

//   return (
//     <ScrollAreaScrollbarImpl
//       data-orientation="vertical"
//       {...scrollbarProps}
//       ref={composeRefs}
//       sizes={sizes}
//       style={{
//         top: 0,
//         right: context.dir === 'ltr' ? 0 : undefined,
//         left: context.dir === 'rtl' ? 0 : undefined,
//         bottom: 'var(--@Oku-scroll-area-corner-height)',
//         ['--@Oku-scroll-area-thumb-height' as any]: getThumbSize(sizes) + 'px',
//         ...props.style,
//       }}
//       onThumbPointerDown={(pointerPos) => props.onThumbPointerDown(pointerPos.y)}
//       onDragScroll={(pointerPos) => props.onDragScroll(pointerPos.y)}
//       onWheelScroll={(event, maxScrollPos) => {
//         if (context.viewport) {
//           const scrollPos = context.viewport.scrollTop + event.deltaY;
//           props.onWheelScroll(scrollPos);
//           // prevent window scroll when wheeling on scrollbar
//           if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
//             event.preventDefault();
//           }
//         }
//       }}
//       onResize={() => {
//         if (ref.current && context.viewport && computedStyle) {
//           onSizesChange({
//             content: context.viewport.scrollHeight,
//             viewport: context.viewport.offsetHeight,
//             scrollbar: {
//               size: ref.current.clientHeight,
//               paddingStart: toInt(computedStyle.paddingTop),
//               paddingEnd: toInt(computedStyle.paddingBottom),
//             },
//           });
//         }
//       }}
//     />
//   );
// });

/* ----------------------------------------------------------------------------------------------- */

// type ScrollbarContext = {
//   hasThumb: boolean;
//   scrollbar: ScrollAreaScrollbarElement | null;
//   onThumbChange(thumb: ScrollAreaThumbElement | null): void;
//   onThumbPointerUp(): void;
//   onThumbPointerDown(pointerPos: { x: number; y: number }): void;
//   onThumbPositionChange(): void;
// };

// const [ScrollbarProvider, useScrollbarContext] =
//   createScrollAreaContext<ScrollbarContext>(SCROLLBAR_NAME);

// type ScrollAreaScrollbarImplElement = React.ElementRef<typeof Primitive.div>;
// type ScrollAreaScrollbarImplPrivateProps = {
//   sizes: Sizes;
//   hasThumb: boolean;
//   onThumbChange: ScrollbarContext['onThumbChange'];
//   onThumbPointerUp: ScrollbarContext['onThumbPointerUp'];
//   onThumbPointerDown: ScrollbarContext['onThumbPointerDown'];
//   onThumbPositionChange: ScrollbarContext['onThumbPositionChange'];
//   onWheelScroll(event: WheelEvent, maxScrollPos: number): void;
//   onDragScroll(pointerPos: { x: number; y: number }): void;
//   onResize(): void;
// };
// interface ScrollAreaScrollbarImplProps
//   extends PrimitiveDivProps,
//     ScrollAreaScrollbarImplPrivateProps {}

// const ScrollAreaScrollbarImpl = React.forwardRef<
//   ScrollAreaScrollbarImplElement,
//   ScrollAreaScrollbarImplProps
// >((props: ScopedProps<ScrollAreaScrollbarImplProps>, forwardedRef) => {
//   const {
//     __scopeScrollArea,
//     sizes,
//     hasThumb,
//     onThumbChange,
//     onThumbPointerUp,
//     onThumbPointerDown,
//     onThumbPositionChange,
//     onDragScroll,
//     onWheelScroll,
//     onResize,
//     ...scrollbarProps
//   } = props;
//   const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
//   const [scrollbar, setScrollbar] = React.useState<ScrollAreaScrollbarElement | null>(null);
//   const composeRefs = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
//   const rectRef = React.useRef<ClientRect | null>(null);
//   const prevWebkitUserSelectRef = React.useRef<string>('');
//   const viewport = context.viewport;
//   const maxScrollPos = sizes.content - sizes.viewport;
//   const handleWheelScroll = useCallbackRef(onWheelScroll);
//   const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
//   const handleResize = useDebounceCallback(onResize, 10);

//   function handleDragScroll(event: React.PointerEvent<HTMLElement>) {
//     if (rectRef.current) {
//       const x = event.clientX - rectRef.current.left;
//       const y = event.clientY - rectRef.current.top;
//       onDragScroll({ x, y });
//     }
//   }

//   /**
//    * We bind wheel event imperatively so we can switch off passive
//    * mode for document wheel event to allow it to be prevented
//    */
//   React.useEffect(() => {
//     const handleWheel = (event: WheelEvent) => {
//       const element = event.target as HTMLElement;
//       const isScrollbarWheel = scrollbar?.contains(element);
//       if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
//     };
//     document.addEventListener('wheel', handleWheel, { passive: false });
//     return () => document.removeEventListener('wheel', handleWheel, { passive: false } as any);
//   }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);

//   /**
//    * Update thumb position on sizes change
//    */
//   React.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);

//   useResizeObserver(scrollbar, handleResize);
//   useResizeObserver(context.content, handleResize);

//   return (
//     <ScrollbarProvider
//       scope={__scopeScrollArea}
//       scrollbar={scrollbar}
//       hasThumb={hasThumb}
//       onThumbChange={useCallbackRef(onThumbChange)}
//       onThumbPointerUp={useCallbackRef(onThumbPointerUp)}
//       onThumbPositionChange={handleThumbPositionChange}
//       onThumbPointerDown={useCallbackRef(onThumbPointerDown)}
//     >
//       <Primitive.div
//         {...scrollbarProps}
//         ref={composeRefs}
//         style={{ position: 'absolute', ...scrollbarProps.style }}
//         onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
//           const mainPointer = 0;
//           if (event.button === mainPointer) {
//             const element = event.target as HTMLElement;
//             element.setPointerCapture(event.pointerId);
//             rectRef.current = scrollbar!.getBoundingClientRect();
//             // pointer capture doesn't prevent text selection in Safari
//             // so we remove text selection manually when scrolling
//             prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
//             document.body.style.webkitUserSelect = 'none';
//             if (context.viewport) context.viewport.style.scrollBehavior = 'auto';
//             handleDragScroll(event);
//           }
//         })}
//         onPointerMove={composeEventHandlers(props.onPointerMove, handleDragScroll)}
//         onPointerUp={composeEventHandlers(props.onPointerUp, (event) => {
//           const element = event.target as HTMLElement;
//           if (element.hasPointerCapture(event.pointerId)) {
//             element.releasePointerCapture(event.pointerId);
//           }
//           document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
//           if (context.viewport) context.viewport.style.scrollBehavior = '';
//           rectRef.current = null;
//         })}
//       />
//     </ScrollbarProvider>
//   );
// });

/* ----------------------------------------------------------------------------------------------- */

// const Root = ScrollArea;
// const Viewport = ScrollAreaViewport;
// const Scrollbar = ScrollAreaScrollbar;
// const Thumb = ScrollAreaThumb;
// const Corner = ScrollAreaCorner;

// export {
//   createScrollAreaScope,
//   //
//   ScrollArea,
//   ScrollAreaViewport,
//   ScrollAreaScrollbar,
//   ScrollAreaThumb,
//   ScrollAreaCorner,
//   //
//   Root,
//   Viewport,
//   Scrollbar,
//   Thumb,
//   Corner,
// };
// export type {
//   ScrollAreaProps,
//   ScrollAreaViewportProps,
//   ScrollAreaScrollbarProps,
//   ScrollAreaThumbProps,
//   ScrollAreaCornerProps,
// };

// type _ScrollAreaProps = MergeProps<ScrollAreaProps, ScrollAreaElement>
// type InstanceScrollAreaType = InstanceTypeRef<typeof ScrollArea, _ScrollAreaEl>

// const OkuScrollArea = ScrollArea as typeof ScrollArea & (new () => { $props: _ScrollAreaProps })

// export { OkuScrollArea }
// export type { ScrollAreaProps, ScrollAreaElement, InstanceScrollAreaType }
