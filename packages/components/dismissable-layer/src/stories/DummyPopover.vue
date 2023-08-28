<script setup lang="ts">
import {
  OkuPopper,
  OkuPopperAnchor,
  OkuPopperArrow,
  OkuPopperContent,
} from '@oku-ui/popper'
import { ref } from 'vue'
import { OkuFocusGuards } from '@oku-ui/focus-guards'
import { OkuPortal } from '@oku-ui/portal'
import type { DismissableLayerEmits } from '@oku-ui/dismissable-layer'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { OkuFocusScope } from '@oku-ui/focus-scope'
import { OkuSlot } from '@oku-ui/slot'
import { useScrollLock } from '@oku-ui/use-composable'

export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>

const props = withDefaults(
  defineProps<{
    openLabel?: string
    closeLabel?: string
    color?: string
    trapped?: boolean
    disableOutsidePointerEvents?: boolean
    preventScroll?: boolean
  }>(),
  {
    openLabel: 'Open',
    closeLabel: 'Close',
    color: '#333',
    trapped: true,
    disableOutsidePointerEvents: false,
    preventScroll: false,
  },
)

defineEmits<DismissableLayerEmits>()

const open = ref(false)
const skipUnmountAutoFocus = ref(false)
const openButtonRef = ref<HTMLButtonElement | null>(null)

function toggleOpen() {
  open.value = !open.value
}

function closeLayer() {
  open.value = false
}

function setSkipUnmountAutoFocus() {
  skipUnmountAutoFocus.value = !skipUnmountAutoFocus.value
}

const test = ref(null)
useScrollLock(test, props.preventScroll)
</script>

<template>
  <div>
    <OkuPopper>
      <OkuPopperAnchor as-child>
        <button ref="openButtonRef" type="button" @click="toggleOpen">
          {{ openLabel }}
        </button>
      </OkuPopperAnchor>

      <template v-if="open">
        <OkuFocusGuards>
          <component :is="preventScroll ? OkuSlot : {}">
            <OkuPortal ref="test" as-child>
              <OkuDismissableLayer
                as-child
                :disable-outside-pointer-events="disableOutsidePointerEvents"
                @escape-key-down="(event) => $emit('escapeKeyDown', event)"
                @pointerdown-outside="
                  (event) => {
                    console.log('pointerdown-outside', event);
                    setSkipUnmountAutoFocus();
                    if (event.target === openButtonRef) {
                      event.preventDefault();
                    }
                    else {
                      $emit('pointerdownoutSide', event);
                    }
                  }
                "
                @dismiss="closeLayer"
                @interactout-side="(event) => $emit('interactoutSide', event)"
                @focusout-side="(event) => $emit('focusoutSide', event)"
              >
                <OkuFocusScope
                  as-child
                  :trapped="trapped"
                  @unmount-auto-focus="(event: Event) => {
                    if (skipUnmountAutoFocus) {
                      event.preventDefault()
                    }
                    skipUnmountAutoFocus = false
                  }"
                >
                  <OkuPopperContent
                    :style="{
                      filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.12))',
                      display: 'flex',
                      gap: '10px',
                      background: 'white',
                      borderRadius: '4px',
                      alignItems: 'flex-start',
                      backgroundColor: color,
                      minWidth: '200px',
                      minHeight: '150px',
                      padding: '20px',
                    }"
                    side="bottom"
                    :side-offset="10"
                  >
                    <slot />

                    <button type="button" @click="closeLayer">
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
          </component>
        </OkuFocusGuards>
      </template>
    </OkuPopper>
  </div>
</template>
