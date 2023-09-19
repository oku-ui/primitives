import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import type { PropType, Ref } from 'vue'
import { createProvideScope } from '@oku-ui/provide'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import { reactiveOmit, useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { useDirection } from '@oku-ui/direction'
import { scopeTabsProps } from './utils'

const TAB_NAME = 'OkuTabs'

export type TabsNaviteElement = OkuElement<'div'>
export type TabsElement = HTMLDivElement

type Orientation = 'horizontal' | 'vertical'
type Direction = 'ltr' | 'rtl'
/**
 * Whether a tab is activated automatically or manually.
 * @defaultValue automatic
 * */
type ActivationMode = 'automatic' | 'manual'

export interface TabsProps extends PrimitiveProps {
  /** The value for the selected tab, if controlled */
  value?: string
  /** The value of the tab to select by default, if uncontrolled */
  defaultValue?: string
  /** A function called when a new tab is selected */
  onValueChange?: (value: string) => void
  /**
   * The orientation the tabs are layed out.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   * @defaultValue horizontal
   */
  orientation?: RovingFocusGroupProps['orientation']
  /**
   * The direction of navigation between toolbar items.
   */
  dir?: RovingFocusGroupProps['dir']
  /**
   * Whether a tab is activated automatically or manually.
   * @defaultValue automatic
   * */
  activationMode?: ActivationMode
}

export type TabsEmits = {
  'update:modelValue': [value: string]
  'valueChange': [value: string]
}

export const tabsProps = {
  props: {
    value: {
      type: String as PropType<string>,
      required: false,
    },
    defaultValue: {
      type: String as PropType<string>,
      default: undefined,
    },
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    dir: {
      type: String as PropType<Direction>,
      default: 'ltr',
      required: false,
    },
    activationMode: {
      type: String as PropType<ActivationMode>,
      default: 'automatic',
      required: false,
    },
    modelValue: {
      type: String as PropType<string>,
      required: false,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: string) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: string) => true,
  },
}

interface TabsProvideValue {
  baseId: Ref<string>
  value?: Ref<string | undefined>
  onValueChange: (value: string) => void
  orientation?: Ref<TabsProps['orientation']>
  dir?: Ref<TabsProps['dir']>
  activationMode?: Ref<TabsProps['activationMode']>
}

export const [createTabsProvider, _createTabsScope] = createProvideScope(TAB_NAME, [
  createRovingFocusGroupScope,
])

export const [tabsProvider, useTabsInject]
  = createTabsProvider<TabsProvideValue>(TAB_NAME)

export const useRovingFocusGroupScope = createRovingFocusGroupScope()

const tabs = defineComponent({
  name: TAB_NAME,
  inheritAttrs: false,
  props: {
    ...tabsProps.props,
    ...scopeTabsProps,
  },
  emits: tabsProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      scopeOkuTabs,
      modelValue: _modelValue,
      value: valueProp,
      defaultValue,
      orientation,
      dir,
      activationMode,
      ...tabsProps
    } = toRefs(props)
    const _reactive = reactive(tabsProps)
    const reactiveTabsProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const direction = useDirection(dir)

    const forwardedRef = useForwardRef()

    const modelValue = useModel(props, 'modelValue')

    const { state, updateValue } = useControllable({
      prop: computed(() => modelValue.value ?? valueProp.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result: any) => {
        modelValue.value = result
        emit('valueChange', result)
      },
    })

    tabsProvider({
      onValueChange: (value: string) => updateValue(value),
      orientation,
      dir: direction,
      value: state,
      activationMode,
      baseId: computed(() => useId()),
      scope: scopeOkuTabs.value,
    })

    return () =>
      h(
        Primitive.div,
        {
          'dir': direction.value,
          'data-orientation': orientation.value,
          ...mergeProps(attrs, reactiveTabsProps),
          'ref': forwardedRef,
        }, slots,
      )
  },
})

export const OkuTabs = tabs as typeof tabs &
(new () => {
  $props: TabsNaviteElement
})
