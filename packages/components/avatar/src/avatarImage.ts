import { defineComponent, h, onMounted, toRef, watch } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { useCallbackRef, useForwardRef } from '@oku-ui/use-composable'
import type { ImageLoadingStatus, ScopeAvatar } from './utils'
import { scopeAvatarProps, useImageLoadingStatus } from './utils'
import { useAvatarInject } from './avatar'

const IMAGE_NAME = 'OkuAvatarImage'

export type AvatarImageIntrinsicElement = ElementType<'img'>
export type AvatarImageElement = HTMLImageElement

export interface AvatarImageProps extends PrimitiveProps {
  scopeAvatar?: Scope
}

export type AvatarEmits = {
  'loadingStatusChange': [status: ImageLoadingStatus]
}

export const avatarImageProps = {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    loadingStatusChange: (status: ImageLoadingStatus) => true,
  },
}

const avatarImage = defineComponent({
  name: IMAGE_NAME,
  inheritAttrs: false,
  props: {
    ...avatarImageProps.props,
    ...scopeAvatarProps,
    ...primitiveProps,
  },
  emits: avatarImageProps.emits,
  setup(props, { attrs, slots, emit }) {
    const src = toRef(props, 'src')
    const { ...imageAttrs } = attrs as AvatarImageIntrinsicElement
    const inject = useAvatarInject(IMAGE_NAME, props.scopeOkuAvatar)

    const forwardedRef = useForwardRef()

    const imageLoadingStatus = useImageLoadingStatus(src)

    const handleLoadingStatusChange = useCallbackRef((status: ImageLoadingStatus) => {
      emit('loadingStatusChange', status)
      inject.onImageLoadingStatusChange(status)
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
          asChild: props.asChild,
          ...imageAttrs,
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
export const OkuAvatarImage = avatarImage as typeof avatarImage &
(new () => {
  $props: ScopeAvatar<Partial<AvatarImageElement>>
})
