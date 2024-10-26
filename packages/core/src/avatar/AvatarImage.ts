import type { PrimitiveProps } from '../primitive/index.ts'
import { watchEffect } from 'vue'
import { type EmitsToHookProps, mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveReturns } from '../shared/index.ts'
import { type ImageLoadingStatus, useAvatarContext } from './AvatarRoot.ts'
import { useImageLoadingStatus } from './utils.ts'

export interface AvatarImageProps {
  as?: PrimitiveProps['as']
  src?: string
}

export const DEFAULT_AVATAR_IMAGE_PROPS = {
  as: 'img',
} satisfies PrimitiveDefaultProps<AvatarImageProps>

export type AvatarImageEmits = {
  loadingStatusChange: [status: ImageLoadingStatus]
}

export interface UseAvatarImageProps extends EmitsToHookProps<AvatarImageEmits> {
  src?: () => string | undefined
}

export function useAvatarImage(props: UseAvatarImageProps = {}): RadixPrimitiveReturns {
  const context = useAvatarContext('AvatarImage')
  const imageLoadingStatus = useImageLoadingStatus(props.src)

  function handleLoadingStatusChange(status: ImageLoadingStatus) {
    props.onLoadingStatusChange?.(status)
    context.onImageLoadingStatusChange(status)
  }

  watchEffect(() => {
    if (imageLoadingStatus.value !== 'idle') {
      handleLoadingStatusChange(imageLoadingStatus.value)
    }
  })

  return {
    attrs(extraAttrs) {
      const attrs = {
        src: props.src?.(),
        hidden: imageLoadingStatus.value !== 'loaded',
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
