import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, toRefs, useModel } from 'vue'
import type { PropType, Ref } from 'vue'
import { createProvideScope } from '@oku-ui/provide'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import { useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { useDirection } from '@oku-ui/direction'
import type { ScopeTabs } from './utils'
import { scopeTabsProps } from './utils'

const TAB_NAME = 'OkuTab' as const

export type TabsIntrinsicElement = ElementType<'div'>
export type TabsElement = HTMLDivElement

type Orientation = 'horizontal' | 'vertical'
type Direction = 'ltr' | 'rtl'
/**
 * Whether a tab is activated automatically or manually.
 * @defaultValue automatic
 * */
type ActivationMode = 'automatic' | 'manual'

interface TabsProps extends PrimitiveProps {
  /** The value for the selected tab, if controlled */
  value?: string
  /**
   * The default value of the tab.
   * @default 'tab1'
   * @type string
   * @example
   * ```vue
   * <OkuTabs defaultValue="tab1">
      // ...
   * </OkuTabs>
   * ```
   * @see link-to-oku-docs/tab
   */
  defaultValue?: string
  /**
   * The callback function that is called when the tab value changes.
   * @default () => {}
   * @type (value: string) => void
   * @example
   * ```vue
   * <OkuTabs onValueChange={(value) => console.log(value)}>
      //  ...
   * </OkuTabs>
   * */
  onValueChange?: (value: string) => void
  /**
   * The orientation of the tabs.
   * @default 'horizontal'
   * @type 'horizontal' | 'vertical'
   * @example
   * ```vue
   * <OkuTabs orientation="horizontal">
     // ...
   * </OkuTabs>
   * ```
   * @see link-to-oku-docs/tab
   * */
  orientation?: Orientation
  /**
   * The direction of navigation between toolbar items.
   */
  dir?: Direction
  /**
   * Whether a tab is activated automatically or manually.
   * @defaultValue automatic
   * */
  activationMode?: ActivationMode
}

const tabsProps = {
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
  onValueChange: {
    type: Function as PropType<(value: string) => void>,
    required: false,
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
    ...tabsProps,
    ...scopeTabsProps,
    ...primitiveProps,
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const {
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation,
      dir,
      activationMode,
    } = toRefs(props)

    const direction = useDirection(dir.value)

    const forwardedRef = useForwardRef()

    const modelValue = useModel(props, 'modelValue')

    const { state, updateValue } = useControllable({
      prop: computed(() => modelValue.value ?? valueProp.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result: any) => {
        emit('update:modelValue', result)
        onValueChange.value?.(result)
      },
    })

    tabsProvider({
      onValueChange: updateValue,
      orientation,
      dir: direction,
      value: state,
      activationMode,
      baseId: computed(() => useId()),
      scope: props.scopeOkuTabs,
    })

    return () =>
      h(
        Primitive.div,
        {
          'dir': direction.value,
          'data-orientation': props.orientation,
          'ref': forwardedRef,
          ...attrs,
          'asChild': props.asChild,
        }, slots,
      )
  },
})

const OkuTabs = tabs as typeof tabs &
(new () => {
  $props: ScopeTabs<Partial<TabsElement>>
})

export { OkuTabs }

export type { TabsProps }
