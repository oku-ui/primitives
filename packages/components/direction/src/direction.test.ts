import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { type Component } from 'vue'
import { DirectionProvider, useDirection } from './Direction'

const DirectionContextSymbol = Symbol('DirectionContext')

describe('direction', () => {
  function propsTest(dir: any) {
    it(`props ${dir}`, () => {
      const wrapper = mount(DirectionProvider, {
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
    const wrapper = mount(DirectionProvider, {
      slots: {
        default: 'test',
      },
    })
    expect(wrapper.html()).toContain('test')
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
      components: { DirectionProvider, ChildComponent },
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
