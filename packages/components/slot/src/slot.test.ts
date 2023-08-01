import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, ref } from 'vue'
import type { Component } from 'vue'
import { OkuSlot, OkuSlottable } from './slot'

const ButtonTest: Component = {
  components: {
    OkuSlot,
    OkuSlottable,
  },
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    return () => {
      const Tag: any = props.asChild ? OkuSlot : 'button'
      return h(
        Tag,
        null,
        [
          slots.iconLeft && slots.iconLeft(),
          h(OkuSlottable, {}, {
            default: () => slots.default && slots.default(),
          }),
          slots.iconRight && slots.iconRight(),
        ],
      )
    }
  },

}

describe('given a Button with Slottable', () => {
  describe('without asChild', () => {
    it('should render a button with icon on the left/right', () => {
      const _component: Component = {
        components: {
          ButtonTest,
        },
        setup() {
          return () => h(ButtonTest, null, {
            iconLeft: () => h('span', {}, 'left'),
            iconRight: () => h('span', {}, 'right'),
            default: () => [
              'Button ',
              h('em', {}, 'text'),
            ],
          })
        },
      }

      const wrapper = mount(_component)
      expect(wrapper.html()).equal('<button><span>left</span>Button <em>text</em><span>right</span></button>')
    })
  })

  describe('with asChild', () => {
    it('should render a button with icon on the left/right', () => {
      const _component: Component = {
        components: {
          ButtonTest,
        },
        setup() {
          return () => h(ButtonTest, {
            asChild: true,
          },
          {
            iconLeft: () => h('span', {}, 'left'),
            iconRight: () => h('span', {}, 'right'),
            default: () => h('a', {
              href: 'https://oku-ui.com',
            }, {
              default: () => [
                'Button ',
                h('em', {}, 'text'),
              ],
            }),
          })
        },
      }

      const wrapper = mount(_component)
      expect(wrapper.html()).equal('<a href="https://oku-ui.com"><span>left</span>Button <em>text</em><span>right</span></a>')
    })
  })
})

describe('given a slotted Trigger', () => {
  it('with onClick on itself', async () => {
    const _component: Component = {
      components: {
        OkuSlot,
      },
      setup() {
        const click = ref(false)
        const onClick = () => {
          click.value = true
        }
        return () => h(OkuSlot, {
          onClick,
        }, {
          default: () => h('button', {
            type: 'button',
            class: 't',
          }, click.value ? 'Clicked' : 'Click me'),
        })
      },
    }

    const wrapper = mount(_component)
    expect(wrapper.html()).equal('<button type="button" class="t">Click me</button>')
    await wrapper.trigger('click')
    expect(wrapper.html()).equal('<button type="button" class="t">Clicked</button>')
  })

  it('with onClick on the child', async () => {
    const _component: Component = {
      components: {
        OkuSlot,
      },
      setup() {
        const click = ref(false)
        const onClick = () => {
          click.value = true
        }
        return () => h(OkuSlot, {}, {
          default: () => h('button', {
            type: 'button',
            onClick,
          }, click.value ? 'Clicked' : 'Click me'),
        })
      },
    }

    const wrapper = mount(_component)
    expect(wrapper.html()).equal('<button type="button">Click me</button>')
    await wrapper.trigger('click')
    expect(wrapper.html()).equal('<button type="button">Clicked</button>')
  })

  it('with onClick on the child and on itself', async () => {
    const _component: Component = {
      components: {
        OkuSlot,
      },
      setup() {
        const click = ref(false)
        const onClick = () => {
          click.value = true
        }
        return () => h(OkuSlot, {
          onClick,
        }, {
          default: () => h('button', {
            type: 'button',
            onClick,
          }, click.value ? 'Clicked' : 'Click me'),
        })
      },
    }

    const wrapper = mount(_component)
    expect(wrapper.html()).equal('<button type="button">Click me</button>')
    await wrapper.trigger('click')
    expect(wrapper.html()).equal('<button type="button">Clicked</button>')
  })

  it('with onClick on itself AND undefined onClick on the child', async () => {
    const _component: Component = {
      components: {
        OkuSlot,
      },
      setup() {
        const click = ref(false)
        const onClick = () => {
          click.value = true
        }
        return () => h(OkuSlot, {
          onClick,
        }, {
          default: () => h('button', {
            type: 'button',
          }, click.value ? 'Clicked' : 'Click me'),
        })
      },
    }

    const wrapper = mount(_component)
    expect(wrapper.html()).equal('<button type="button">Click me</button>')
    await wrapper.trigger('click')
    expect(wrapper.html()).equal('<button type="button">Clicked</button>')
  })

  it('with undefined onClick on itself AND onClick on the child', async () => {
    const _component: Component = {
      components: {
        OkuSlot,
      },
      setup() {
        const click = ref(false)
        const onClick = () => {
          click.value = true
        }
        return () => h(OkuSlot, {}, {
          default: () => h('button', {
            type: 'button',
            onClick,
          }, click.value ? 'Clicked' : 'Click me'),
        })
      },
    }

    const wrapper = mount(_component)
    expect(wrapper.html()).equal('<button type="button">Click me</button>')
    await wrapper.trigger('click')
    expect(wrapper.html()).equal('<button type="button">Clicked</button>')
  })
})
