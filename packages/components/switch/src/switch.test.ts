import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { OkuSwitch } from '.'

describe('OkuSwitch', () => {
  it('should render correctly', async () => {
    const checked = ref(true)

    const wrapper = mount(OkuSwitch, {
      props: {
        modelValue: checked.value,
        name: 'switchInput',
        onCheckedChange: vi.fn(),
      },
    })

    // Find the button element
    const button = wrapper.find('[role="switch"]')

    expect(button.attributes('aria-checked')).toBe('true')
    expect(button.attributes('data-state')).toBe('checked')
  })
})
