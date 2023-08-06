import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { OkuRovingFocusGroup, OkuRovingFocusGroupItem } from './'

describe('OkuRovingFocusGroup', () => {
  describe('OkuRovingFocusGroupItem aschild', () => {
    it('empty', () => {
      const com = mount(OkuRovingFocusGroup, {
        slots: {
          default: () => h(OkuRovingFocusGroupItem, {
            asChild: true,
          }),
        },
      })
      expect(com.html()).equal(`<div tabindex="-1" style="outline: none;">
  <!---->
</div>`)
    })

    it('group and item button', () => {
      const com = mount(OkuRovingFocusGroup, {
        slots: {
          default: () => h(OkuRovingFocusGroupItem, {
            asChild: true,
          }, {
            default: () => h('button', {}, 'button'),
          }),
        },
      })
      expect(com.html()).equal('<div tabindex="-1" style="outline: none;"><button tabindex="-1" data-oku-collection-item="">button</button></div>')
    })

    it('group and item with button', () => {
      const com = mount(OkuRovingFocusGroup, {
        slots: {
          default: () => h(OkuRovingFocusGroupItem, {
            asChild: true,
          }, {
            default: () => h('button', { value: 'one' }, 'button'),
          }),
        },
      })
      expect(com.html()).equal('<div tabindex="-1" style="outline: none;"><button tabindex="-1" data-oku-collection-item="" value="one">button</button></div>')
    })

    it('group and item asChild group item two children', () => {
      const wrapper = () => mount(OkuRovingFocusGroup, {
        slots: {
          default: () => h(OkuRovingFocusGroupItem, {
            asChild: true,
          }, {
            default: () => [
              h('button', { value: 'one' }, 'button'),
              h('button', { value: 'two' }, 'button'),
            ],
          }),
        },
      })
      expect(() => wrapper()).toThrowError(/can only have one child/)
    })

    it('group and item with button', () => {
      const com = mount(OkuRovingFocusGroup, {
        slots: {
          default: () => [
            h(OkuRovingFocusGroupItem, {
              asChild: true,
            }, {
              default: () => h('button', { value: 'one' }, 'button'),
            }),
            h(OkuRovingFocusGroupItem, {
              asChild: true,
            }, {
              default: () => h('button', { value: 'two' }, 'button'),
            }),
          ],
        },
      })
      expect(com.html()).equal('<div tabindex="-1" style="outline: none;"><button tabindex="-1" data-oku-collection-item="" value="one">button</button><button tabindex="-1" data-oku-collection-item="" value="two">button</button></div>')
    })

    it('emty OkuRovingFocusGroup', () => {
      const com = mount(OkuRovingFocusGroup)
      expect(com.html()).equal(`<div tabindex="-1" style="outline: none;">
  <!---->
</div>`)
    })
  })
})
