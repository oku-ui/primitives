import './style.css'
import { defineComponent, shallowRef } from 'vue'
import { Toggle } from '../index.ts'

export default { title: 'Components/Toggle' }

export const Styled = () => <Toggle class="root">Toggle</Toggle>

export function Controlled() {
  return defineComponent({
    setup() {
      const pressed = shallowRef(false)
      return () => <Toggle class="root" v-model={pressed.value}>Toggle</Toggle>
    },
  })
}

export function Chromatic() {
  return (
    <>
      <h1>Uncontrolled</h1>
      <h2>Off</h2>
      <Toggle class="root">Toggle</Toggle>

      <h2>On</h2>
      <Toggle class="root" defaultPressed>
        Toggle
      </Toggle>

      <h1>Controlled</h1>
      <h2>Off</h2>
      <Toggle class="root" pressed={false}>
        Toggle
      </Toggle>

      <h2>On</h2>
      <Toggle class="root" pressed>
        Toggle
      </Toggle>

      <h1>Disabled</h1>
      <Toggle class="root" {...{ disabled: true }}>
        Toggle
      </Toggle>

      <h1>State attributes</h1>
      <Toggle class="rootAttr">Toggle</Toggle>
      <Toggle class="rootAttr" {...{ disabled: true }}>
        Toggle
      </Toggle>
    </>
  )
}

Chromatic.parameters = { chromatic: { disable: false } }
