// type ScrollAreaCornerImplElement = React.ElementRef<typeof Primitive.div>;
// interface ScrollAreaCornerImplProps extends PrimitiveDivProps {}

// const ScrollAreaCornerImpl = React.forwardRef<
//   ScrollAreaCornerImplElement,
//   ScrollAreaCornerImplProps
// >((props: ScopedProps<ScrollAreaCornerImplProps>, forwardedRef) => {
//   const { __scopeScrollArea, ...cornerProps } = props;
//   const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
//   const width = ref<number>(0)
//   const height = ref<number>(0)
//   const hasSize = Boolean(width && height);

// useResizeObserver(context.scrollbarX, () => {
//   const height = context.scrollbarX?.offsetHeight || 0;
//   context.onCornerHeightChange(height);
//   setHeight(height);
// });

// useResizeObserver(context.scrollbarY, () => {
//   const width = context.scrollbarY?.offsetWidth || 0;
//   context.onCornerWidthChange(width);
//   setWidth(width);
// });

// return hasSize ? (
//   <Primitive.div
//     {...cornerProps}
//     ref={forwardedRef}
//     style={{
//       width,
//       height,
//       position: 'absolute',
//       right: context.dir === 'ltr' ? 0 : undefined,
//       left: context.dir === 'rtl' ? 0 : undefined,
//       bottom: 0,
//       ...props.style,
//     }}
//   />
// ) : null;
// });
