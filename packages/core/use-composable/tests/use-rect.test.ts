import { mount } from '@vue/test-utils'
import { describe, expect, it, vitest } from 'vitest'
import { ref } from 'vue'
import { useRect } from '../src/use-rect'

describe('useRect', () => {
  it('rect changes', async () => {
    const element = ref<HTMLElement | null>(document.createElement('div'))
    const { rect, measurableElement } = useRect()

    measurableElement.value = element.value || undefined
    expect(rect.value).toBeNull()

    // Mock appendChild and remove methods
    document.body.appendChild = vitest.fn()
    element.value!.remove = vitest.fn()

    await mount({
      template: '<div></div>',
      setup() {
        measurableElement.value = element.value
        return {}
      },
    })

    expect(rect.value).not.toBeNull()

    // Simulate component unmounting
    await mount({
      template: '<div></div>',
      setup() {
        measurableElement.value = null
        return {}
      },
    })

    expect(rect.value).toBeNull()

    // Assert on the number of calls
    expect(document.body.appendChild).toHaveBeenCalledTimes(1)
    expect(element.value!.remove).toHaveBeenCalledTimes(1)
  })

  it('props', () => {
    const wrapper = mount(useRect, {
      propsData: {
        dir: 'measurableElement',
      },
    })
    expect(wrapper.props().dir).toBe('measurableElement')
  })
})
