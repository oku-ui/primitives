import { defineComponent, h } from 'vue'

const NAME = 'Progress'

const progress = defineComponent({
  name: NAME,
  inheritAttrs: false,
  setup() {
    return () => h('div', {}, 'progress')
  },
})

const OkuProgress = progress

export { OkuProgress }
