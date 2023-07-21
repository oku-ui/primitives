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

  it('should disable the switch when the disabled prop is true', async () => {
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
    expect(button.attributes('disabled')).toBe('')

    // Simulate a click event (should not trigger any changes)
    await button.trigger('click')

    // Expect the switch state to remain the same (unchecked)
    expect(checked.value).toBe(false)
  })

  it('should render with the specified value attribute', () => {
    const wrapper = mount(OkuSwitch, {
      props: {
        modelValue: ref(false),
        name: 'switchInput',
        value: 'off',
      },
    })

    const button = wrapper.find('[role="switch"]')

    expect(button.attributes('value')).toBe('off')
  })

  it('should render with the required attribute when required prop is true', async () => {
    const wrapper = mount(OkuSwitch, {
      props: {
        modelValue: false,
        name: 'switchInput',
        required: true,
      },
    })

    const button = wrapper.find('[role="switch"]')

    expect(button.attributes('aria-required')).toBe('true')

    await button.trigger('click')

    expect(wrapper.props().modelValue).toBe(false)
  })

  it.skip('should default to false when no modelValue or defaultChecked prop is provided', async () => {
    const wrapper = mount(OkuSwitch, {
      props: {
        name: 'switchInput',
      },
    })

    // Find the button element
    const button = wrapper.find('[role="switch"]')

    // Expect the default value to be false
    expect(wrapper.props().modelValue).toBe(false)
    expect(button.attributes('aria-checked')).toBe('false')

    // Simulate a click event to toggle the switch
    await button.trigger('click')
    expect(wrapper.props().modelValue).toBe(true)
    expect(button.attributes('aria-checked')).toBe('true')

    // Click again to toggle back to false
    await button.trigger('click')
    expect(wrapper.props().modelValue).toBe(false)
    expect(button.attributes('aria-checked')).toBe('false')
  })

  it('should propagate the click event only once when inside a form', async () => {
    const checked = ref(false)
    const formHtml
      = '<form><OkuSwitch v-model="checked" name="switchInput" /></form>'
    const wrapper = mount(
      {
        components: { OkuSwitch },
        template: formHtml,
        setup() {
          return { checked }
        },
      },
      { attachTo: document.body }, // Mount inside the DOM to interact with form elements
    )

    const button = wrapper.find('[role="switch"]')

    await button.trigger('click')

    expect(checked.value).toBe(true)

    // Listen for the 'submit' event on the form element
    const formElement = wrapper.find('form').element as HTMLFormElement
    const submitEventSpy = vi.spyOn(formElement, 'dispatchEvent')

    // Trigger the form submission
    await formElement.dispatchEvent(new Event('submit'))

    // Expect the form submission to be triggered once
    expect(submitEventSpy).toHaveBeenCalledTimes(1)

    // Expect the form event to be received by the form element itself
    expect(submitEventSpy).toHaveBeenCalledWith(expect.any(Event))
  })
})
