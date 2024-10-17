import type { Component } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vitest } from 'vitest'
import { defineComponent, h } from 'vue'
import { createProvide, createScope, ScopePropObject } from '../'

describe('provide', () => {
  it('createProvide consumerName emty test', async () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })

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

  it('avatar test', async () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })

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

  it('createProvide get inject data', async () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })

    const [_avatarProvider, useAvatarInject] = createProvide<{
      test: string
    }>('Avatar')

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

  it('createProvide provider', async () => {
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
        return () => h(Avatar, { ...attrs }, [h(AvatarFallback)])
      },
    })

    const component = mount(testComponent)
    expect(component.html()).toContain('<div>Merhaba</div>')
  })

  it('createProvide defaultProvide', async () => {
    const [_avatarProvider, useAvatarInject] = createProvide<{
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
        return () => h(Avatar, { ...attrs }, [h(AvatarFallback)])
      },
    })

    const component = mount(testComponent)
    expect(component.html()).toContain('<div>Merhaba asdasda</div>')
  })

  it('createScope', async () => {
    const AVATAR_NAME = 'OkuAvatar'
    const [createAvatarProvide, _createAvatarScope] = createScope(AVATAR_NAME)

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
        return () => h(Avatar, { ...attrs }, [h(AvatarFallback)])
      },
    })

    const component = mount(testComponent)
    expect(component.html()).toContain('<div>loading</div>')
  })

  it('createScope createScope empty', async () => {
    const [_createCollectionProvide, createCollectionScope] = createScope('TestCollectionProvider')

    expect(createCollectionScope()({})).toEqual({
      scopeTestCollectionProvider: { TestCollectionProvider: [] },
    })
  })

  it('createScope createScope component', async () => {
    // Collection
    const PROVIDER_NAME = 'TestCollectionProvider'

    const [createCollectionProvide, createCollectionScope] = createScope(PROVIDER_NAME)

    const [_collectionProvide, _useCollectionInject] = createCollectionProvide<{
      collectionRef: 'test'
    }>(
      PROVIDER_NAME,
    )

    const useRovingFocusGroupScope = createCollectionScope()

    expect(useRovingFocusGroupScope({}).scopeTestCollectionProvider?.TestCollectionProvider).toBeDefined()
  })
})
