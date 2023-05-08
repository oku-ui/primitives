import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OkuLabel } from './label'

describe('label', () => {
  it('tag', () => {
    const wrapper = mount(OkuLabel, {})
    expect(wrapper.html()).equal(`<label>
  <!---->
</label>`)
  })

  it('tag attrs id', () => {
    const wrapper = mount(OkuLabel, {
      attrs: {
        id: 'test',
      },
    })
    expect(wrapper.html()).equal(`<label id="test">
  <!---->
</label>`)
  })

  it('slot test', () => {
    const wrapper = mount(OkuLabel, {
      slots: {
        default: 'test',
      },
    })
    expect(wrapper.html()).toContain('<label>test</label>')
  })
})
