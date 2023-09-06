import { defineComponent, toRef, watchEffect } from 'vue'
import { TITLE_WARNING_NAME, useWarningInject } from './utils'

export type TitleWarningProps = { titleId?: string }

export const dialogTitleWarningProps = {
  props: {
    titleId: {
      type: String,
    },
  },
  emits: {
  },
}
const dialogTitleWarning = defineComponent({
  name: TITLE_WARNING_NAME,
  inheritAttrs: false,
  props: {
    ...dialogTitleWarningProps.props,
  },
  setup(props) {
    const titleId = toRef(props, 'titleId')
    const inject = useWarningInject(TITLE_WARNING_NAME)

    const MESSAGE = `${inject.contentName.value}\` requires a \`${inject.titleName.value}\` for the component to be accessible for screen reader users.

    If you want to hide the \`${inject.titleName.value}\`, you can wrap it with our VisuallyHidden component.
    
    For more information, see https://radix-ui.com/primitives/docs/components/${(inject as any).docsSlug}`

    watchEffect(() => {
      if (titleId.value) {
        const hasTitle = document.getElementById(titleId.value)
        if (!hasTitle)
          throw new Error(MESSAGE)
      }
    })

    return () => null
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogTitleWarning = dialogTitleWarning as typeof dialogTitleWarning
