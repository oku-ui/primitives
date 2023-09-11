import { defineComponent } from 'vue'
import { useFocusGuards } from './utils'

export const OkuFocusGuards = defineComponent({
  name: 'OkuFocusGuards',

  setup(props, { slots }) {
    useFocusGuards()
    return () => slots.default?.()
  },
})
