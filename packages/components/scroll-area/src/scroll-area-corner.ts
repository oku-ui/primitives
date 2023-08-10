/* -------------------------------------------------------------------------------------------------
 * ScrollAreaCorner
 * ----------------------------------------------------------------------------------------------- */

// const CORNER_NAME = 'ScrollAreaCorner';

// type ScrollAreaCornerElement = ScrollAreaCornerImplElement;
// interface ScrollAreaCornerProps extends ScrollAreaCornerImplProps {}

// const ScrollAreaCorner = React.forwardRef<ScrollAreaCornerElement, ScrollAreaCornerProps>(
//   (props: ScopedProps<ScrollAreaCornerProps>, forwardedRef) => {
//     const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
//     const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
//     const hasCorner = context.type !== 'scroll' && hasBothScrollbarsVisible;
//     return hasCorner ? <ScrollAreaCornerImpl {...props} ref={forwardedRef} /> : null;
//   }
// );

// ScrollAreaCorner.displayName = CORNER_NAME;
