import { defineComponent, toRefs, watchEffect } from 'vue'

import { alertDialogDescriptionWarningProps, CONTENT_NAME, DESCRIPTION_NAME, DESCRIPTION_WARNING_NAME } from './props'

const alertDialogDescriptionWarning = defineComponent({
  name: DESCRIPTION_WARNING_NAME,
  inheritAttrs: false,
  props: {
    ...alertDialogDescriptionWarningProps.props,
  },
  setup(props, { attrs: _attrs }) {
    const { contentRef } = toRefs(props)

    const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

    You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.
    
    Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.
    
    For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`

    watchEffect(() => {
      if (contentRef.value) {
        const hasDescription = document.getElementById(
          contentRef.value.getAttribute('aria-describedby')!,
        )
        if (!hasDescription)
          console.warn(MESSAGE)
      }
    })

    return () => null
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogDescriptionWarning = alertDialogDescriptionWarning as typeof alertDialogDescriptionWarning
