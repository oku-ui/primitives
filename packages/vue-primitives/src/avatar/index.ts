export { default as AvatarRoot } from './AvatarRoot.vue'
export { default as AvatarFallback } from './AvatarFallback.vue'
export { default as AvatarImage } from './AvatarImage.vue'

export { type AvatarFallbackProps } from './AvatarFallback.ts'
export { type AvatarImageProps, type AvatarImageEmits } from './AvatarImage.ts'
export {
  type AvatarRootProps,
  type ImageLoadingStatus,
  type AvatarContext,
  provideAvatarContext,
  useAvatarContext,
} from './AvatarRoot.ts'
