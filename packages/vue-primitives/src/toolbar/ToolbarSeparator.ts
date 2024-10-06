import type { RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import { type SeparatorProps, useSeparator, type UseSeparatorProps } from '../separator/index.ts'
import { useToolbarContext } from './ToolbarRoot.ts'

export interface ToolbarSeparatorProps extends Omit<SeparatorProps, 'orientation'> {}

export interface UseToolbarSeparatorProps extends Omit<UseSeparatorProps, 'orientation'> {}

export function useToolbarSeparator(props: UseToolbarSeparatorProps = {}): RadixPrimitiveReturns {
  const context = useToolbarContext('ToolbarSeparator')

  const separator = useSeparator({
    orientation: context.orientation === 'horizontal' ? 'vertical' : 'horizontal',
    decorative: props.decorative,
  })

  return {
    attrs(extraAttrs) {
      return separator.attrs(extraAttrs)
    },
  }
}
