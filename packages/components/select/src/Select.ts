import { useDirection } from '@oku-ui/direction'
import {
  computed,
  defineComponent,
  h,
  ref,
  toRefs,
  useModel,
} from 'vue'
import { OkuPopper } from '@oku-ui/popper'
import { useControllable, useId } from '@oku-ui/use-composable'
import type {
  NativeOption,
  SelectNativeElement,
  SelectTriggerNativeElement,
  SelectValueNativeElement,
} from './props'
import {
  CollectionProvider,
  CollectionSlot,
  SELECT_NAME,
  SelectNativeOptionsProvider,
  scopeSelectProps,
  selectProps,
  selectProvider,
  usePopperScope,
} from './props'
import { BubbleSelect } from './BubbleSelect'

const Select = defineComponent({
  name: SELECT_NAME,
  inheritAttrs: false,
  props: {
    ...selectProps.props,
    ...scopeSelectProps,
  },
  emits: selectProps.emits,
  setup(props, { emit, slots }) {
    const {
      dir,
      open: openProp,
      disabled,
      required,
      value: valueProp,
      defaultOpen,
      defaultValue,
      scopeOkuSelect,
      autoComplete,
      name,
    } = toRefs(props)

    const modelValue = useModel(props, 'modelValue')
    const proxyValueProp = computed(() =>
      valueProp.value !== undefined
        ? valueProp.value
        : modelValue.value !== undefined
          ? modelValue.value
          : undefined,
    )

    const openValue = useModel(props, 'openValue')
    const proxyOpenChecked = computed(() =>
      openProp.value !== undefined
        ? openProp.value
        : openValue.value !== undefined
          ? openValue.value
          : undefined,
    )

    const popperScope = usePopperScope(props.scopeOkuSelect)
    const direction = useDirection(dir)

    const valueNodeHasChildren = ref<boolean>(false)
    const trigger = ref<SelectTriggerNativeElement | null | undefined>(null)
    const valueNode = ref<SelectValueNativeElement | null>(null)

    const triggerPointerDownPosRef = ref<{ x: number; y: number } | null>(null)
    const nativeOptionsSet = ref<Set<NativeOption>>(new Set<NativeOption>())

    // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = computed(() =>
      trigger.value ? Boolean(trigger.value.closest?.('form')) : true,
    )

    // The native `select` only associates the correct default value if the corresponding
    // `option` is rendered as a child **at the same time** as itself.
    // Because it might take a few renders for our items to gather the information to build
    // the native `option`(s), we generate a key on the `select` to make sure Vue re-builds it
    // each time the options change.
    const nativeSelectKey = computed(() =>
      Array.from(nativeOptionsSet.value)
        .map(option => option.props?.value)
        .join(';'),
    )

    const { state: valueState, updateValue } = useControllable({
      prop: computed(() => proxyValueProp.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result: string) => {
        emit('valueChange', result)
        modelValue.value = result
      },
    })

    const { state: openState, updateValue: updateOpenValue } = useControllable({
      prop: computed(() => proxyOpenChecked.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (result: boolean) => {
        emit('openChange', result)
        openValue.value = result
      },
      initialValue: false,
    })

    selectProvider({
      scope: scopeOkuSelect.value,
      disabled,
      required,
      dir: direction,
      open: openState,
      value: valueState,
      valueNode,
      valueNodeHasChildren,
      trigger,
      triggerPointerDownPosRef,
      contentId: useId(),
      onTriggerChange: (node: SelectTriggerNativeElement) => (trigger.value = node),
      onValueNodeChange: (node: SelectValueNativeElement) => (valueNode.value = node),
      onValueNodeHasChildrenChange: (hasChildren: boolean) => {
        valueNodeHasChildren.value = hasChildren
      },
      onOpenChange: (open: boolean) => updateOpenValue(open),
      onValueChange: (value: string) => updateValue(value),
    })

    SelectNativeOptionsProvider({
      scope: scopeOkuSelect.value,
      onNativeOptionAdd: (option: NativeOption) => {
        nativeOptionsSet.value.add(option)
      },
      onNativeOptionRemove: (option: NativeOption) => {
        nativeOptionsSet.value.delete(option)
      },
    })

    return () =>
      h(
        OkuPopper,
        {
          ...popperScope,
        },
        {
          default: () => [
            h(
              CollectionProvider,
              {
                scope: scopeOkuSelect.value,
              },
              {
                default: () =>
                  h(
                    CollectionSlot,
                    {
                      scope: scopeOkuSelect.value,
                    },
                    slots,
                  ),
              },
            ),
            isFormControl.value
              && h(
                BubbleSelect,
                {
                  'key': nativeSelectKey.value,
                  'aria-hidden': true,
                  'required': required.value,
                  'tab-index': '-1',
                  'name': name.value,
                  'auto-complete': autoComplete.value,
                  'value': valueState.value,
                  // enable form autofill
                  'onChange': (event: Event) =>
                    updateValue((event.target as HTMLInputElement)?.value),
                  'disabled': disabled.value,
                },
                [
                  proxyValueProp.value === undefined
                    ? h('option', { value: '' })
                    : null,
                  Array.from(nativeOptionsSet.value).map((option, index) =>
                    h(
                      'option',
                      { value: option, key: `option-${index}` },
                      option,
                    ),
                  ),
                ],
              ),
          ],
        },
      )
  },
})

export const OkuSelect = Select as typeof Select &
(new () => {
  $props: SelectNativeElement
})
