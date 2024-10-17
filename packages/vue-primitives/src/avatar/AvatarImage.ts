import type { PrimitiveProps } from '@oku-ui/primitive'
import type { ImageLoadingStatus } from './AvatarRoot.ts'

export interface AvatarImageProps {
  as?: PrimitiveProps['as']
  src?: string
}

export type AvatarImageEmits = {
  loadingStatusChange: [status: ImageLoadingStatus]
}
