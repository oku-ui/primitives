import { defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { AVATAR_NAME, avatarProps, avatarProvider, scopeAvatarProps } from './props'
import type { AvatarNativeElement, ImageLoadingStatus } from './props'

const avatar = defineComponent({
  name: AVATAR_NAME,
  inheritAttrs: false,
  props: {
    ...avatarProps.props,
    ...scopeAvatarProps,
  },
  emit: avatarProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuAvatar,
      ...avatarProps
    } = toRefs(props)

    const _reactive = reactive(avatarProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const imageLoadingStatus = ref<ImageLoadingStatus>('idle')

    avatarProvider({
      scope: scopeOkuAvatar.value,
      imageLoadingStatus,
      onImageLoadingStatusChange: status => imageLoadingStatus.value = status,
    })

    return () => h(Primitive.span, {
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, () => slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAvatar = avatar as typeof avatar & (new () => { $props: AvatarNativeElement })
