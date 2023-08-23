import { defineComponent } from 'vue'
import { useFocusGuards } from './utils'

export const OkuFocusGroup = defineComponent({
  name: 'OkuFocusGroup',

  setup(props, { slots }) {
    useFocusGuards()
    return () => slots.default?.()
  },
})
