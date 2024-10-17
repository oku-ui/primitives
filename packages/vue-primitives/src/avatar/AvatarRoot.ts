import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Ref } from 'vue'
import { createContext } from '@oku-ui/hooks'

export interface AvatarRootProps {
  as?: PrimitiveProps['as']
}

export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

export interface AvatarContext {
  imageLoadingStatus: Ref<ImageLoadingStatus>
  onImageLoadingStatusChange: (status: ImageLoadingStatus) => void
};

export const [provideAvatarContext, useAvatarContext] = createContext<AvatarContext>('Avatar')
