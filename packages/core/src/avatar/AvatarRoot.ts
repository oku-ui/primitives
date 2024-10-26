import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps } from '../shared/index.ts'
import { type Ref, shallowRef } from 'vue'
import { createContext } from '../hooks/index.ts'

export interface AvatarRootProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_AVATAR_ROOT_PROPS = {
  as: 'span',
} satisfies PrimitiveDefaultProps<AvatarRootProps>

export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

export interface AvatarContext {
  imageLoadingStatus: Ref<ImageLoadingStatus>
  onImageLoadingStatusChange: (status: ImageLoadingStatus) => void
};

export const [provideAvatarContext, useAvatarContext] = createContext<AvatarContext>('Avatar')

export function useAvatarRoot() {
  const imageLoadingStatus = shallowRef<ImageLoadingStatus>('idle')

  provideAvatarContext({
    imageLoadingStatus,
    onImageLoadingStatusChange(newStatus) {
      imageLoadingStatus.value = newStatus
    },
  })
}
