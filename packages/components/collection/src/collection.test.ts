import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, ref, watchEffect } from 'vue'
import { createCollection } from './collection'

describe('collection', () => {
  it('renders the component correctly', () => {
    type ItemData = { disabled?: boolean }

    const { CollectionSlot, CollectionItemSlot, CollectionProvider, useCollection } = createCollection<HTMLLIElement, ItemData>('List', {
      disabled: {
        type: Boolean,
        default: false,
      },
    })
    const TestComponent = {
      components: {
        CollectionSlot,
      },
      setup() {
        function LogsItem() {
          const data = useCollection('List')
          const refData = ref()
          watchEffect(() => {
            if (data.value)
              refData.value = data.value
          })
          if (refData.value?.[2]?.disabled)
            expect('disabled').toBe('disabled')
        }

        return () => h(CollectionProvider, {}, {
          default: () => h(CollectionSlot, {}, {
            default: () => h('ul', { class: 'w-20' }, {
              default: () => [
                h(CollectionItemSlot, {}, {
                  default: () => h('li', {}, 'Item 1'),
                }),
                h(CollectionItemSlot, {}, {
                  default: () => h('li', {}, 'Item 2'),
                }),
                h(CollectionItemSlot, { disabled: true }, {
                  default: () => h('li', {}, 'Item 3'),
                }),
                h(LogsItem),
              ],
            }),
          }),
        })
      },
    }
    const wrapper = mount(TestComponent)

    expect(wrapper.html()).toBe(`<ul class="w-20">
  <li data-oku-collection-item="">Item 1</li>
  <li data-oku-collection-item="">Item 2</li>
  <li data-oku-collection-item="">Item 3</li>
  <!---->
</ul>`,
    )
  })
})
