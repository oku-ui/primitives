import type { PropType, Ref } from 'vue'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'

export type ScopeAvatar<T> = T & { scopeOkuAvatar?: Scope }

export const scopeAvatarProps = {
  scopeOkuAvatar: {
    ...ScopePropObject,
  },
}

export const AVATAR_NAME = 'OkuAvatar'
export const AVATAR_IMAGE_NAME = 'OkuAvatarImage'
export const AVATAR_FALLBACK_NAME = 'OkuAvatarFallback'

/* -------------------------------------------------------------------------------------------------
 * Avatar - avatar.ts
 * ----------------------------------------------------------------------------------------------- */

export const [createAvatarProvide, createAvatarScope] = createProvideScope(AVATAR_NAME)

export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

export type AvatarProvideValue = {
  imageLoadingStatus: Ref<ImageLoadingStatus>
  onImageLoadingStatusChange(status: ImageLoadingStatus): void
}

export const [avatarProvider, useAvatarInject] = createAvatarProvide<AvatarProvideValue>(AVATAR_NAME)

export type AvatarNativeElement = OkuElement<'span'>
export type AvatarElement = HTMLSpanElement

export interface AvatarProps extends PrimitiveProps { }

export const avatarProps = {
  props: {
    ...primitiveProps,
  },
  emits: { },
}

/* -------------------------------------------------------------------------------------------------
 * AvatarImage - avatar-image.ts
 * ----------------------------------------------------------------------------------------------- */

export type AvatarImageNativeElement = OkuElement<'img'>
export type AvatarImageElement = HTMLImageElement

export interface AvatarImageProps extends PrimitiveProps { }

export type AvatarImageEmits = {
  loadingStatusChange: [status: ImageLoadingStatus]
}

export const avatarImageProps = {
  props: {
    src: {
      type: String,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    loadingStatusChange: (status: AvatarImageEmits['loadingStatusChange'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * AvatarFallback - avatar-fallback.ts
 * ----------------------------------------------------------------------------------------------- */

export type AvatarFallbackNativeElement = OkuElement<'span'>
export type AvatarFallbackElement = HTMLSpanElement

export interface AvatarFallbackProps extends PrimitiveProps {
  delayMs?: number
}

export const avatarFallbackProps = {
  props: {
    delayMs: {
      type: Number as PropType<AvatarFallbackProps['delayMs']>,
    },
    ...primitiveProps,
  },
  emits: { },
}
