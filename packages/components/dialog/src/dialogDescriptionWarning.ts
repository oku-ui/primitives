import type { PropType } from 'vue'
import { defineComponent, toRefs, watchEffect } from 'vue'
import { useWarningInject } from './utils'

export const DESCRIPTION_WARNING_NAME = 'OkuDialogDescriptionWarning'

export type DescriptionWarningProps = {
  contentRef: HTMLDivElement
  descriptionId?: string
}

export const dialogDescriptionWarningProps = {
  props: {
    contentRef: {
      type: [Object, null] as PropType<HTMLDivElement | null>,
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
  setup(props) {
    const { contentRef, descriptionId } = toRefs(props)
    const inject = useWarningInject(DESCRIPTION_WARNING_NAME)

    const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${inject?.contentName.value}}.`

    watchEffect(() => {
      const describedById = contentRef.value?.getAttribute('aria-describedby')
      // if we have an id and the user hasn't set aria-describedby={undefined}
      if (descriptionId.value && describedById) {
        const hasDescription = document.getElementById(descriptionId.value)
        if (!hasDescription)
          console.warn(MESSAGE)
      }
    })

    return () => null
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogDescriptionWarning = dialogDescriptionWarning
