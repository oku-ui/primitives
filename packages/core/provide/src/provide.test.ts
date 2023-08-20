import type { Component } from 'vue'
import { defineComponent, h } from 'vue'
import { describe, expect, test, vitest } from 'vitest'
import { mount } from '@vue/test-utils'
import { ScopePropObject, createProvide, createProvideScope } from '.'

describe('Provide', () => {
  test('createProvide consumerName emty test', async () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const [_AvatarProvider, useAvatarInject] = createProvide('Avatar')

    const demoComponent = {
      setup(props, { attrs, slots }) {
        useAvatarInject('AvatarFallback')

        return () => h('div', { ...attrs }, slots)
      },
    } as Component

    const component = () => mount(demoComponent)
    expect(() => component()).toThrowError(new Error('`AvatarFallback` must be used within `Avatar`'))

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(Avatar)" not found.')
  })

  test('createProvide consumerName emty test', async () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const [_AvatarProvider, useAvatarInject] = createProvide('Avatar')

    const demoComponent = {
      setup(props, { attrs, slots }) {
        useAvatarInject('AvatarFallback')

        return () => h('div', { ...attrs }, slots)
      },
    } as Component

    const component = () => mount(demoComponent)
    expect(() => component()).toThrowError(new Error('`AvatarFallback` must be used within `Avatar`'))

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(Avatar)" not found.')
  })

  test('createProvide get inject data', async () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const [avatarProvider, useAvatarInject] = createProvide<{
      test: string
    }>('Avatar')

    const Avatar = {
      setup(props, { attrs, slots }) {
        avatarProvider({
          test: 'test',
        })

        return () => h('div', { ...attrs }, slots)
      },
    } as Component

    const AvatarFallback = {
      setup(props, { attrs, slots }) {
        useAvatarInject('AvatarFallback')

        return () => h('div', { ...attrs }, slots)
      },
    } as Component

    const component = () => mount(AvatarFallback)
    expect(() => component()).toThrowError(new Error('`AvatarFallback` must be used within `Avatar`'))

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(Avatar)" not found.')
  })

  test('createProvide provider', async () => {
    const [avatarProvider, useAvatarInject] = createProvide<{
      testValue: string
    }>('Avatar')

    const Avatar = defineComponent({
      setup(props, { attrs, slots }) {
        avatarProvider({
          testValue: 'Merhaba',
        })

        return () => h('div', { ...attrs }, slots)
      },
    })

    const AvatarFallback = {
      components: {
        Avatar,
      },
      setup() {
        const inject = useAvatarInject('AvatarFallback')

        return () => (inject as any).testValue
      },
    } as Component

    const testComponent = defineComponent({
      components: {
        AvatarFallback,
        Avatar,
      },
      setup(props, { attrs }) {
        return () => h(Avatar, { ...attrs }, [h(AvatarFallback)],
        )
      },
    })

    const component = mount(testComponent)
    expect(component.html()).toContain('<div>Merhaba</div>')
  })

  test('createProvide defaultProvide', async () => {
    const [avatarProvider, useAvatarInject] = createProvide<{
      testValue: string
    }>('Avatar', {
      testValue: 'Merhaba asdasda',
    })

    const Avatar = defineComponent({
      setup(props, { attrs, slots }) {
        return () => h('div', { ...attrs }, slots)
      },
    })

    const AvatarFallback = {
      components: {
        Avatar,
      },
      setup() {
        const inject = useAvatarInject('AvatarFallback')

        return () => (inject as any).testValue
      },
    } as Component

    const testComponent = defineComponent({
      components: {
        AvatarFallback,
        Avatar,
      },
      setup(props, { attrs }) {
        return () => h(Avatar, { ...attrs }, [h(AvatarFallback)],
        )
      },
    })

    const component = mount(testComponent)
    expect(component.html()).toContain('<div>Merhaba asdasda</div>')
  })

  test('createProvideScope', async () => {
    const AVATAR_NAME = 'OkuAvatar'
    const [createAvatarProvide, createAvatarScope] = createProvideScope(AVATAR_NAME)

    type AvatarProvideValue = {
      imageLoadingStatus: 'loading' | 'loaded' | 'error'
    }

    const [avatarProvider, useAvatarInject] = createAvatarProvide<AvatarProvideValue>(AVATAR_NAME)

    const Avatar = defineComponent({
      props: {
        scopeOkuAvatar: {
          ...ScopePropObject,
        },
      },
      setup(props, { attrs, slots }) {
        avatarProvider({
          imageLoadingStatus: 'loading',
          scope: props.scopeOkuAvatar,
        })
        return () => h('div', { ...attrs }, slots)
      },
    })

    const AvatarFallback = {
      components: {
        Avatar,
      },
      props: {
        scopeOkuAvatar: {
          ...ScopePropObject,
        },
      },
      setup(props) {
        const inject = useAvatarInject('AvatarFallback', props.scopeOkuAvatar)

        return () => (inject as AvatarProvideValue).imageLoadingStatus
      },
    } as Component

    const testComponent = defineComponent({
      components: {
        AvatarFallback,
        Avatar,
      },
      setup(props, { attrs }) {
        return () => h(Avatar, { ...attrs }, [h(AvatarFallback)],
        )
      },
    })

    const component = mount(testComponent)
    expect(component.html()).toContain('<div>loading</div>')
  })
})
