import type { PrimitiveProps } from '../primitive/index.ts'
import type { ImageLoadingStatus } from './Avatar.ts'

export interface AvatarImageProps extends PrimitiveProps {
  src?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type AvatarImageEmits = {
  loadingStatusChange: [status: ImageLoadingStatus]
}
