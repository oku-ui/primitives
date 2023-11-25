import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { useRect } from '../src/useRect'

describe('useRect', () => {
  it('props', () => {
    const wrapper = mount({
      template: '<div></div>',
      setup() {
        const { measurableElement } = useRect()
        expect(measurableElement.value).toBeNull()
        return {
          dir: measurableElement,
        }
      },
    })

    expect(wrapper.vm.dir).toBeNull()
  })
})
