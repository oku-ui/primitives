import './style.css'
import { defineComponent, shallowRef } from 'vue'
import { Toggle } from '../index.ts'

export default { title: 'Components/Toggle' }

export const Styled = () => <Toggle class="toggle_root">Toggle</Toggle>

export function Controlled() {
  return defineComponent({
    setup() {
      const pressed = shallowRef(false)
      function setPressed(newPressed: boolean) {
        pressed.value = newPressed
      }
      return () => <Toggle class="toggle_root" pressed={pressed.value} onUpdate:pressed={setPressed}>Toggle</Toggle>
    },
  })
}

export function Chromatic() {
  return (
    <>
      <h1>Uncontrolled</h1>
      <h2>Off</h2>
      <Toggle class="toggle_root">Toggle</Toggle>

      <h2>On</h2>
      <Toggle class="toggle_root" defaultPressed>
        Toggle
      </Toggle>

      <h1>Controlled</h1>
      <h2>Off</h2>
      <Toggle class="toggle_root" pressed={false}>
        Toggle
      </Toggle>

      <h2>On</h2>
      <Toggle class="toggle_root" pressed>
        Toggle
      </Toggle>

      <h1>Disabled</h1>
      <Toggle class="toggle_root" {...{ disabled: true }}>
        Toggle
      </Toggle>

      <h1>State attributes</h1>
      <Toggle class="toggle_rootAttr">Toggle</Toggle>
      <Toggle class="toggle_rootAttr" {...{ disabled: true }}>
        Toggle
      </Toggle>
    </>
  )
}

Chromatic.parameters = { chromatic: { disable: false } }
