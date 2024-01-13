<script setup lang="ts">
import { defineEmits, defineProps, ref, withDefaults } from 'vue'
import { OkuPopper, OkuPopperAnchor, OkuPopperArrow, OkuPopperContent } from '@oku-ui/popper'
import { OkuFocusGuards } from '@oku-ui/focus-guards'
import { OkuPortal } from '@oku-ui/portal'
import { useComponentRef } from '@oku-ui/use-composable'
import { OkuFocusScope } from '@oku-ui/focus-scope'
import type { DismissableLayerEmits } from '@oku-ui/dismissable-layer'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'

interface Props {
  openLabel?: string
  closeLabel?: string
  color?: string
  trapped?: boolean
  disableOutsidePointerEvents?: boolean
  preventScroll?: boolean
}

withDefaults(defineProps<Props>(), {
  openLabel: 'Open',
  closeLabel: 'Close',
  color: '#333',
  trapped: true,
  disableOutsidePointerEvents: false,
  preventScroll: false,
})

const emit = defineEmits<DismissableLayerEmits>()

const skipUnmountAutoFocus = ref(false)
const open = ref(false)
const openButtonRef = ref(null)

const { componentRef } = useComponentRef<HTMLElement | null>()

// useScrollLock(currentElement, true)
</script>

<template>
  {{ open }}
  <OkuPopper>
    <OkuPopperAnchor as-child>
      <button ref="openButtonRef" type="button" @click="open = true">
        {{ openLabel }}
      </button>
    </OkuPopperAnchor>

    <template v-if="open">
      <OkuFocusGuards>
        <OkuPortal ref="componentRef" as-child>
          <OkuDismissableLayer
            as-child
            :disable-outside-pointer-events="disableOutsidePointerEvents"
            @escape-keydown="(event) => $emit('escapeKeydown', event)"
            @pointerdown-outside="(event) => {
              skipUnmountAutoFocus = !disableOutsidePointerEvents
              if (event.target === openButtonRef)
                event.preventDefault()
              else
                emit('pointerdownOutside', event)
            }"
            @focus-outside="(event) => $emit('focusOutside', event)"
            @interact-outside="(event) => $emit('interactOutside', event)"
            @dismiss="open = false"
          >
            <OkuFocusScope
              as-child
              :trapped="trapped"
              @unmount-auto-focus="(event) => {
                if (skipUnmountAutoFocus)
                  event.preventDefault()
                skipUnmountAutoFocus = false
              }"
            >
              <OkuPopperContent
                :style="{
                  filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.12))',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  background: 'white',
                  minWidth: '200px',
                  minHeight: '150px',
                  padding: '20px',
                  borderRadius: '4px',
                  backgroundColor: color,
                }"
                side="bottom"
                :side-offset="10"
              >
                <slot />

                <button type="button" @click="open = false">
                  {{ closeLabel }}
                </button>

                <input type="text" defaultValue="hello world">

                <OkuPopperArrow
                  :width="10"
                  :height="10"
                  :style="{ fill: color }"
                  :offset="20"
                />
              </OkuPopperContent>
            </OkuFocusScope>
          </OkuDismissableLayer>
        </OkuPortal>
      </OkuFocusGuards>
    </template>
  </OkuPopper>
</template>
