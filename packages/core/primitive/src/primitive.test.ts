import { describe, expect, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import { h } from 'vue'
import { Primitive } from './index'

describe('Primitive', () => {
  test('asChild with button', async () => {
    const example = {
      components: {
        Primitive,
      },
      setup() {
        const handleClick = () => {
          expect(true).toBe(true)
        }

        return () => h(Primitive.button, { asChild: true, onClick: handleClick }, {
          default: () => h('button', 'Click me New'),
        })
      },
    } as Component
    const wrapper = mount(example)

    wrapper.find('button').trigger('click')
    expect(wrapper.html()).toBe('<button>Click me New</button>')
  })

  test('asChild with button', async () => {
    const example = {
      components: {
        Primitive,
      },
      setup() {
        const handleClick = () => {
          expect(true).toBe(true)
        }

        return () => h(Primitive.button, { onClick: handleClick }, {
          default: () => 'Click me',
        })
      },
    } as Component
    const wrapper = mount(example)
    wrapper.find('button').trigger('click')
    expect(wrapper.html()).toBe('<button>Click me</button>')
  })

  it('should render div element correctly', () => {
    const wrapper = mount(Primitive.div)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders div element with custom class', () => {
    const wrapper = mount(Primitive.div, {
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

    const wrapper = mount(Primitive.div, {
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

    const wrapper = mount(Primitive.button, {
      slots: {
        default: buttonText,
      },
    })

    const element = wrapper.find('button')

    expect(element.exists()).toBe(true)
    expect(element.text()).toBe(buttonText)
  })

  it('emits a click event when button is clicked', async () => {
    const wrapper = mount(Primitive.button)

    const button = wrapper.find('button')

    await button.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('renders button element with custom attribute', () => {
    const attributeName = 'id'
    const attributeValue = 'button'

    const wrapper = mount(Primitive.button, {
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
    const wrapper = mount(Primitive.button, {
      props: {
        class: customClass,
      },
    })

    const element = wrapper.find('button')

    expect(element.exists()).toBe(true)
    expect(element.classes()).toContain(customClass)
  })

  it('renders button element with disabled attribute', () => {
    const wrapper = mount(Primitive.button, {
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
    const wrapper = mount(Primitive.button, {
      attrs: {
        'aria-label': ariaLabel,
      },
    })

    const element = wrapper.find('button')

    expect(element.exists()).toBe(true)
    expect(element.attributes('aria-label')).toBe(ariaLabel)
  })

  it('renders input element with type "text"', () => {
    const wrapper = mount(Primitive.input, {
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

    const wrapper = mount(Primitive.input, {
      props: {
        value,
      },
    })

    const element = wrapper.find('input')

    expect(element.exists()).toBe(true)
    expect(element.element.value).toBe(value)
  })

  it('emits focus and blur events on input element', async () => {
    const wrapper = mount(Primitive.input)
    const element = wrapper.find('input')

    await element.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await element.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('renders input element with type "email"', () => {
    const wrapper = mount(Primitive.input, {
      props: {
        type: 'email',
      },
    })

    const element = wrapper.find('input')
    expect(element.exists()).toBe(true)
    expect(element.attributes('type')).toBe('email')
  })

  it('renders input element with required attribute', () => {
    const wrapper = mount(Primitive.input, {
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
    const wrapper = mount(Primitive.a, {
      props: {
        href,
      },
    })

    const element = wrapper.find('a')
    expect(element.exists()).toBe(true)
    expect(element.attributes('href')).toBe(href)
  })

  it('renders anchor element with target="_blank" attribute', () => {
    const wrapper = mount(Primitive.a, {
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
    const wrapper = mount(Primitive.a, {
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
    const wrapper = mount(Primitive.a, {
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
    const wrapper = mount(Primitive.a, {
      props: {
        href: 'https://example.com',
      },
    })
    const element = wrapper.find('a')
    await element.trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  })

  test('asChild prop', () => {
    const wrapper = mount(Primitive.div, {
      props: {
        asChild: true,
      },
      slots: {
        default: 'Hello',
      },
    })
    expect(wrapper.html()).toBe('Hello')
  })

  test('asChild with attr', () => {
    const wrapper = mount(Primitive.div, {
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
    expect(wrapper.html()).toBe('<div id="test" class="text-red-500">Oku</div>')
  })

  test('asChild with props', () => {
    const wrapper = mount(Primitive.div, {
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
    expect(wrapper.html()).toBe('<div id="test" class="text-red-500" disabled="true">Oku</div>')
  })

  test('asChild with 2 children', () => {
    const wrapper = () => mount(Primitive.div, {
      props: {
        asChild: true,
      },
      slots: {
        default: `
          <div>Oku</div>
          <div>Oku</div>
        `,
      },
    })

    expect(() => wrapper()).toThrowError(/can only have one child/)
  })

  test('asChild with 2 children and attrs', () => {
    const wrapper = () => mount(Primitive.div, {
      props: {
        asChild: true,
        disabled: true,
      },
      attrs: {
        id: 'test',
        class: 'text-red-500',
      },
      slots: {
        default: `
          <div>Oku</div>
          <div>Oku</div>
        `,
      },
    })

    expect(() => wrapper()).toThrowError(/can only have one child/)
  })

  test('asChild with default 3 children', () => {
    const wrapper = () => mount(Primitive.div, {
      props: {
        asChild: true,
        disabled: true,
        disabled2: true,
      },
      slots: {
        default: `
          <div>Oku</div>
          <Hello>Oku</Hello>
          <Another>Oku</Another>
        `,
      },
    })
    expect(() => wrapper()).toThrowError(/can only have one child/)
  })

  test('asChild with default 3 children', () => {
    const wrapper = () => mount(Primitive.div, {
      props: {
        asChild: true,
        disabled: true,
        disabled2: true,
      },
      slots: {
        default: `
          <div>Oku</div>
          <Hello>Oku</Hello>
          <Another>Oku</Another>
        `,
      },
    })
    expect(() => wrapper()).toThrowError(/can only have one child/)
  })
})
