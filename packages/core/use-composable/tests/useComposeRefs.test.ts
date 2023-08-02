import type { Component, DefineComponent } from 'vue'
import { h, onMounted, ref } from 'vue'
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { useComposedRefs } from '../src/useComposedRefs'

const DivComponent: Component = {
  name: 'Refs',
  inheritAttrs: false,
  setup(props, { attrs, expose }) {
    const ref1 = ref()
    const ref2 = ref()
    const ref3 = ref()

    const refs = useComposedRefs(ref1, ref2, ref3)
    onMounted(() => {
      expect(ref1.value).toBeInstanceOf(HTMLDivElement)
      expect(ref2.value).toBeInstanceOf(HTMLDivElement)
      expect(ref3.value).toBeInstanceOf(HTMLDivElement)
    })
    return () => {
      return h('div', { ref: refs }, {
        default: () => 'test',
      })
    }
  },
}

describe('Provide', () => {
  test('createContext', async () => {
    const component = mount(DivComponent)
    const deneme = component.html()
    expect(deneme).toBe('<div>test</div>')
  })

  test('defineComponents', async () => {
    // TODO: Fix this ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const _components: DefineComponent = {
      name: 'Refs',
      setup() {
        const ref1 = ref()
        const ref2 = ref()
        const ref3 = ref()
        const refs = useComposedRefs(ref1, ref2, ref3)
        onMounted(() => {
          expect(ref1.value).toBeInstanceOf(HTMLDivElement)
          expect(ref2.value).toBeInstanceOf(HTMLDivElement)
          expect(ref3.value).toBeInstanceOf(HTMLDivElement)
        })
        return () => {
          return h('div', { ref: refs }, {
            default: () => 'Hello World',
          })
        }
      },
    }
    mount(_components)
  })
})
