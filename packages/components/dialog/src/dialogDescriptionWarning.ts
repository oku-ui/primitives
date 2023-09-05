import type { PropType, Ref } from 'vue'
import { defineComponent, watchEffect } from 'vue'
import type { DialogContentNaviteElement } from './dialogContent'
import { useWarningInject } from './utils'

export const DESCRIPTION_WARNING_NAME = 'OkuDialogDescriptionWarning'

type DescriptionWarningProps = {
  contentRef: Ref<DialogContentNaviteElement>
  descriptionId?: string
}

export const dialogDescriptionWarningProps = {
  props: {
    contentRef: {
      type: [HTMLDivElement] as PropType<DialogContentNaviteElement>,
      required: true,
    },
    descriptionId: {
      type: String,
      required: false,
    },

  },
  emits: {
  },
}
const dialogDescriptionWarning = defineComponent({
  name: DESCRIPTION_WARNING_NAME,
  inheritAttrs: false,
  props: {
    ...dialogDescriptionWarningProps.props,
  },
  setup(props, { attrs, slots, emit }) {
    const inject = useWarningInject(DESCRIPTION_WARNING_NAME)

    const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${(inject as any).contentName}}.`

    watchEffect(() => {
      const describedById = props.contentRef.value?.getAttribute('aria-describedby')
      // if we have an id and the user hasn't set aria-describedby={undefined}
      if (props.descriptionId && describedById) {
        const hasDescription = document.getElementById(props.descriptionId)
        if (!hasDescription)
          console.warn(MESSAGE)
      }
    })

    return null
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogDescriptionWarning = dialogDescriptionWarning as typeof dialogDescriptionWarning
