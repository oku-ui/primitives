/* -------------------------------------------------------------------------------------------------
 * ScrollAreaThumb
 * ----------------------------------------------------------------------------------------------- */

// import { useComposedRefs } from "@Oku-ui/use-composable";
// import { addUnlinkedScrollListener, useDebounceCallback } from "./utils";

// const THUMB_NAME = 'ScrollAreaThumb';

// type ScrollAreaThumbElement = ScrollAreaThumbImplElement;
// interface ScrollAreaThumbProps extends ScrollAreaThumbImplProps {
//   /**
//    * Used to force mounting when more control is needed. Useful when
//    * controlling animation with React animation libraries.
//    */
//   forceMount?: true;
// }

// const ScrollAreaThumb = React.forwardRef<ScrollAreaThumbElement, ScrollAreaThumbProps>(
//   (props: ScopedProps<ScrollAreaThumbProps>, forwardedRef) => {
//     const { forceMount, ...thumbProps } = props;
//     const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
//     return (
//       <Presence present={forceMount || scrollbarContext.hasThumb}>
//         <ScrollAreaThumbImpl ref={forwardedRef} {...thumbProps} />
//       </Presence>
//     );
//   }
// );

// type ScrollAreaThumbImplElement = React.ElementRef<typeof Primitive.div>;
// interface ScrollAreaThumbImplProps extends PrimitiveDivProps {}

// const ScrollAreaThumbImpl = React.forwardRef<ScrollAreaThumbImplElement, ScrollAreaThumbImplProps>(
//   (props: ScopedProps<ScrollAreaThumbImplProps>, forwardedRef) => {
//     const { __scopeScrollArea, style, ...thumbProps } = props;
//     const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
//     const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
//     const { onThumbPositionChange } = scrollbarContext;
//     const composedRef = useComposedRefs(forwardedRef, (node) =>
//       scrollbarContext.onThumbChange(node)
//     );
//     const removeUnlinkedScrollListenerRef = React.useRef<() => void>();
//     const debounceScrollEnd = useDebounceCallback(() => {
//       if (removeUnlinkedScrollListenerRef.current) {
//         removeUnlinkedScrollListenerRef.current();
//         removeUnlinkedScrollListenerRef.current = undefined;
//       }
//     }, 100);

//     React.useEffect(() => {
//       const viewport = scrollAreaContext.viewport;
//       if (viewport) {
//         /**
//          * We only bind to native scroll event so we know when scroll starts and ends.
//          * When scroll starts we start a requestAnimationFrame loop that checks for
//          * changes to scroll position. That rAF loop triggers our thumb position change
//          * when relevant to avoid scroll-linked effects. We cancel the loop when scroll ends.
//          * https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Scroll-linked_effects
//          */
//         const handleScroll = () => {
//           debounceScrollEnd();
//           if (!removeUnlinkedScrollListenerRef.current) {
//             const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
//             removeUnlinkedScrollListenerRef.current = listener;
//             onThumbPositionChange();
//           }
//         };
//         onThumbPositionChange();
//         viewport.addEventListener('scroll', handleScroll);
//         return () => viewport.removeEventListener('scroll', handleScroll);
//       }
//     }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);

//     return (
// <Primitive.div
//   data-state={scrollbarContext.hasThumb ? 'visible' : 'hidden'}
//   {...thumbProps}
//   ref={composedRef}
//   style={{
//     width: 'var(--@Oku-scroll-area-thumb-width)',
//     height: 'var(--@Oku-scroll-area-thumb-height)',
//     ...style,
//   }}
//   onPointerDownCapture={composeEventHandlers(props.onPointerDownCapture, (event) => {
//     const thumb = event.target as HTMLElement;
//     const thumbRect = thumb.getBoundingClientRect();
//     const x = event.clientX - thumbRect.left;
//     const y = event.clientY - thumbRect.top;
//     scrollbarContext.onThumbPointerDown({ x, y });
//   })}
//   onPointerUp={composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)}
// />
//     );
//   }
// );

// ScrollAreaThumb.displayName = THUMB_NAME;
