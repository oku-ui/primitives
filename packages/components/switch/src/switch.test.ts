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

    await wrapper.setProps({ modelValue: false })
    await wrapper.trigger('click')

    // Expect the button to have updated its aria-checked attribute
    expect(button.attributes('aria-checked')).toBe('false')
    expect(button.attributes('data-state')).toBe('unchecked')
  })

  it('should call the onCheckedChange prop when the switch is clicked', async () => {
    const checked = ref(false)
    const onCheckedChange = vi.fn()

    const wrapper = mount(OkuSwitch, {
      props: {
        modelValue: checked.value,
        name: 'switchInput',
        onCheckedChange,
      },
    })

    // Find the button element
    const button = wrapper.find('[role="switch"]')

    // Simulate a click event
    await button.trigger('click')

    // Expect the onCheckedChange prop to be called with the opposite value (true)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it.skip('should disable the switch when the disabled prop is true', async () => {
    const checked = ref(false)

    const wrapper = mount(OkuSwitch, {
      props: {
        modelValue: checked.value,
        name: 'switchInput',
        disabled: true,
      },
    })

    // Find the button element
    const button = wrapper.find('[role="switch"]')

    // Assertions
    expect(button.attributes('aria-checked')).toBe('false')
    expect(button.attributes('disabled')).toBeTruthy()

    // Simulate a click event (should not trigger any changes)
    await button.trigger('click')

    // Expect the switch state to remain the same (unchecked)
    expect(checked.value).toBe(false)
  })

  it('should update the switch correctly with v-model directive', async () => {
    const checked = ref(false)

    const wrapper = mount(OkuSwitch, {
      props: {
        modelValue: checked,
        name: 'switchInput',
      },
    })

    // Find the button element
    const button = wrapper.find('[role="switch"]')

    // Simulate a click event
    await button.trigger('click')

    // Expect the button to have updated its aria-checked attribute
    expect(button.attributes('aria-checked')).toBe('true')
    expect(button.attributes('data-state')).toBe('checked')

    // Expect the checked value to have updated via v-model directive
    expect(checked.value).toBe(true)
  })
})
