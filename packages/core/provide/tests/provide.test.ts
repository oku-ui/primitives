import { h } from 'vue'
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createProvide } from '../src/index'

describe('Provide', () => {
  test('createContext', async () => {
    const [AvatarProvider] = createProvide('Avatar')
    const component = mount(AvatarProvider, {
      props: {
        test2: 'test2',
      },
      slots: {
        default: h('div', { id: 'test' }, 'testaaa'),
      },
    })
    const deneme = component.html()
    expect(deneme).toBe('<div id="test">testaaa</div>')
  })

  //   test('createContextScope', async () => {
  //     const AVATAR_NAME = 'Avatar'
  //     const [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME)

  //     type AvatarContextValue = {
  //       imageLoadingStatus: ImageLoadingStatus
  //       onImageLoadingStatusChange(status: ImageLoadingStatus): void
  //     }

  //     const [AvatarProvider, useAvatarContext] = createAvatarContext<AvatarContextValue>(AVATAR_NAME)

  //     //   <AvatarProvider
  //     //     scope={__scopeAvatar}
  //     //     imageLoadingStatus={imageLoadingStatus}
  //     //     onImageLoadingStatusChange={setImageLoadingStatus}
  //     //   >
  //     //     <Primitive.span {...avatarProps} ref={forwardedRef} />
  //     //   </AvatarProvider>

//     const component = mount(AvatarProvider, {
//         props
//   })
})
