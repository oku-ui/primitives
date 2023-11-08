import type { Ref } from 'vue'
import { defineComponent, h, ref } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { createProvideScope } from '@oku-ui/provide'
import { useForwardRef } from '@oku-ui/use-composable'
import { scopeAvatarProps } from './utils'

const AVATAR_NAME = 'OkuAvatar'
export const [createAvatarProvide, createAvatarScope] = createProvideScope(AVATAR_NAME)

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

type AvatarProvideValue = {
  imageLoadingStatus: Ref<ImageLoadingStatus>
  onImageLoadingStatusChange(status: ImageLoadingStatus): void
}

export const [avatarProvider, useAvatarInject] = createAvatarProvide<AvatarProvideValue>(AVATAR_NAME)

export type AvatarNaviteElement = OkuElement<'span'>
export type AvatarElement = HTMLSpanElement

export interface AvatarProps extends PrimitiveProps {

}

export const avatarProps = {
  props: {},
  emits: {},
}

const avatar = defineComponent({
  name: AVATAR_NAME,
  inheritAttrs: false,
  props: {
    ...avatarProps,
    ...scopeAvatarProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const forwardedRef = useForwardRef()

    const imageLoadingStatus = ref<ImageLoadingStatus>('idle')

    avatarProvider({
      scope: props.scopeOkuAvatar,
      imageLoadingStatus,
      onImageLoadingStatusChange: (status: ImageLoadingStatus) => {
        imageLoadingStatus.value = status
      },
    })

    const originalReturn = () => h(
      Primitive.span,
      {
        ...attrs,
        ref: forwardedRef,
        asChild: props.asChild,
      },
      {
        default: () => slots.default?.(),
      },
    )
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAvatar = avatar as typeof avatar &
(new () => {
  $props: AvatarNaviteElement
})
