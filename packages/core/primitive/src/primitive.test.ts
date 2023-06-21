import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { Primitive } from './index';

describe('Primitive', () => {
  it('should render div element correctly', () => {
    const wrapper = mount(Primitive.div);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
  });

  it('renders div element with custom class', () => {
    const wrapper = mount(Primitive.div, {
      props: {
        class: 'custom-class',
      },
    });

    const element = wrapper.find('div');

    expect(element.exists()).toBe(true);
    expect(element.classes()).toContain('custom-class');
  });

  it('renders div element with default slot content', () => {
    const defaultSlot = 'default slot content';

    const wrapper = mount(Primitive.div, {
      slots: {
        default: defaultSlot,
      },
    });

    const element = wrapper.find('div');

    expect(element.exists()).toBe(true);
    expect(element.text()).toBe(defaultSlot);
  });

  it('renders button element with custom text', () => {
    const buttonText = 'Login';

    const wrapper = mount(Primitive.button, {
      slots: {
        default: buttonText,
      },
    });

    const element = wrapper.find('button');

    expect(element.exists()).toBe(true);
    expect(element.text()).toBe(buttonText);
  });

  it('emits a click event when button is clicked', async () => {
    const wrapper = mount(Primitive.button);

    const button = wrapper.find('button');

    await button.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it('renders button element with custom attribute', () => {
    const attributeName = 'id';
    const attributeValue = 'button';

    const wrapper = mount(Primitive.button, {
      attrs: {
        [attributeName]: attributeValue,
      },
    });

    const element = wrapper.find('button');

    expect(element.exists()).toBe(true);
    expect(element.attributes(attributeName)).toBe(attributeValue);
  });

  it('renders button element with custom class', () => {
    const customClass = 'custom-class';
    const wrapper = mount(Primitive.button, {
      props: {
        class: customClass,
      },
    });

    const element = wrapper.find('button');

    expect(element.exists()).toBe(true);
    expect(element.classes()).toContain(customClass);
  });
});
