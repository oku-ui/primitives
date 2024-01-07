import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import type { Component } from 'vue'
import { Primitive, dispatchDiscreteCustomEvent } from '../'

const componentDiv = {
  setup(props, { slots }) {
    return () => h(Primitive, {
      is: 'div',
    }, slots)
  },
} as Component

const componentButton = {
  setup(props, { slots }) {
    return () => h(Primitive, {
      is: 'button',
    }, {
      default: () => slots.default?.(),
    })
  },
} as Component

const componentInput = {
  setup(props, { slots }) {
    return () => h(Primitive, {
      is: 'input',
    }, {
      default: () => slots.default?.(),
    })
  },
} as Component

const componentA = {
  setup(props, { slots }) {
    return () => h(Primitive, {
      is: 'a',
    }, {
      default: () => slots.default?.(),
    })
  },
} as Component

describe('primitive', () => {
  it('asChild with button', async () => {
    const example = {
      components: {
        Primitive,
      },
      setup() {
        const handleClick = () => {
          expect(true).toBe(true)
        }

        return () => h(Primitive, {
          is: 'button',
          asChild: true,
          onClick: handleClick,
        }, {
          default: () => h('button', 'Click me New'),
        })
      },
    } as Component
    const wrapper = mount(example)

    wrapper.find('button').trigger('click')
    expect(wrapper.html()).toBe('<button>Click me New</button>')
  })

  it('button with button', async () => {
    const example = {
      components: {
        Primitive,
      },
      setup() {
        const handleClick = () => {
          expect(true).toBe(true)
        }

        return () => h(Primitive, {
          is: 'button',
          onClick: handleClick,
        }, {
          default: () => 'Click me',
        })
      },
    } as Component
    const wrapper = mount(example)
    wrapper.find('button').trigger('click')
    expect(wrapper.html()).toBe('<button>Click me</button>')
  })

  it('should render div element correctly', () => {
    const wrapper = mount(componentDiv)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders div element with custom class', () => {
    const wrapper = mount(componentDiv, {
      props: {
        class: 'custom-class',
      },
    })

    const element = wrapper.find('div')

    expect(element.exists()).toBe(true)
    expect(element.classes()).toContain('custom-class')
  })

  it('renders div element with default slot content', () => {
    const defaultSlot = 'default slot content'

    const wrapper = mount(componentDiv, {
      slots: {
        default: defaultSlot,
      },
    })

    const element = wrapper.find('div')

    expect(element.exists()).toBe(true)
    expect(element.text()).toBe(defaultSlot)
  })

  it('renders button element with custom text', () => {
    const buttonText = 'Login'

    const wrapper = mount(componentButton, {
      slots: {
        default: buttonText,
      },
    })

    const element = wrapper.find('button')

    expect(element.exists()).toBe(true)
    expect(element.text()).toBe(buttonText)
  })

  it('emits a click event when button is clicked', async () => {
    const wrapper = mount(componentButton)

    const button = wrapper.find('button')

    await button.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('renders button element with custom attribute', () => {
    const attributeName = 'id'
    const attributeValue = 'button'

    const wrapper = mount(componentButton, {
      attrs: {
        [attributeName]: attributeValue,
      },
    })

    const element = wrapper.find('button')

    expect(element.exists()).toBe(true)
    expect(element.attributes(attributeName)).toBe(attributeValue)
  })

  it('renders button element with custom class', () => {
    const customClass = 'custom-class'
    const wrapper = mount(componentButton, {
      props: {
        class: customClass,
      },
    })

    const element = wrapper.find('button')

    expect(element.exists()).toBe(true)
    expect(element.classes()).toContain(customClass)
  })

  it('renders button element with disabled attribute', () => {
    const wrapper = mount(componentButton, {
      props: {
        disabled: true,
      },
    })

    const element = wrapper.find('button')

    expect(element.exists()).toBe(true)
    expect(element.element.disabled).toBe(true)
  })

  it('renders button element with aria-label attribute', () => {
    const ariaLabel = 'Close'
    const wrapper = mount(componentButton, {
      attrs: {
        'aria-label': ariaLabel,
      },
    })

    const element = wrapper.find('button')

    expect(element.exists()).toBe(true)
    expect(element.attributes('aria-label')).toBe(ariaLabel)
  })

  it('renders input element with type "text"', () => {
    const wrapper = mount(componentInput, {
      props: {
        type: 'text',
      },
    })

    const element = wrapper.find('input')
    expect(element.exists()).toBe(true)
    expect(element.attributes('type')).toBe('text')
  })

  it('renders input element with value prop', () => {
    const value = 'Oku Primitives'

    const wrapper = mount(componentInput, {
      props: {
        value,
      },
    })

    const element = wrapper.find('input')

    expect(element.exists()).toBe(true)
    expect(element.element.value).toBe(value)
  })

  it('emits focus and blur events on input element', async () => {
    const wrapper = mount(componentInput)
    const element = wrapper.find('input')

    await element.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await element.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('renders input element with type "email"', () => {
    const wrapper = mount(componentInput, {
      props: {
        type: 'email',
      },
    })

    const element = wrapper.find('input')
    expect(element.exists()).toBe(true)
    expect(element.attributes('type')).toBe('email')
  })

  it('renders input element with required attribute', () => {
    const wrapper = mount(componentInput, {
      props: {
        required: true,
      },
    })

    const element = wrapper.find('input')
    expect(element.exists()).toBe(true)
    expect(element.element.required).toBe(true)
  })

  it('renders anchor element with href attribute', () => {
    const href = 'https://example.com'
    const wrapper = mount(componentA, {
      props: {
        href,
      },
    })

    const element = wrapper.find('a')
    expect(element.exists()).toBe(true)
    expect(element.attributes('href')).toBe(href)
  })

  it('renders anchor element with target="_blank" attribute', () => {
    const wrapper = mount(componentA, {
      props: {
        href: 'https://example.com',
        target: '_blank',
      },
    })

    const element = wrapper.find('a')
    expect(element.exists()).toBe(true)
    expect(element.attributes('target')).toBe('_blank')
  })

  it('renders anchor element with rel attribute', () => {
    const rel = 'noopener noreferrer'
    const wrapper = mount(componentA, {
      props: {
        href: 'https://example.com',
        rel,
      },
    })

    const element = wrapper.find('a')
    expect(element.exists()).toBe(true)
    expect(element.attributes('rel')).not.toBe('opener')
    expect(element.attributes('rel')).toBe(rel)
  })

  it('renders anchor element with text content', () => {
    const textContent = 'Click here'
    const wrapper = mount(componentA, {
      props: {
        href: 'https://example.com',
      },
      slots: {
        default: textContent,
      },
    })

    const element = wrapper.find('a')
    expect(element.exists()).toBe(true)
    expect(element.text()).toBe(textContent)
  })

  it('emits click event when anchor element is clicked', async () => {
    const wrapper = mount(componentA, {
      props: {
        href: 'https://example.com',
      },
    })
    const element = wrapper.find('a')
    await element.trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  })

  it('asChild prop', () => {
    const wrapper = mount(componentDiv, {
      props: {
        asChild: true,
      },
      slots: {
        default: 'Hello',
      },
    })
    expect(wrapper.html()).toBe('Hello')
  })

  it('asChild with attr', () => {
    const wrapper = mount(componentDiv, {
      props: {
        asChild: true,
      },
      attrs: {
        id: 'test',
        class: 'text-red-500',
      },
      slots: {
        default: '<div>Oku</div>',
      },
    })
    expect(wrapper.html()).toBe(
      '<div id="test" class="text-red-500">Oku</div>',
    )
  })

  it('asChild with props', () => {
    const wrapper = mount(componentDiv, {
      props: {
        asChild: true,
        disabled: true,
      },
      attrs: {
        id: 'test',
        class: 'text-red-500',
      },
      slots: {
        default: '<div>Oku</div>',
      },
    })
    expect(wrapper.html()).toBe(
      '<div id="test" class="text-red-500" disabled="true">Oku</div>',
    )
  })
})

describe('dispatchDiscreteCustomEvent', () => {
  it('should dispatch the custom event on the target element', async () => {
    const customEventName = 'customEvent'

    // Create a mock target element
    const targetElement = document.createElement('div')
    document.body.appendChild(targetElement)

    // Spy on the dispatchEvent method
    const dispatchEventSpy = vi.spyOn(targetElement, 'dispatchEvent')

    // Dispatch the custom event
    const customEvent = new CustomEvent(customEventName)
    dispatchDiscreteCustomEvent(targetElement, customEvent)

    // Wait for the next tick to ensure event is dispatched
    await nextTick()

    // Check if dispatchEvent was called with the correct event
    expect(dispatchEventSpy).toHaveBeenCalledWith(customEvent)

    // Clean up
    dispatchEventSpy.mockRestore()
    document.body.removeChild(targetElement)
  })

  it('should not dispatch the custom event on null or undefined target', async () => {
    const customEventName = 'customEvent'

    // Mock dispatchEvent and check if it was not called
    const dispatchEventSpy = vi.spyOn(document, 'dispatchEvent')
    dispatchDiscreteCustomEvent(null, new CustomEvent(customEventName))

    // Wait for the next tick to ensure event is not dispatched
    await nextTick()

    expect(dispatchEventSpy).not.toHaveBeenCalled()

    dispatchEventSpy.mockRestore()
  })
})
