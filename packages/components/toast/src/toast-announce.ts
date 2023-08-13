/* eslint-disable unused-imports/no-unused-vars */
import type { PropType } from 'vue'
import { defineComponent, ref, toRefs, watchEffect } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import type { Scope } from '@oku-ui/provide'
import type { ComponentPropsWithoutRef } from '@oku-ui/primitive'
import type { ScopedProps } from './toast-provider'
import { useToastProviderContext } from './toast-provider'
import { TOAST_NAME } from './toast'

interface ToastAnnounceProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'>, ScopedProps<{ children: string[] }> {}

const ANNOUNCE_NAME = 'ToastAnnounce'

const ToastAnnounce = defineComponent({
  name: ANNOUNCE_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    scopeToast: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    children: {
      type: Array as PropType<string[]>,
    },
  },
  setup(props, { attrs, emit, slots }) {
    // const { ...announceProps } = attrs as ToastElement

    const forwardedRef = useForwardRef()

    const {
      scopeToast,
      //   children,
      ...announceProps
    } = toRefs(props)

    const context = useToastProviderContext(TOAST_NAME, scopeToast.value)
    const renderAnnounceText = ref<boolean>(false)
    const isAnnounced = ref<boolean>(false)

    // render text content in the next frame to ensure toast is announced in NVDA
    // useNextFrame(() => setRenderAnnounceText(true))

    // cleanup after announcing
    watchEffect((onInvalidate) => {
      const timer = window.setTimeout(() => isAnnounced.value = true, 1000)
      onInvalidate(() => window.clearTimeout(timer))
    })

    // return isAnnounced ? null : (
    //     <Portal asChild>
    //       <VisuallyHidden {...announceProps}>
    //         {renderAnnounceText && (
    //           <>
    //             {context.label} {children}
    //           </>
    //         )}
    //       </VisuallyHidden>
    //     </Portal>
    //   );

    // const originalReturn = () =>

    // return originalReturn
  },
})

// type _ToastProvider = MergeProps<ToastProviderProps, ToastProviderElement>
// type InstanceToastProviderType = InstanceTypeRef<typeof ToastProvider, _ToastProviderEl>

// const OkuToastProvider = ToastProvider as typeof ToastProvider & (new () => { $props: _ToastProvider })

// export { OkuToastProvider, useToastProviderContext, createToastScope, createToastContext, useCollection }

// export type { ToastProviderProps, InstanceToastProviderType }
