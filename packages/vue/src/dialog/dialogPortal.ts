import type { PropType } from 'vue'
import { computed, defineComponent, h, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuPortal, type PortalProps } from '@oku-ui/portal'

import { OkuPresence } from '@oku-ui/presence'
import { DialogPortalProvider, scopeDialogProps, useDialogInject } from './utils'

const PORTAL_NAME = 'OkuDialogPortal'

export type DialogPortalNaviteElement = OkuElement<'div'>

export interface DialogPortalProps {
  /**
   * Specify a container element to portal the content into.
   */
  container?: PortalProps['container']
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const dialogPortalProps = {
  props: {
    ...primitiveProps,
    container: {
      type: Object as () => PortalProps['container'],
    },
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
  },
  emits: {
  },
}

const dialogPortal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    ...dialogPortalProps.props,
    ...scopeDialogProps,
  },
  emits: dialogPortalProps.emits,
  setup(props, { slots }) {
    const { forceMount, container } = toRefs(props)
    const inject = useDialogInject(PORTAL_NAME, props.scopeOkuDialog)

    DialogPortalProvider({
      scope: props.scopeOkuDialog,
      forceMount,
    })

    return () => [
      slots.default?.().map((child) => {
        return h(OkuPresence, {
          present: computed(() => forceMount?.value || inject.open?.value).value,
        }, {
          default: () => h(OkuPortal, {
            asChild: true,
            container: container.value,
          }, {
            default: () => child,
          }),
        })
      }),
    ]
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogPortal = dialogPortal as typeof dialogPortal &
  (new () => {
    $props: DialogPortalNaviteElement
  })
