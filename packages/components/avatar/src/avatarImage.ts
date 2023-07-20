import type { ComponentPublicInstance, PropType } from 'vue'
import { computed, defineComponent, h, onMounted, ref, watch } from 'vue'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { useCallbackRef } from '@oku-ui/use-composable'
import type { ImageLoadingStatus } from './utils'
import { useImageLoadingStatus } from './utils'
import { useAvatarInject } from './avatar'

const IMAGE_NAME = 'AvatarImage'

type AvatarImageElement = ElementType<'img'>

interface AvatarImageProps extends PrimitiveProps {
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
  },
  setup(props, { attrs, slots, expose }) {
    const { src, ...imageProps } = attrs as AvatarImageElement
    const inject = useAvatarInject(IMAGE_NAME, props.scopeAvatar)
    const innerRef = ref<ComponentPublicInstance>()
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

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => imageLoadingStatus.value === 'loaded'
      ? h(
        Primitive.img, {
          ...imageProps,
          src,
          ref: innerRef,
        },
        {
          default: () => slots.default?.(),
        },
      )
      : null

    return originalReturn as unknown as {
      innerRef: AvatarImageElement
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuAvatarImageProps = MergeProps<AvatarImageProps, AvatarImageElement>

type AvatarImageRef = RefElement<typeof AvatarImage>

const OkuAvatarImage = AvatarImage as typeof AvatarImage & (new () => { $props: _OkuAvatarImageProps })

export {
  OkuAvatarImage,
}

export type {
  AvatarImageProps,
  AvatarImageElement,
  AvatarImageRef,
}
