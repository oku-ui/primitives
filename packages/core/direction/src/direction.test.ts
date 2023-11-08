import { describe, expect, it, vitest } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import { OkuDirectionProvider, useDirection } from './Direction'

const DirectionContextSymbol = Symbol('DirectionContext')

describe('direction', () => {
  function propsTest(dir: any) {
    it(`props ${dir}`, () => {
      const wrapper = mount(OkuDirectionProvider, {
        props: {
          dir,
        },
      })
      expect(wrapper.props().dir).toBe(dir)
    })
  }

  propsTest('ltr')
  propsTest('rtl')

  it('slot', () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })

    const wrapper = mount(OkuDirectionProvider, {
      slots: {
        default: 'test',
      },
    })
    expect(wrapper.html()).toContain('test')

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: Missing required prop: "dir"')
  })
  it('provide, inject and slot', () => {
    const ChildComponent = {
      setup() {
        const dir = useDirection()
        return {
          dir,
        }
      },
      template: '<div>{{ dir }}</div>',
    } as Component

    const childWrapper = mount(ChildComponent, {
      global: {
        provide: {
          [DirectionContextSymbol]: 'ltr',
        },
      },
    })

    const main = {
      components: { OkuDirectionProvider, ChildComponent },
      template: `
          <DirectionProvider dir="ltr">
            <ChildComponent />
          </DirectionProvider>
        `,
    } as Component

    const wrapper = mount(main, {})
    expect(wrapper.html()).toContain('ltr')
    expect(childWrapper.html()).toContain('ltr')
  })
})
