<script setup lang="ts">
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import type { CSSProperties } from 'vue'
import { computed, ref, defineOptions as setOptions, useAttrs } from 'vue'
import { createReusableTemplate } from '@vueuse/core'

setOptions({
  inheritAttrs: false,
})

const { ...attrs } = useAttrs()

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const openButtonRef = ref<HTMLButtonElement | null>(null)
const openFirstButtonRef = ref<HTMLButtonElement | null>(null)

const open = ref(false)
const openFirstLayer = ref(false)

const mergeStyles = computed(() => ({
  'display': 'inline-block',
  'vertical-align': 'middle',
  'padding': '20px',
  'background': 'rgba(0, 0, 0, 0.2)',
  'border-radius': '10px',
  'margin-top': '20px',
  ...(attrs.style as CSSProperties),
}))

function toggleOpen() {
  open.value = !open.value
}

function closeLayer() {
  open.value = false
}
</script>

<template>
  <div>
    <DefineTemplate>
      <OkuDismissableLayer v-bind="{ ...attrs }" :style="{ ...mergeStyles }">
        <div>
          <button ref="openButtonRef" type="button" @click="toggleOpen">
            {{ open ? "Close" : "Open" }} new layer
          </button>
        </div>

        <template v-if="open">
          <OkuDismissableLayer
            :style="{ ...mergeStyles }"
            @pointer-down-outside="(event: Event) => {
              if (event.target === openButtonRef) {
                event.preventDefault();
              }
            }"
            @focus-outside="(event: Event) => event.preventDefault()"
            @dismiss="closeLayer"
          />
        </template>
      </OkuDismissableLayer>
    </DefineTemplate>

    <OkuDismissableLayer v-bind="{ ...attrs }" :style="{ ...mergeStyles }">
      <div>
        <button
          ref="openFirstButtonRef"
          type="button"
          @click="() => (openFirstLayer = !openFirstLayer)"
        >
          {{ openFirstLayer ? "Close" : "Open" }} new layer
        </button>
      </div>

      <template v-if="openFirstLayer">
        <ReuseTemplate />
      </template>
    </OkuDismissableLayer>
  </div>
</template>
