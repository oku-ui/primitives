import type { PrimitiveProps } from '../primitive/index.ts'
import type { ImageLoadingStatus } from './AvatarRoot.ts'

export interface AvatarImageProps {
  as?: PrimitiveProps['as']
  src?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type AvatarImageEmits = {
  loadingStatusChange: [status: ImageLoadingStatus]
}
