/* -------------------------------------------------------------------------------------------------
 * ScrollAreaScrollbar
 * ----------------------------------------------------------------------------------------------- */

// const SCROLLBAR_NAME = 'ScrollAreaScrollbar'

// type ScrollAreaScrollbarElement = ScrollAreaScrollbarVisibleElement;
// interface ScrollAreaScrollbarProps extends ScrollAreaScrollbarVisibleProps {
//   forceMount?: true;
// }

// const ScrollAreaScrollbar = React.forwardRef<ScrollAreaScrollbarElement, ScrollAreaScrollbarProps>(
//   (props: ScopedProps<ScrollAreaScrollbarProps>, forwardedRef) => {
//     const { forceMount, ...scrollbarProps } = props;
//     const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
//     const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
//     const isHorizontal = props.orientation === 'horizontal';

//     React.useEffect(() => {
//       isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
//       return () => {
//         isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
//       };
//     }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);

//     return context.type === 'hover' ? (
//       <ScrollAreaScrollbarHover {...scrollbarProps} ref={forwardedRef} forceMount={forceMount} />
//     ) : context.type === 'scroll' ? (
//       <ScrollAreaScrollbarScroll {...scrollbarProps} ref={forwardedRef} forceMount={forceMount} />
//     ) : context.type === 'auto' ? (
//       <ScrollAreaScrollbarAuto {...scrollbarProps} ref={forwardedRef} forceMount={forceMount} />
//     ) : context.type === 'always' ? (
//       <ScrollAreaScrollbarVisible {...scrollbarProps} ref={forwardedRef} />
//     ) : null;
//   }
// );

// ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
