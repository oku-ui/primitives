import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import {
  OkuAlertDialog,
  OkuAlertDialogAction,
  OkuAlertDialogCancel,
  OkuAlertDialogContent,
  OkuAlertDialogDescription,
  OkuAlertDialogDescriptionWarning,
  OkuAlertDialogOverlay,
  OkuAlertDialogPortal,
  OkuAlertDialogTitle,
  OkuAlertDialogTrigger,

} from '../src'

import StyledVue from '../src/stories/Styled.vue'
import Controlled from '../src/stories/Controlled.vue'

enableAutoUnmount(afterEach)

describe('OkuAlertDialog', () => {
  it('OkuAlertDialog renders correctly', () => {
    const wrapper = mount(OkuAlertDialog)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('OkuAlertDialogAction renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuAlertDialogAction)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuDialog)" not found.')
  })

  it('OkuAlertDialogCancel renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuAlertDialogCancel)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuAlertDialog)" not found.')
  })

  it('OkuAlertDialogContent renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuAlertDialogContent)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuDialog)" not found.')
  })

  it('OkuAlertDialogDescription renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuAlertDialogDescription)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuDialog)" not found.')
  })

  it('OkuAlertDialogDescriptionWarning renders correctly', () => {
    const wrapper = () => mount(OkuAlertDialogDescriptionWarning)
    expect(() => wrapper().html()).toMatchSnapshot()
  })

  it('OkuAlertDialogOverlay renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuAlertDialogOverlay)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuDialog)" not found.')
  })

  it('OkuAlertDialogPortal renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuAlertDialogPortal)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuDialog)" not found.')
  })

  it('OkuAlertDialogTitle renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuAlertDialogTitle)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuDialog)" not found.')
  })

  it('OkuAlertDialogTrigger renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuAlertDialogTrigger)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuDialog)" not found.')
  })

  describe('StyledVue', () => {
    let wrapper: VueWrapper<InstanceType<typeof StyledVue>>

    beforeEach(async () => {
      wrapper = mount(StyledVue, {
        attachTo: document.body,
      })

      await wrapper.find('[class="alert-dialog-trigger"]').trigger('click')
      await nextTick()
    })

    /**
    * @vitest-environment jsdom
    */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('renders correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be able to open', async () => {
      expect(document.body).toMatchSnapshot()
    })

    it('should be able to close', async () => {
      await wrapper.find('[class="alert-dialog-trigger"]').trigger('click')
      await nextTick()
      expect(document.body).toMatchSnapshot()
    })
  })

  describe('Controlled', () => {
    let wrapper: VueWrapper<InstanceType<typeof Controlled>>

    beforeEach(async () => {
      wrapper = mount(Controlled, {
        attachTo: document.body,
      })

      await wrapper.find('[class="alert-dialog-trigger"]').trigger('click')
      await nextTick()
    })

    /**
     * @vitest-environment jsdom
      */

    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('renders correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be able to open', async () => {
      expect(document.body).toMatchSnapshot()
    })

    it('should be able to close', async () => {
      await wrapper.find('[class="alert-dialog-trigger"]').trigger('click')
      await nextTick()
      expect(document.body).toMatchSnapshot()
    })
  })
})
