import { type PropType, type Ref, defineComponent, shallowRef, watchEffect } from 'vue'
import './styles.css'
import { usePresence } from '../index.ts'

export default { title: 'Utilities/Presence' }

export function Basic() {
  return defineComponent({
    setup() {
      const open = shallowRef(true)

      function setOpen() {
        open.value = !open.value
      }

      const elRef = shallowRef<HTMLElement>()

      const isPresent = usePresence(elRef, open)

      return () => (
        <>
          <button onClick={setOpen}>toggle</button>

          {isPresent.value && <div ref={elRef}>Content</div>}
        </>
      )
    },
  })
}

const Toggles = defineComponent({
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    getNode: {
      type: Function as PropType<() => Ref<HTMLElement | undefined>>,
      required: true,
    },
  },
  emits: ['openChange'],
  setup(props, { emit }) {
    const nodeRef = props.getNode()

    function handleToggleVisibility() {
      const node = nodeRef.value

      if (!node)
        return

      if (node.style.display === 'none') {
        node.style.display = 'block'
      }
      else {
        node.style.display = 'none'
      }
    }

    return () => (
      <form style={{ display: 'flex', marginBottom: '30px' }}>
        <fieldset>
          <legend>Mount</legend>
          <button type="button" onClick={() => emit('openChange', !props.open)}>
            toggle
          </button>
        </fieldset>
        <fieldset>
          <legend>Visibility (triggers cancel event)</legend>
          <button type="button" onClick={handleToggleVisibility}>
            toggle
          </button>
        </fieldset>
      </form>
    )
  },
})

const Animation = defineComponent({
  inheritAttrs: false,
  setup(_, { attrs }) {
    const open = shallowRef(false)

    function setOpen(value: boolean) {
      open.value = value
    }

    const elRef = shallowRef<HTMLElement>()

    const isPresent = usePresence(elRef, open)

    return () => (
      <>
        <Toggles getNode={() => elRef} open={open.value} onOpenChange={setOpen} />

        { isPresent.value && (
          <div
            ref={elRef}
            {...attrs}
            data-state={open.value ? 'open' : 'closed'}
          >
            Content
          </div>
        )}
      </>
    )
  },
})

export function WithMountAnimation() {
  return <Animation class="present_mountAnimation" />
}

export function WithUnmountAnimation() {
  return <Animation class="present_unmountAnimation" />
}

export function WithMultipleMountAnimations() {
  return <Animation class="present_multipleMountAnimations" />
}

export function WithOpenAndCloseAnimation() {
  return <Animation class="present_openAndCloseAnimation" />
}

export function WithMultipleOpenAndCloseAnimations() {
  return <Animation class="present_multipleOpenAndCloseAnimations" />
}

export function WithDeferredMountAnimation() {
  return defineComponent({
    setup() {
      let t = 0
      // const timerRef = shallowRef(0)
      const open = shallowRef(false)
      function setOpen(value: boolean) {
        open.value = value
      }
      const animate = shallowRef(false)
      function setAnimate(value: boolean) {
        animate.value = value
      }

      watchEffect(() => {
        if (open.value) {
          const timer = window.setTimeout(() => setAnimate(true), 150)
          t = timer
        }
        else {
          setAnimate(false)
          clearTimeout(t)
        }
      })

      const elRef = shallowRef<HTMLElement>()

      const isPresent = usePresence(elRef, open)

      return () => (
        <>
          <p>
            Deferred animation should unmount correctly when toggled. Content will flash briefly while
            we wait for animation to be applied.
          </p>
          <Toggles getNode={() => elRef} open={open.value} onOpenChange={setOpen} />

          { isPresent.value && (
            <div class={animate.value ? 'present_mountAnimation' : undefined} ref={elRef}>
              Content
            </div>
          )}
        </>
      )
    },
  })
}
