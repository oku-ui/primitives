import { type PropType, defineComponent, h } from 'vue'

const TAB_TRIGGER_NAME = 'TabTrigger' as const

const TabTrigger = defineComponent({
  name: TAB_TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props, { slots, emit }) {
    const handleClick = () => {
      emit('change', props.value)
    }

    const slot = slots.default ? slots.default() : []

    return () => h('button', { onClick: handleClick }, slot)
  },
})

const OkuTabTrigger = TabTrigger as typeof TabTrigger

export { OkuTabTrigger }
