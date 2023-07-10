import { beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import type { VueNode } from '@vue/test-utils/dist/types'
import { OkuArrow } from './arrow'

const WIDTH = 40
const HEIGHT = 30

describe('label', () => {
  let _wrapper: VueWrapper
  let svg: VueNode<SVGSVGElement>

  beforeEach(() => {
    const wrapper = mount(OkuArrow, {
      props: {
        width: WIDTH,
        height: HEIGHT,
      },
      attrs: {
        'data-testid': 'test-arrow',
      },
    })
    _wrapper = wrapper
  })

  it('tag', () => {
    expect(_wrapper.html()).equal(`<svg data-testid="test-arrow" width="40" height="30" viewBox="0 0 30 10" preserveAspectRatio="none">
  <polygon points="0,0 30,0 15,10"></polygon>
</svg>`)
  })

  it('shold have no accessibility violations', async () => {
    const results = await axe(_wrapper.element)
    // @ts-expect-error toHaveNoViolations add types project
    expect(results).toHaveNoViolations()
  })

  it('should have width attribute', () => {
    svg = _wrapper.find('svg').element
    expect(svg.getAttribute('width')).equal(`${WIDTH}`)
  })

  it('should have height attribute', () => {
    svg = _wrapper.find('svg').element
    expect(svg.getAttribute('height')).equal(`${HEIGHT}`)
  })
})
