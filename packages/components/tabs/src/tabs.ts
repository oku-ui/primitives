import { type MergeProps, Primitive, type PrimitiveProps } from '@oku-ui/primitive'
import { defineComponent, h, ref } from 'vue'
import type { PropType, Ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { createProvideScope } from '@oku-ui/provide'

const TAB_NAME = 'OkuTab' as const

type Orientation = 'horizontal' | 'vertical'
type Direction = 'ltr' | 'rtl'
/**
 * Whether a tab is activated automatically or manually.
 * @defaultValue automatic
 * */
type ActivationMode = 'automatic' | 'manual'
interface TabsProps extends PrimitiveProps {
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
  modelValue?: string
}

interface TabsProvideValue {
  modelValue?: Readonly<Ref<string | undefined>>
  currentFocusedElement?: Ref<HTMLElement | undefined>
  changeModelValue: (value: string) => void
  parentElement: Ref<HTMLElement | undefined>
  orientation: Orientation
  dir: Direction
  activationMode: ActivationMode
  loop: boolean
}

export const [createTabsProvider, _createTabsScope] = createProvideScope(TAB_NAME)

export const [TabsProvider, useTabsInject]
  = createTabsProvider<TabsProvideValue>(TAB_NAME)

const Tabs = defineComponent({
  name: TAB_NAME,
  inheritAttrs: false,
  props: {
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
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const parentElementRef = ref<HTMLElement>()
    const currentFocusedElementRef = ref<HTMLElement>()

    const modelValue = useVModel(props, 'modelValue', emit, {
      defaultValue: props.defaultValue,
      passive: true,
    })

    TabsProvider({
      modelValue,
      changeModelValue: (value: string) => {
        modelValue.value = value
        if (value && props.onValueChange)
          props.onValueChange(value)
      },
      currentFocusedElement: currentFocusedElementRef,
      parentElement: parentElementRef,
      orientation: props.orientation,
      dir: props.dir,
      loop: true,
      activationMode: props.activationMode,
      scope: undefined,
    })

    return () =>
      h(
        Primitive.div,
        {
          'dir': props.dir,
          'data-orientation': props.orientation,
          'role': 'tab-group',
          'asChild': props.asChild,
        },
        {
          default: () => slots.default?.(),
        },
      )
  },
})

type _TabsProps = MergeProps<TabsProps, typeof Tabs>

const OkuTabs = Tabs as typeof Tabs & (new () => { $props: _TabsProps })

export { OkuTabs, TabsProvideValue }

export type { TabsProps }
