import { type PropType, type Ref, computed, defineComponent, shallowRef } from 'vue'
import { RovingFocusGroup } from '../index.ts'
import RovingFocusItem from '../RovingFocusItem.vue'
import { createContext } from '~/hooks/createContext.ts'
import { composeEventHandlers } from '~/utils/composeEventHandlers.ts'

export default { title: 'Utilities/RovingFocusGroup' }

interface ButtonGroupContext {
  value: Ref<string | undefined>
  setValue: (value: string | undefined) => void
}

const [provideButtonGroupContext, useButtonGroupContext] = createContext<ButtonGroupContext>('ButtonGroupContext')

const ButtonGroup = defineComponent({
  props: {
    defaultValue: {
      type: String,
      default: undefined,
    },
    orientation: {
      type: String as PropType<'horizontal' | 'vertical'>,
    },
    dir: {
      type: String as PropType<'ltr' | 'rtl'>,
      default: 'ltr',
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const value = shallowRef(props.defaultValue)

    provideButtonGroupContext({
      value,
      setValue(v) {
        value.value = v
      },
    })

    return () => (
      <RovingFocusGroup
        dir={props.dir}
        loop={props.loop}
        orientation={props.orientation}
        style={{
          display: 'inline-flex',
          flexDirection: props.orientation === 'vertical' ? 'column' : 'row',
          gap: '10px',
        }}
      >
        {slots.default?.()}
      </RovingFocusGroup>
    )
  },
})

const Button = defineComponent({
  props: {
    value: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs, slots }) {
    const context = useButtonGroupContext()

    const isSelected = computed(() => context.value.value !== undefined
      && props.value !== undefined
      && context.value.value === props.value)

    const onFocus = composeEventHandlers((event) => {
      ;(attrs.onFocus as Function | undefined)?.(event)
    }, (event) => {
      if (context.value.value !== undefined) {
        (event.target as HTMLElement).click()
      }
    })

    return () => (
      <RovingFocusItem asChild active={isSelected.value} focusable={!props.disabled}>
        <button
          value={props.value}
          disabled={props.disabled}
          style={{
            border: '1px solid',
            borderColor: '#ccc',
            padding: '5px 10px',
            borderRadius: '5px',
            ...(isSelected.value
              ? {
                  borderColor: 'black',
                  backgroundColor: 'black',
                  color: 'white',
                }
              : {}),
          }}
          {...{
            ...attrs,
            onClick: () => {
              if (props.disabled)
                return

              context.setValue(props.value)
            },
            onFocus,
          }}
        >
          {slots.default?.()}
        </button>
      </RovingFocusItem>
    )
  },
})

const BasicDemo = defineComponent({
  setup() {
    const dir = shallowRef<'ltr' | 'rtl'>('ltr')

    const setDir = () => {
      dir.value = (dir.value === 'ltr' ? 'rtl' : 'ltr')
    }

    return () => (
      <div dir={dir.value}>
        <h1>
          Direction:
          {' '}
          {dir.value}
          {' '}
          <button type="button" onClick={setDir}>
            Toggle to
            {' '}
            {dir.value === 'ltr' ? 'rtl' : 'ltr'}
          </button>
        </h1>

        <h2>no orientation (both) + no looping</h2>
        <ButtonGroup dir={dir.value} defaultValue="two">
          <Button value="one">One</Button>
          <Button value="two">Two</Button>
          <Button disabled value="three">
            Three
          </Button>
          <Button value="four">Four</Button>
        </ButtonGroup>

        <h2>no orientation (both) + looping</h2>
        <ButtonGroup dir={dir.value} loop>
          <Button value="hidden" style={{ display: 'none' }}>
            Hidden
          </Button>
          <Button value="one">One</Button>
          <Button value="two">Two</Button>
          <Button disabled value="three">
            Three
          </Button>
          <Button value="four">Four</Button>
        </ButtonGroup>

        <h2>horizontal orientation + no looping</h2>
        <ButtonGroup orientation="horizontal" dir={dir.value}>
          <Button value="one">One</Button>
          <Button value="two">Two</Button>
          <Button disabled value="three">
            Three
          </Button>
          <Button value="four">Four</Button>
        </ButtonGroup>

        <h2>horizontal orientation + looping</h2>
        <ButtonGroup orientation="horizontal" dir={dir.value} loop>
          <Button value="one">One</Button>
          <Button value="two">Two</Button>
          <Button disabled value="three">
            Three
          </Button>
          <Button value="four">Four</Button>
        </ButtonGroup>

        <h2>vertical orientation + no looping</h2>
        <ButtonGroup orientation="vertical" dir={dir.value}>
          <Button value="one">One</Button>
          <Button value="two">Two</Button>
          <Button disabled value="three">
            Three
          </Button>
          <Button value="four">Four</Button>
        </ButtonGroup>

        <h2>vertical orientation + looping</h2>
        <ButtonGroup orientation="vertical" dir={dir.value} loop>
          <Button value="one">One</Button>
          <Button value="two">Two</Button>
          <Button disabled value="three">
            Three
          </Button>
          <Button value="four">Four</Button>
        </ButtonGroup>

      </div>
    )
  },
})

export const Basic = () => <BasicDemo />

export function Nested() {
  return (
    <ButtonGroup orientation="vertical" loop>
      <Button value="1">1</Button>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button value="2" style={{ marginBottom: 10 }}>
          2
        </Button>

        <ButtonGroup orientation="horizontal" loop>
          <Button value="2.1">2.1</Button>
          <Button value="2.2">2.2</Button>
          <Button disabled value="2.3">
            2.3
          </Button>
          <Button value="2.4">2.4</Button>
        </ButtonGroup>
      </div>

      <Button value="3" disabled>
        3
      </Button>
      <Button value="4">4</Button>
    </ButtonGroup>
  )
}

const EdgeCasesDemo = defineComponent({
  setup() {
    const extra = shallowRef(false)
    const disabled = shallowRef(false)
    const hidden = shallowRef(false)
    const disabled3To5 = shallowRef(false)

    function setExtra() {
      extra.value = !extra.value
    }

    function setDisabled() {
      disabled.value = !disabled.value
    }

    function setHidden() {
      hidden.value = !hidden.value
    }

    function setDisabled3To5() {
      disabled3To5.value = !disabled3To5.value
    }

    return () => (
      <>
        <button onClick={setExtra}>Add/remove extra</button>
        <button onClick={setDisabled}>Disable/Enable "One"</button>
        <button onClick={setHidden}>Hide/show "One"</button>
        <button onClick={setDisabled3To5}>Disable/Enable "Three" to "Five"</button>
        <hr />

        <ButtonGroup>
          {extra.value ? <Button value="extra">Extra</Button> : null}
          <Button value="one" disabled={disabled.value} style={{ display: hidden ? 'none' : undefined }}>
            One
          </Button>
          <Button value="two" disabled>
            Two
          </Button>
          <Button value="three" disabled={disabled3To5.value}>
            Three
          </Button>
          <Button value="four" disabled={disabled3To5.value} style={{ display: 'none' }}>
            Four
          </Button>
          <Button value="five" disabled={disabled3To5.value}>
            Five
          </Button>
        </ButtonGroup>

        <hr />
        <button type="button">Focusable outside of group</button>
      </>
    )
  },
})

export const EdgeCases = () => <EdgeCasesDemo />
