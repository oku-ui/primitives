<script setup lang="ts">
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import type { CSSProperties } from 'vue'
import {
  computed,
  ref,
  defineOptions as setOptions,
  useAttrs,
} from 'vue'
import { createReusableTemplate } from '@vueuse/core'

setOptions({
  inheritAttrs: false,
})

const { ...attrs } = useAttrs()

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const openButtonRef = ref<HTMLButtonElement | null>(null)
const open = ref(false)

const mergeStyles = computed(() => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  padding: 20,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  borderRadius: 10,
  marginTop: 20,
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
            @onPointerDownOutside="(event: any) => {
              if (event.target === openButtonRef) {
                event.preventDefault();
              }
            }"
            @onFocusOutside="(event: any) => event.preventDefault()"
            @onDismiss="closeLayer"
          />
        </template>
      </OkuDismissableLayer>
    </DefineTemplate>

    <ReuseTemplate />
  </div>
</template>
