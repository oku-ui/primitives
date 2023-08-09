import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { useRect } from '../src/use-rect'

describe('useRect', () => {
  it('rect', async () => {
    const { rect } = useRect()
    expect(rect.value).toBeNull()
  })

  it('props', () => {
    const { measurableElement } = useRect()
    expect(measurableElement.value).toBeNull()

    const wrapper = mount({
      template: '<div></div>',
      setup() {
        return {
          dir: measurableElement,
        }
      },
    })

    expect(wrapper.vm.dir).toBeNull()
  })
})
