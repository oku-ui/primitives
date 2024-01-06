import { mount } from '@vue/test-utils'
import { describe, expect, it, vitest } from 'vitest'
import type { Component } from 'vue'
import { h, ref } from 'vue'
import { OkuCollapsible, OkuCollapsibleContent, OkuCollapsibleContentImpl, OkuCollapsibleTrigger } from '@oku-ui/collapsible'

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuCollapsible, { ...attrs }, slots)
  },
} as Component

const componentVModel = {
  setup(props, { attrs }) {
    const checked = ref(false)
    return () => h(OkuCollapsible, {
      ...attrs,
      'modelValue': checked.value,
      'onUpdate:modelValue': e => checked.value = e,
    }, {
      default: () => h(OkuCollapsibleTrigger),
    })
  },
} as Component

const componentOpen = {
  setup(props, { attrs }) {
    const open = ref(false)
    return () => h(OkuCollapsible, {
      ...attrs,
      open: open.value,
      onOpenChange: e => open.value = e,
    }, {
      default: () => h(OkuCollapsibleTrigger),
    })
  },
} as Component

describe('okuCheckbox', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(component)
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it('renders the component correctly with a label', () => {
    const wrapper = mount(component, {
      slots: {
        default: 'Label',
      },
    })
    expect(wrapper.html()).toContain('<div data-state="closed">Label</div>')
    wrapper.unmount()
  })

  it('renders the component correctly with a label and a trigger', () => {
    const wrapper = mount(component, {
      slots: {
        default: () => h(OkuCollapsibleTrigger),
      },
    })
    expect(wrapper.html()).toContain(`<div data-state="closed"><button type="button" aria-controls="oku-0" aria-expanded="false" data-state="closed">
    <!---->
  </button></div>`)

    wrapper.unmount()
  })

  it('renders the component correctly with a label and a trigger and a trigger label', () => {
    const wrapper = mount(component, {
      slots: {
        default: () => h(OkuCollapsibleTrigger, {}, {
          default: () => 'Trigger',
        }),
      },
    })
    expect(wrapper.html()).toContain('<div data-state="closed"><button type="button" aria-controls="oku-1" aria-expanded="false" data-state="closed">Trigger</button></div>')

    wrapper.unmount()
  })

  it('v-model works', async () => {
    const wrapper = mount(componentVModel)
    expect(wrapper.html()).toContain(`<div data-state="closed"><button type="button" aria-controls="oku-2" aria-expanded="false" data-state="closed">
    <!---->
  </button></div>`)

    await wrapper.find('button').trigger('click')
    expect(wrapper.html()).toContain(`<div data-state="open"><button type="button" aria-controls="oku-2" aria-expanded="true" data-state="open">
    <!---->
  </button></div>`)

    wrapper.unmount()
  })

  it('open works', async () => {
    const wrapper = mount(componentOpen)

    expect(wrapper.html()).toContain(`<div data-state="closed"><button type="button" aria-controls="oku-3" aria-expanded="false" data-state="closed">
    <!---->
  </button></div>`)

    await wrapper.find('button').trigger('click')
    expect(wrapper.html()).toContain(`<div data-state="open"><button type="button" aria-controls="oku-3" aria-expanded="true" data-state="open">
    <!---->
  </button></div>`)

    wrapper.unmount()
  })

  it('okuCollapsibleTrigger error mount', async () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuCollapsibleTrigger)

    expect(() => wrapper()).toThrowError('`OkuCollapsibleTrigger` must be used within `OkuCollapsible`')
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuCollapsible)" not found.')
  })

  it('okuCollapsibleContent error mount', async () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuCollapsibleContent)

    expect(() => wrapper()).toThrowError('`OkuCollapsibleContent` must be used within `OkuCollapsible`')

    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuCollapsible)" not found.')
  })

  it('okuCollapsibleContentImpl error mount', async () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuCollapsibleContentImpl)

    expect(() => wrapper()).toThrowError('`OkuCollapsibleContent` must be used within `OkuCollapsible`')

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuCollapsible)" not found.')
  })
})
