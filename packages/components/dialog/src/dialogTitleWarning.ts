import { PropType, Ref, computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { createProvide } from '@oku-ui/provide'
import { CONTENT_NAME } from './dialogContent'
import { TITLE_NAME } from './dialogTitle'
import { useWarningInject } from './utils'

export const TITLE_WARNING_NAME = 'OkuDialogTitleWarning'

type TitleWarningProps = { titleId?: string }

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
  setup(props, { attrs, slots, emit }) {
    const inject = useWarningInject(TITLE_WARNING_NAME)

    const MESSAGE = `${(inject as any).contentName}\` requires a \`${(inject as any).titleName}\` for the component to be accessible for screen reader users.

    If you want to hide the \`${(inject as any).titleName}\`, you can wrap it with our VisuallyHidden component.
    
    For more information, see https://radix-ui.com/primitives/docs/components/${(inject as any).docsSlug}`

    watchEffect(() => {
      if (props.titleId) {
        const hasTitle = document.getElementById(props.titleId)
        if (!hasTitle)
          throw new Error(MESSAGE)
      }
    })

    return null
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogTitleWarning = dialogTitleWarning as typeof dialogTitleWarning
