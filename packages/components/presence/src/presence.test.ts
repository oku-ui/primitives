import { describe, expect, it } from 'vitest'
import { type Component, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { OkuPresence } from './presence'

describe('label', async () => {
  it('close content', async () => {
    const component = {
      components: {
        OkuPresence,
      },
      template: `
       <div>
       <button @click="toggle">
        toggle - {{ open }}
      </button>
      <OkuPresence :present="open">
        <div>
          content
        </div>
      </OkuPresence>
      </div>
      `,
      setup() {
        const open = ref(false)
        const toggle = () => {
          open.value = !open.value
        }
        return {
          open,
          toggle,
        }
      },
    } as Component
    const wrapper = mount(component, {})
    expect(wrapper.html()).toContain(`<div><button> toggle - false</button>
  <!---->
</div>`)
  })

  it('open content', async () => {
    const component = {
      components: {
        OkuPresence,
      },
      template: `
       <div>
       <button @click="toggle">
        toggle - {{ open }}
      </button>
      <OkuPresence :present="open">
        <div>
          content
        </div>
      </OkuPresence>
      </div>
      `,
      setup() {
        const open = ref(false)
        const toggle = () => {
          open.value = !open.value
        }
        return {
          open,
          toggle,
        }
      },
    } as Component
    const wrapper = mount(component, {})
    await wrapper.find('button').trigger('click')

    expect(wrapper.html()).toContain(`<div><button> toggle - true</button>
  <div present="true"> content </div>
</div>`)
  })

  it('open content', async () => {
    const component = {
      components: {
        OkuPresence,
      },
      template: `
       <div>
       <button @click="toggle">
        toggle - {{ open }}
      </button>
      <OkuPresence :present="open" class="text-white">
        <div>
          content
        </div>
      </OkuPresence>
      </div>
      `,
      setup() {
        const open = ref(false)
        const toggle = () => {
          open.value = !open.value
        }
        return {
          open,
          toggle,
        }
      },
    } as Component
    const wrapper = mount(component, {})
    expect(wrapper.html()).toContain(`<div><button> toggle - false</button>
  <!---->
</div>`)

    await wrapper.find('button').trigger('click')

    expect(wrapper.html()).toContain(`<div><button> toggle - true</button>
  <div present="true" class="text-white"> content </div>
</div>`)
  })

  // TODO: add transition test
})
