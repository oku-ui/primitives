import type { Component } from 'vue'
import { h, onMounted, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { useComposedRefs } from '../src/useComposedRefs'

const DivComponent: Component = {
  name: 'Refs',
  inheritAttrs: false,
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
        default: () => 'test',
      })
    }
  },
}

describe('provide', () => {
  it('createContext', async () => {
    const component = mount(DivComponent)
    const deneme = component.html()
    expect(deneme).toBe('<div>test</div>')
  })

  it('defineComponents', async () => {
    const _components: Component = {
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
