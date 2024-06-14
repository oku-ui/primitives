import './style.css'
import { defineComponent, shallowRef } from 'vue'
import { ToggleGroup, ToggleGroupItem } from '../index.ts'

export default { title: 'Components/ToggleGroup' }

export function Single() {
  return defineComponent({
    setup() {
      const value = shallowRef<string>()
      function setValue(newValue: string) {
        value.value = newValue
      }
      return () => (
        <>
          <h1>Uncontrolled</h1>
          <ToggleGroup type="single" class="root" aria-label="Options" defaultValue="1">
            <ToggleGroupItem value="1" class="item">
              Option 1
            </ToggleGroupItem>
            <ToggleGroupItem value="2" class="item">
              Option 2
            </ToggleGroupItem>
            <ToggleGroupItem value="3" class="item">
              Option 3
            </ToggleGroupItem>
          </ToggleGroup>

          <h1>Controlled</h1>
          <ToggleGroup
            type="single"
            class="root"
            aria-label="Options"
            value={value.value}
            onUpdate:value={setValue}
          >
            <ToggleGroupItem value="1" class="item">
              Option 1
            </ToggleGroupItem>
            <ToggleGroupItem value="2" class="item">
              Option 2
            </ToggleGroupItem>
            <ToggleGroupItem value="3" class="item">
              Option 3
            </ToggleGroupItem>
          </ToggleGroup>
        </>
      )
    },
  })
}

export function Vertical() {
  return (
    <ToggleGroup
      type="single"
      orientation="vertical"
      class="root"
      aria-label="Options"
      defaultValue="1"
    >
      <ToggleGroupItem value="1" class="item">
        Option 1
      </ToggleGroupItem>
      <ToggleGroupItem value="2" class="item">
        Option 2
      </ToggleGroupItem>
      <ToggleGroupItem value="3" class="item">
        Option 3
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function Multiple() {
  return defineComponent({
    setup() {
      const value = shallowRef<string[]>([])
      function setValue(newValue: string[]) {
        value.value = newValue
      }
      return () => (
        <>
          <h1>Uncontrolled</h1>
          <ToggleGroup
            type="multiple"
            class="root"
            aria-label="Options"
            defaultValue={['1']}
          >
            <ToggleGroupItem value="1" class="item">
              Option 1
            </ToggleGroupItem>
            <ToggleGroupItem value="2" class="item">
              Option 2
            </ToggleGroupItem>
            <ToggleGroupItem value="3" class="item">
              Option 3
            </ToggleGroupItem>
          </ToggleGroup>

          <h1>Controlled</h1>
          <ToggleGroup
            type="multiple"
            class="root"
            aria-label="Options"
            value={value.value}
            onUpdate:value={setValue}
          >
            <ToggleGroupItem value="1" class="item">
              Option 1
            </ToggleGroupItem>
            <ToggleGroupItem value="2" class="item">
              Option 2
            </ToggleGroupItem>
            <ToggleGroupItem value="3" class="item">
              Option 3
            </ToggleGroupItem>
          </ToggleGroup>
        </>
      )
    },
  })
}

export function Chromatic() {
  return (
    <>
      <h1>Single</h1>
      <h2>Off</h2>
      <ToggleGroup type="single" class="root">
        <ToggleGroupItem value="1" class="item">
          Option 1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" class="item">
          Option 2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" class="item" disabled>
          Option 3
        </ToggleGroupItem>
      </ToggleGroup>

      <h2>On</h2>
      <ToggleGroup type="single" class="root" defaultValue="1">
        <ToggleGroupItem value="1" class="item">
          Option 1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" class="item">
          Option 2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" class="item" disabled>
          Option 3
        </ToggleGroupItem>
      </ToggleGroup>

      <h2>Disabled</h2>
      <ToggleGroup type="single" class="root" disabled>
        <ToggleGroupItem value="1" class="item">
          Option 1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" class="item">
          Option 2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" class="item">
          Option 3
        </ToggleGroupItem>
      </ToggleGroup>

      <h1>Multiple</h1>
      <h2>Off</h2>
      <ToggleGroup type="multiple" class="root">
        <ToggleGroupItem value="1" class="item">
          Option 1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" class="item">
          Option 2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" class="item" disabled>
          Option 3
        </ToggleGroupItem>
      </ToggleGroup>

      <h2>One on</h2>
      <ToggleGroup type="multiple" class="root" defaultValue={['1']}>
        <ToggleGroupItem value="1" class="item">
          Option 1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" class="item">
          Option 2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" class="item" disabled>
          Option 3
        </ToggleGroupItem>
      </ToggleGroup>

      <h2>One and two on</h2>
      <ToggleGroup type="multiple" class="root" defaultValue={['1', '2']}>
        <ToggleGroupItem value="1" class="item">
          Option 1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" class="item">
          Option 2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" class="item">
          Option 3
        </ToggleGroupItem>
      </ToggleGroup>

      <h2>Disabled</h2>
      <ToggleGroup type="multiple" class="root" disabled>
        <ToggleGroupItem value="1" class="item">
          Option 1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" class="item">
          Option 2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" class="item">
          Option 3
        </ToggleGroupItem>
      </ToggleGroup>

      <h1>Direction</h1>
      <h2>Prop</h2>
      <ToggleGroup type="single" class="root" defaultValue="1" dir="rtl">
        <ToggleGroupItem value="1" class="item">
          Option 1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" class="item">
          Option 2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" class="item" disabled>
          Option 3
        </ToggleGroupItem>
      </ToggleGroup>

      <h2>Inherited: WIP</h2>
      {/* <DirectionProvider dir="rtl"> */}
      <ToggleGroup type="single" class="root" defaultValue="1">
        <ToggleGroupItem value="1" class="item">
          Option 1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" class="item">
          Option 2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" class="item" disabled>
          Option 3
        </ToggleGroupItem>
      </ToggleGroup>
      {/* </DirectionProvider> */}

      <h1>State attributes</h1>
      <h2>Group disabled</h2>
      <ToggleGroup type="multiple" class="root" defaultValue={['1', '2']} disabled>
        <ToggleGroupItem value="1" class="itemAttr">
          Option 1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" class="itemAttr">
          Option 2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" class="itemAttr">
          Option 3
        </ToggleGroupItem>
        <ToggleGroupItem value="4" class="itemAttr">
          Option 4
        </ToggleGroupItem>
      </ToggleGroup>

      <h2>Group enabled with button override</h2>
      <ToggleGroup
        type="multiple"
        class="root"
        defaultValue={['1', '2']}
        disabled={false}
      >
        <ToggleGroupItem value="1" class="itemAttr">
          Option 1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" class="itemAttr" disabled>
          Option 2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" class="itemAttr">
          Option 3
        </ToggleGroupItem>
        <ToggleGroupItem value="4" class="itemAttr" disabled>
          Option 4
        </ToggleGroupItem>
      </ToggleGroup>

      <h2>Group disabled with button override</h2>
      <ToggleGroup
        type="multiple"
        class="root"
        defaultValue={['1', '2']}
        disabled={true}
      >
        <ToggleGroupItem value="1" class="itemAttr">
          Option 1
        </ToggleGroupItem>
        <ToggleGroupItem value="2" class="itemAttr" disabled={false}>
          Option 2
        </ToggleGroupItem>
        <ToggleGroupItem value="3" class="itemAttr">
          Option 3
        </ToggleGroupItem>
        <ToggleGroupItem value="4" class="itemAttr" disabled={false}>
          Option 4
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  )
}
Chromatic.parameters = { chromatic: { disable: false } }
