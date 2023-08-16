<script setup lang="ts">
import type { PortalProps } from '@oku-ui/portal'
import { OkuPortal } from '@oku-ui/portal'
import { ref } from 'vue'

export interface IPortalProps extends PortalProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

// const container = computed(() => getCurrentInstance()?.proxy?.$el);

defineProps<IPortalProps>()

const portalContainer = ref<HTMLDivElement>()
</script>

<template>
  <div>
    <div v-if="template === '#1'" class="flex flex-col">
      <h1>Oku Portal Base</h1>
      <div class="max-w-[300px] max-h-[200px] overflow-auto border">
        <h1>This content is rendered in the main DOM tree</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos porro,
          est ex quia itaque facere fugit necessitatibus aut enim. Nisi rerum
          quae, repellat in perspiciatis explicabo laboriosam necessitatibus
          eius pariatur.
        </p>

        <OkuPortal>
          <h1>This content is rendered in a portal (another DOM tree)</h1>
          <p>
            Because of the portal, it can appear in a different DOM tree from
            the main one (by default a new element inside the body), even though
            it is part of the same React tree.
          </p>
        </OkuPortal>
      </div>
    </div>

    <div v-if="template === '#2'" class="flex flex-col">
      <div class="max-w-[300px] max-h-[200px] overflow-auto border p-4">
        <h1>Container A</h1>
        <OkuPortal as-child :container="portalContainer">
          <p>
            This content is rendered in a portal inside Container A but appears
            inside Container B because we have used Container B as a container
            element for the Portal.
          </p>
        </OkuPortal>
      </div>

      <div
        ref="portalContainer"
        class="max-w-[300px] max-h-[200px] overflow-auto border flex flex-col p-4 mt-4"
      >
        <h1>Container B</h1>
      </div>
    </div>
  </div>
</template>
