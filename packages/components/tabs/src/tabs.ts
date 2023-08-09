import type { IPrimitiveProps, MergeProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { computed, defineComponent, h, toRefs, useModel } from 'vue'
import type { PropType } from 'vue'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import { useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { useDirection } from '@oku-ui/direction'

const TAB_NAME = 'OkuTab' as const

export type ScopedPropsInterface<P> = P & { scopeTabs?: Scope }
export const ScopedProps = {
  scopeTabs: {
    type: Object as PropType<Scope>,
  },
}

type Orientation = 'horizontal' | 'vertical'
type Direction = 'ltr' | 'rtl'
/**
 * Whether a tab is activated automatically or manually.
 * @defaultValue automatic
 * */
type ActivationMode = 'automatic' | 'manual'
interface TabsProps extends ScopedPropsInterface<IPrimitiveProps> {
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

interface TabsProvideValue {
  baseId: string
  value?: string
  onValueChange: (value: string) => void
  orientation?: TabsProps['orientation']
  dir?: TabsProps['dir']
  activationMode?: TabsProps['activationMode']
}

export const [createTabsProvider, _createTabsScope] = createProvideScope(TAB_NAME)

export const [TabsProvider, useTabsInject]
  = createTabsProvider<TabsProvideValue>(TAB_NAME)

export const useRovingFocusGroupScope = createRovingFocusGroupScope()

const Tabs = defineComponent({
  name: TAB_NAME,
  inheritAttrs: false,
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
    onValueChange: {
      type: Function as PropType<(value: string) => void>,
      required: false,
    },
    asChild: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    ...ScopedProps,
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const direction = useDirection(props.dir)
    const { value: valueProp, defaultValue } = toRefs(props)

    const forwardedRef = useForwardRef()

    const modelValue = useModel(props, 'modelValue')

    const { state, updateValue } = useControllable({
      prop: computed(() => modelValue.value ?? valueProp.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result: any) => {
        emit('update:modelValue', result)
      },
    })

    TabsProvider({
      onValueChange: updateValue,
      orientation: props.orientation,
      dir: direction,
      value: state.value,
      activationMode: props.activationMode,
      baseId: useId(),
      scope: props.scopeTabs,
    })

    return () =>
      h(
        Primitive.div,
        {
          'dir': direction,
          'data-orientation': props.orientation,
          'role': 'tab-group',
          'asChild': props.asChild,
          'ref': forwardedRef,
        },
        {
          default: () => slots.default?.(),
        },
      )
  },
})

type _TabsProps = MergeProps<TabsProps, typeof Tabs>

type TabsRef = RefElement<typeof Tabs>

const OkuTabs = Tabs as typeof Tabs & (new () => { $props: _TabsProps })

export { OkuTabs }

export type { TabsProps, TabsRef }
