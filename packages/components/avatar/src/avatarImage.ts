import type { PropType } from 'vue'
import { defineComponent, h, onMounted, toRefs, watch } from 'vue'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { useCallbackRef, useForwardRef } from '@oku-ui/use-composable'
import type { ImageLoadingStatus } from './utils'
import { useImageLoadingStatus } from './utils'
import { useAvatarInject } from './avatar'

const IMAGE_NAME = 'AvatarImage'

type AvatarImageElement = ElementType<'img'>
export type _AvatarImageEl = HTMLImageElement

interface AvatarImageProps extends IPrimitiveProps {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void
  scopeAvatar?: Scope
}

const AvatarImage = defineComponent({
  name: IMAGE_NAME,
  inheritAttrs: false,
  props: {
    onLoadingStatusChange: {
      type: Function as unknown as PropType<(status: ImageLoadingStatus) => void>,
      required: false,
      default: () => {},
    },
    scopeAvatar: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    src: {
      type: String,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const { src } = toRefs(props)
    const { ...imageProps } = attrs as AvatarImageElement
    const inject = useAvatarInject(IMAGE_NAME, props.scopeAvatar)

    const forwardedRef = useForwardRef()

    const imageLoadingStatus = useImageLoadingStatus(src)

    const handleLoadingStatusChange = useCallbackRef((status: ImageLoadingStatus) => {
      props.onLoadingStatusChange(status)
      inject.value.onImageLoadingStatusChange(status)
    })

    onMounted(() => {
      if (imageLoadingStatus.value !== 'idle')
        handleLoadingStatusChange(imageLoadingStatus.value)
    })

    watch(imageLoadingStatus, (newValue) => {
      if (newValue !== 'idle')
        handleLoadingStatusChange(newValue)
    })

    const originalReturn = () => imageLoadingStatus.value === 'loaded'
      ? h(
        Primitive.img, {
          ...imageProps,
          src: src.value,
          ref: forwardedRef,
        },
        {
          default: () => slots.default?.(),
        },
      )
      : null

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuAvatarImageProps = MergeProps<AvatarImageProps, AvatarImageElement>

type InstanceAvatarImageType = InstanceTypeRef<typeof AvatarImage, _AvatarImageEl>

const OkuAvatarImage = AvatarImage as typeof AvatarImage & (new () => { $props: _OkuAvatarImageProps })

export {
  OkuAvatarImage,
}

export type {
  AvatarImageProps,
  AvatarImageElement,
  InstanceAvatarImageType,
}
