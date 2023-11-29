import { defineComponent, h, mergeProps, reactive, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { useImageLoadingStatus } from './utils'
import { AVATAR_IMAGE_NAME, avatarImageProps, scopeAvatarProps, useAvatarInject } from './props'
import type { AvatarImageNativeElement, ImageLoadingStatus } from './props'

const avatarImage = defineComponent({
  name: AVATAR_IMAGE_NAME,
  inheritAttrs: false,
  props: {
    ...avatarImageProps.props,
    ...scopeAvatarProps,
  },
  emits: avatarImageProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      scopeOkuAvatar,
      src,
      ...imageProps
    } = toRefs(props)

    const _reactive = reactive(imageProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const inject = useAvatarInject(AVATAR_IMAGE_NAME, scopeOkuAvatar.value)
    const imageLoadingStatus = useImageLoadingStatus(src.value)
    const handleLoadingStatusChange = (status: ImageLoadingStatus) => {
      emit('loadingStatusChange', status)
      inject.onImageLoadingStatusChange(status)
    }

    watchEffect(() => {
      if (imageLoadingStatus.value !== 'idle')
        handleLoadingStatusChange(imageLoadingStatus.value)
    })

    return () => [imageLoadingStatus.value === 'loaded'
      ? h(Primitive.img, {
        ...mergeProps(attrs, otherProps, emits),
        src: src.value,
        ref: forwardedRef,
      }, () => slots.default?.())
      : null,
    ]
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAvatarImage = avatarImage as typeof avatarImage & (new () => { $props: AvatarImageNativeElement })
