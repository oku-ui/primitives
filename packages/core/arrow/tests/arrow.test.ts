import { beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import type { VueNode } from '@vue/test-utils/dist/types'
import type { Component } from 'vue'
import { h } from 'vue'
import { axe } from 'vitest-axe'
import { OkuArrow } from '../src'

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuArrow, { ...attrs }, slots)
  },
} as Component

// TODO: delete any
const WIDTH = 40
const HEIGHT = 30

describe('label', () => {
  let _wrapper: VueWrapper
  let svg: VueNode<SVGSVGElement>

  beforeEach(() => {
    const wrapper = mount(component, {
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
    expect(_wrapper.element).toMatchSnapshot()
  })

  /**
 * @vitest-environment jsdom
 */
  it('shold have no accessibility violations', async () => {
    // https://github.com/capricorn86/happy-dom/issues/978
    const results = await axe(_wrapper.element)
    // TODO:77 https://github.com/chaance/vitest-axe/issues/7
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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
