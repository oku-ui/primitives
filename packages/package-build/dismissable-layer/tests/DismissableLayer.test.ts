import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { OkuDismissableLayer } from './DismissableLayer'

// skipping this test for now. There's an error "TypeError: Cannot read properties of undefined (reading 'devtoolsRawSetupState')"
describe.skip('dismissableLayer', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(OkuDismissableLayer)

    // You can add more specific assertions based on your component's structure and props
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('emits events when interactions happen outside the layer', async () => {
    const wrapper = mount(OkuDismissableLayer)

    // Simulate a click outside the layer
    await wrapper.trigger('pointerdown', { target: document.body })

    // Check if the emitted events are correct
    expect(wrapper.emitted('pointerDownOutside')).toHaveLength(1)
    expect(wrapper.emitted('interactOutside')).toHaveLength(1)
    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })

  it('emits events when Escape key is pressed', async () => {
    const wrapper = mount(OkuDismissableLayer)

    // Simulate pressing the Escape key
    await wrapper.trigger('keydown', { key: 'Escape' })

    // Check if the emitted events are correct
    expect(wrapper.emitted('escapeKeyDown')).toHaveLength(1)
    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })
})
