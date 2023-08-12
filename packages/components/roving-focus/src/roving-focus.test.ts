import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { OkuRovingFocusGroup } from './'

// It also works live, but the gear gives an error in the tests.

describe('OkuRovingFocusGroup', () => {
  describe('OkuRovingFocusGroupItem aschild', () => {
    it('empty', () => {
      const com = mount(OkuRovingFocusGroup, {
        // slots: {
        //   default: () => [
        //     h(OkuRovingFocusGroupItem, {
        //       asChild: true,
        //     }),
        //     h(OkuRovingFocusGroupItem, {
        //       asChild: true,
        //     }),
        //   ],
        // },
      })
      expect(com.html()).equal(`<div tabindex="-1" style="outline: none;">
  <!---->
</div>`)
    })

    // it('one button', async () => {
    //   const com = mount(OkuRovingFocusGroup, {
    //     slots: {
    //       default: () => [
    //         h(OkuRovingFocusGroupItem, {
    //           asChild: true,
    //         }, {
    //           default: () => h('button', {}, 'button'),
    //         }),
    //       ],
    //     },
    //   })
    //   expect(com.html()).equal('<div tabindex="0" style="outline: none;"><button tabindex="-1" data-oku-collection-item="">button</button></div>')
    // })

    //     it('group and item button', () => {
    //       const com = mount(OkuRovingFocusGroup, {
    //         slots: {
    //           default: () => h(OkuRovingFocusGroupItem, {
    //             asChild: true,
    //           }, {
    //             default: () => h('button', {}, 'button'),
    //           }),
    //         },
    //       })
    //       expect(com.html()).equal('<div tabindex="-1" style="outline: none;"><button tabindex="-1" data-oku-collection-item="">button</button></div>')
    //     })

    //     it('group and item with button', () => {
    //       const com = mount(OkuRovingFocusGroup, {
    //         slots: {
    //           default: () => h(OkuRovingFocusGroupItem, {
    //             asChild: true,
    //           }, {
    //             default: () => h('button', { value: 'one' }, 'button'),
    //           }),
    //         },
    //       })
    //       expect(com.html()).equal('<div tabindex="-1" style="outline: none;"><button tabindex="-1" data-oku-collection-item="" value="one">button</button></div>')
    //     })

    //     it('group and item asChild group item two children', () => {
    //       const wrapper = () => mount(OkuRovingFocusGroup, {
    //         slots: {
    //           default: () => h(OkuRovingFocusGroupItem, {
    //             asChild: true,
    //           }, {
    //             default: () => [
    //               h('button', { value: 'one' }, 'button'),
    //               h('button', { value: 'two' }, 'button'),
    //             ],
    //           }),
    //         },
    //       })
    //       expect(() => wrapper()).toThrowError(/can only have one child/)
    //     })

    //     it('group and item with button', () => {
    //       const com = mount(OkuRovingFocusGroup, {
    //         slots: {
    //           default: () => [
    //             h(OkuRovingFocusGroupItem, {
    //               asChild: true,
    //             }, {
    //               default: () => h('button', { value: 'one' }, 'button'),
    //             }),
    //             h(OkuRovingFocusGroupItem, {
    //               asChild: true,
    //             }, {
    //               default: () => h('button', { value: 'two' }, 'button'),
    //             }),
    //           ],
    //         },
    //       })
    //       expect(com.html()).equal('<div tabindex="-1" style="outline: none;"><button tabindex="-1" data-oku-collection-item="" value="one">button</button><button tabindex="-1" data-oku-collection-item="" value="two">button</button></div>')
    //     })

  //     it('emty OkuRovingFocusGroup', () => {
  //       const com = mount(OkuRovingFocusGroup)
  //       expect(com.html()).equal(`<div tabindex="-1" style="outline: none;">
  //   <!---->
  // </div>`)
  //     })
  })

  // describe('OkuRovingFocusGroupItem', () => {
  //   it('empty', () => {
  //     const com = mount({
  //       components: {
  //         OkuRovingFocusGroupItem,
  //         OkuRovingFocusGroup,
  //         ButtonProvide,
  //         ButtonComponent,
  //       },
  //       template: `
  //             <ButtonProvide>
  //       <OkuRovingFocusGroup class="flex flex-col" orientation="vertical" dir="ltr">
  //         <ButtonComponent value="one" s>
  //           one
  //         </ButtonComponent>
  //         <ButtonComponent value="two" disabled>
  //           two
  //         </ButtonComponent>
  //         <ButtonComponent value="three">
  //           three
  //         </ButtonComponent>
  //       </OkuRovingFocusGroup>
  //     </ButtonProvide>`,
  //     } as Component)

  //     const wrapper = com

  //     expect(wrapper.html()).equal('<div tabindex="0" data-orientation="vertical" class="flex flex-col" style="outline: none;"><button class="w-40 h-6 text-white rounded-sm bg-gray-500" tabindex="-1" data-orientation="vertical" data-oku-collection-item=""> one </button><button class="w-40 h-6 text-white rounded-sm bg-gray-500" tabindex="-1" data-orientation="vertical" data-oku-collection-item=""> two </button><button class="w-40 h-6 text-white rounded-sm bg-gray-500" tabindex="-1" data-orientation="vertical" data-oku-collection-item=""> three </button></div>')
  //   })
  // })

  // describe('OkuRovingFocusGroupItem', () => {
  //   it('empty', () => {
  //     const com = mount({
  //       components: {
  //         OkuRovingFocusGroupItem,
  //         OkuRovingFocusGroup,
  //       },
  //       template: `
  //             <OkuRovingFocusGroup  class="flex gap-4" orientation="horizontal">
  //       <OkuRovingFocusGroupItem
  //         as-child
  //         focusable :active="true" @click="() => console.log('click')"
  //         @focus="() => console.log('focus')"
  //       >
  //         <button>1</button>
  //       </OkuRovingFocusGroupItem>
  //       <OkuRovingFocusGroupItem as-child focusable :active="true">
  //         <button>2</button>
  //       </OkuRovingFocusGroupItem>
  //       <OkuRovingFocusGroupItem as-child :focusable="false" :active="true">
  //         <button disable>
  //           2- disable
  //         </button>
  //       </OkuRovingFocusGroupItem>
  //       <OkuRovingFocusGroupItem as-child focusable :active="true">
  //         <button>2</button>
  //       </OkuRovingFocusGroupItem>
  //     </OkuRovingFocusGroup>`,
  //     } as Component)

  //     const data = com.html()

  //     expect(data).equal('<div tabindex="0" data-orientation="horizontal" class="flex gap-4" style="outline: none;"><button tabindex="-1" data-orientation="horizontal" data-oku-collection-item="">1</button><button tabindex="-1" data-orientation="horizontal" data-oku-collection-item="">2</button><button disable="" tabindex="-1" data-orientation="horizontal" data-oku-collection-item=""> 2- disable </button><button tabindex="-1" data-orientation="horizontal" data-oku-collection-item="">2</button></div>')
  //   })
  // })
})
