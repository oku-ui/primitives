import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OkuPortal } from './Portal'

describe('OkuPortal', () => {
  it('renders content inside the portal', async () => {
    const wrapper = mount(OkuPortal, {
      slots: {
        default: '<div>Portal Content</div>',
      },
      attrs: {
        class: 'oku-portal',
      },
    })

    // Wait for the next tick
    await wrapper.vm.$nextTick()

    // Find the portal content inside the container
    const portalContent = document.querySelector('.oku-portal')

    expect(portalContent).toBeDefined()
    expect(portalContent?.textContent).toBe('Portal Content')

    // Cleanup
    wrapper.unmount()
  })
})
