<script setup lang="ts">
import type { PortalProps } from '@oku-ui/portal'
import { OkuPortal } from '@oku-ui/portal'
import { ref } from 'vue'

export interface IPortalProps extends PortalProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

defineProps<IPortalProps>()

const portalContainer = ref<HTMLDivElement | null>(null)
const portalChromaticContainer = ref<HTMLDivElement | null>(null)
</script>

<template>
  <div class="p-4">
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

    <div v-if="template === '#3'" class="flex flex-col p-20">
      <h1>Default (append to body)</h1>
      <div class="max-w-[300px] max-h-[200px] overflow-auto border p-4">
        <p>Container A</p>

        <OkuPortal as-child>
          <div
            :style="{
              padding: 10,
              margin: 10,
              border: '1px solid blue',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 9999999,
            }"
          >
            <p>This content is rendered in a portal (another DOM tree)</p>
            <p>
              Because of the portal, it can appear in a different DOM tree from
              the main one (by default a new element inside the body), even
              though it is part of the same React tree.
            </p>
          </div>
        </OkuPortal>
      </div>

      <h1 class="text-4xl mb-3 mt-5 font-semibold">
        Custom container
      </h1>

      <div
        :style="{ padding: '10px', margin: '10px', border: '1px solid green' }"
      >
        <p>Container B</p>

        <OkuPortal as-child :container="portalChromaticContainer">
          <div
            :style="{
              padding: '10px',
              margin: '10px',
              border: '1px solid green',
            }"
          >
            <p>
              This content is rendered in a portal inside Container B but
              appears inside Container C because we have used Container C as a
              container element for the Portal.
            </p>
          </div>
        </OkuPortal>
      </div>

      <div
        ref="portalChromaticContainer"
        :style="{ padding: '10px', margin: '10px', border: '1px solid' }"
      >
        <p>Container C</p>
      </div>

      <h1 class="text-4xl mb-3 mt-5 font-semibold">
        zIndex and order
      </h1>
      <p>See squares in the top-left</p>

      <OkuPortal as-child>
        <div
          :style="{
            width: '20px',
            height: '20px',
            backgroundColor: 'red',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 9999999,
          }"
        />
      </OkuPortal>

      <OkuPortal as-child>
        <div
          :style="{
            width: '20px',
            height: '20px',
            backgroundColor: 'green',
            marginLeft: '10px',
            marginTop: '10px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 9999999,
          }"
        />
      </OkuPortal>

      <OkuPortal as-child>
        <div
          :style="{
            width: '20px',
            height: '20px',
            backgroundColor: 'blue',
            marginLeft: '20px',
            marginTop: '20px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 9999999,
          }"
        />
      </OkuPortal>
    </div>
  </div>
</template>
