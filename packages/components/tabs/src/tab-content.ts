import { type PropType, defineComponent, h } from 'vue'

const TAB_CONTENT_NAME = 'TabContent' as const

const TabContent = defineComponent({
  name: TAB_CONTENT_NAME,
  inheritAttrs: false,
  props: {
    activeTab: {
      type: String as PropType<string>,
      required: true,
    },
    value: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const slot = slots.default ? slots.default() : []
    return () => {
      if (props.activeTab === props.value)
        return h('div', { class: 'tab-content' }, slot)
      else return null
    }
  },
})

const OkuTabContent = TabContent as typeof TabContent

export { OkuTabContent }
