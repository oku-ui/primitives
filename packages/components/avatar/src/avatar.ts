import type { PropType } from 'vue'
import { defineComponent, h, ref } from 'vue'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import { useForwardRef } from '@oku-ui/use-composable'

const AVATAR_NAME = 'Avatar'
const [createAvatarProvide, createAvatarScope] = createProvideScope(AVATAR_NAME)

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

type AvatarProvideValue = {
  imageLoadingStatus: ImageLoadingStatus
  onImageLoadingStatusChange(status: ImageLoadingStatus): void
}

export const [AvatarProvider, useAvatarInject] = createAvatarProvide<AvatarProvideValue>(AVATAR_NAME)

type AvatarElement = ElementType<'span'>
export type _AvatarEl = HTMLSpanElement

interface AvatarProps extends IPrimitiveProps {
  scopeAvatar?: Scope
}

const Avatar = defineComponent({
  name: AVATAR_NAME,
  inheritAttrs: false,
  props: {
    scopeAvatar: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, slots }) {
    const { ...avatarProps } = attrs as AvatarElement

    const forwardedRef = useForwardRef()

    const imageLoadingStatus = ref<ImageLoadingStatus>('idle')

    AvatarProvider({
      scope: props.scopeAvatar,
      imageLoadingStatus: imageLoadingStatus.value,
      onImageLoadingStatusChange: (status: ImageLoadingStatus) => {
        imageLoadingStatus.value = status
      },
    })

    const originalReturn = () => h(
      Primitive.span, {
        ...avatarProps,
        ref: forwardedRef,
      },
      {
        default: () => slots.default?.(),
      },
    )
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuAvatarProps = MergeProps<AvatarProps, AvatarElement>

type InstanceAvatarType = InstanceTypeRef<typeof Avatar, _AvatarEl>

const OkuAvatar = Avatar as typeof Avatar & (new () => { $props: _OkuAvatarProps })

export {
  OkuAvatar,
  createAvatarScope,
}

export type {
  AvatarProps,
  AvatarElement,
  InstanceAvatarType,
}
