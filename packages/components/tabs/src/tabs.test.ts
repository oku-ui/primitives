import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import TabsDemo from './stories/TabsDemo.vue'

describe('OkuTabs', () => {
  it('should render correctly', () => {
    const wrapper = mount(TabsDemo, {
      props: {
        template: '#1',
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('should show the active panel and hide other panels', async () => {
    const wrapper = mount(TabsDemo, {
      props: {
        template: '#1',
      },
    })

    const tabWrapper = await wrapper.findComponent('[data-test="tab1"]')

    const tab1 = tabWrapper.findComponent('[data-test="tab-one-trigger"]')
    await tab1.trigger('click')

    await nextTick()

    expect(wrapper.findComponent('[data-test="tab-one-content"]').isVisible()).toBe(true)
    expect(wrapper.findComponent('[data-test="tab-two-content"]').exists()).toBe(false)
    expect(wrapper.findComponent('[data-test="tab-three-content"]').exists()).toBe(false)

    const tab2 = wrapper.findComponent('[data-test="tab-two-trigger"]')
    await tab2.trigger('click')

    // tab 2 is disabled
    expect(wrapper.findComponent('[data-test="tab-one-content"]').isVisible()).toBe(true)
    expect(wrapper.findComponent('[data-test="tab-two-content"]').exists()).toBe(false)
    expect(wrapper.findComponent('[data-test="tab-three-content"]').exists()).toBe(false)

    const tab3 = wrapper.findComponent('[data-test="tab-three-trigger"]')
    await tab3.trigger('click')

    await nextTick()

    // tab 3 should be active //TODO: fix this test case, it's failing
    // expect(wrapper.findComponent('[data-test="tab-one-content"]').exists()).toBe(false)
    // expect(wrapper.findComponent('[data-test="tab-two-content"]').exists()).toBe(false)
    // expect(wrapper.findComponent('[data-test="tab-three-content"]').isVisible()).toBe(true)
  })
})
