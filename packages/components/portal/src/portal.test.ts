import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OkuPortal } from './Portal'

describe('OkuPortal', () => {
  it('teleports content to the specified container', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const wrapper = mount(OkuPortal, {
      props: {
        container,
      },
      slots: {
        default: 'Portal Content',
      },
    })

    await wrapper.vm.$nextTick()

    expect(container.innerHTML).toContain('Portal Content')
  })
})
