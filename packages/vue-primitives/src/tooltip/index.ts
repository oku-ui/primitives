export { PopperArrow as TooltipArrow } from '../popper/index.ts'
export { Portal as TooltipPortal } from '../portal/index.ts'
export {
  type TooltipContentProps,
} from './TooltipContent.ts'
export { default as TooltipContent } from './TooltipContent.vue'
export { default as TooltipContentAriaLabel } from './TooltipContentAriaLabel.vue'
export {
  provideTooltipProviderContext,
  type TooltipProviderContext,
  type TooltipProviderProps,
  useTooltipProvider,
  useTooltipProviderContext,
} from './TooltipProvider.ts'

export {
  provideTooltipContext,
  type TooltipContext,
  type TooltipRootEmits,
  type TooltipRootProps,
  useTooltipContext,
} from './TooltipRoot.ts'
export { default as TooltipRoot } from './TooltipRoot.vue'
export {
  type TooltipTriggerEmits,
  type TooltipTriggerProps,
} from './TooltipTrigger.ts'
export { default as TooltipTrigger } from './TooltipTrigger.vue'
