import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { useTypeaheadSearch } from '../src/useTypeAheadSearch'

describe('useTypeaheadSearch', () => {
  it('should update searchRef and call onSearchChange', async () => {
    const onSearchChange = vi.fn()
    const wrapper = mount({
      setup() {
        const [searchRef, handleTypeaheadSearch]
          = useTypeaheadSearch(onSearchChange)
        return { searchRef, handleTypeaheadSearch }
      },
      template: '<div></div>',
    })

    // Simulate typing "abc"
    await wrapper.vm.handleTypeaheadSearch('a')
    await wrapper.vm.handleTypeaheadSearch('b')
    await wrapper.vm.handleTypeaheadSearch('c')

    // Expect searchRef to be "abc"
    expect(wrapper.vm.searchRef).toBe('abc')
    expect(onSearchChange).toHaveBeenCalledWith('abc')
  })

  it('should reset the searchRef and clear the timer on resetTypeahead', async () => {
    const onSearchChange = vi.fn()

    const wrapper = mount({
      setup() {
        const [searchRef, handleTypeaheadSearch, resetTypeahead]
          = useTypeaheadSearch(onSearchChange)
        return { searchRef, handleTypeaheadSearch, resetTypeahead }
      },
      template: '<div></div>',
    })

    // Simulate typing "abc"
    await wrapper.vm.handleTypeaheadSearch('a')
    await wrapper.vm.handleTypeaheadSearch('b')
    await wrapper.vm.handleTypeaheadSearch('c')

    // Call resetTypeahead
    wrapper.vm.resetTypeahead()

    expect(wrapper.vm.searchRef).toBe('')

    // Expect the timer to be cleared
    expect(wrapper.vm.timerRef).toBe(undefined)
  })

  it('should clear the timer on unmounted', async () => {
    const onSearchChange = vi.fn()
    const wrapper = mount({
      setup() {
        const [searchRef, handleTypeaheadSearch]
          = useTypeaheadSearch(onSearchChange)
        return { searchRef, handleTypeaheadSearch }
      },
      template: '<div></div>',
    })

    // Simulate typing "abc"
    await wrapper.vm.handleTypeaheadSearch('a')
    await wrapper.vm.handleTypeaheadSearch('b')

    wrapper.unmount()

    // Expect the timer to be cleared on unmount
    expect(wrapper.vm.timerRef).toBe(undefined)
  })
})
