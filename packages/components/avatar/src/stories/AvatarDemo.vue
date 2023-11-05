<script setup lang="ts">
import { OkuAvatar, OkuAvatarFallback, OkuAvatarImage } from '@oku-ui/avatar'
import { onMounted, ref } from 'vue'

export interface IAvatarPropsProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<IAvatarPropsProps>(), {

})

const src = 'https://picsum.photos/id/1005/400/400'
const srcBroken = 'https://broken.link.com/broken-pic.jpg'

const consoleLog = (event: any) => console.warn(event, 'log')

const srcDynamic = ref()

function dynamicSrc() {
  const images = [
    'https://picsum.photos/id/1005/400/400',
    'https://picsum.photos/id/1011/400/400',
    'https://picsum.photos/id/1015/400/400',
    'https://picsum.photos/id/1020/400/400',
  ]

  setInterval(() => {
    srcDynamic.value = images[Math.floor(Math.random() * images.length)]
  }, 3000)
}

onMounted(() => {
  dynamicSrc()
})
</script>

<template>
  <div>
    {{ srcDynamic }}
    <div v-if="template === '#1' || allshow" class="w-[300px] rounded-sm overflow-hidden">
      <h1>Without image & with fallback</h1>
      <div class="max-w-xl mx-auto h-full items-center justify-center">
        <OkuAvatar class="w-40 h-40 bg-gray-400 items-center inline-block overflow-hidden rounded-full">
          <OkuAvatarFallback
            class="flex items-center text-white font-medium text-2xl h-full w-full justify-center"
            :delayms="100"
          >
            CT
          </OkuAvatarFallback>
        </OkuAvatar>
      </div>
    </div>
    <div v-if="template === '#2' || allshow" class="w-[300px] rounded-sm overflow-hidden">
      <h1>With image & with fallback</h1>
      <div class="max-w-xl mx-auto h-full items-center justify-center">
        <OkuAvatar class="w-40 h-40 bg-gray-400 items-center inline-block overflow-hidden rounded-full">
          <OkuAvatarImage
            class="w-full h-full object-cover"
            :src="src"
          />
          <OkuAvatarFallback
            class="flex items-center text-white font-medium text-2xl h-full w-full justify-center"
            :delayms="100"
          >
            CT
          </OkuAvatarFallback>
        </OkuAvatar>
      </div>
      <OkuAvatar class="w-40 h-40 bg-gray-400 items-center inline-block overflow-hidden rounded-full">
        <OkuAvatarImage
          class="w-full h-full object-cover"
          :src="srcDynamic"
        />
        <OkuAvatarFallback
          class="flex items-center text-white font-medium text-2xl h-full w-full justify-center"
          :delayms="100"
        >
          CT
        </OkuAvatarFallback>
      </OkuAvatar>
    </div>

    <div v-if="template === '#3' || allshow" class="w-[300px] rounded-sm overflow-hidden">
      <h1>With image & with fallback (but broken src)</h1>
      <div class="max-w-xl mx-auto h-full items-center justify-center">
        <OkuAvatar class="w-40 h-40 bg-gray-400 items-center inline-block overflow-hidden rounded-full">
          <OkuAvatarImage
            class="w-full h-full object-cover"
            :src="srcBroken"
            :on-loading-status-change="consoleLog"
          />
        </OkuAvatar>
      </div>
    </div>
  </div>
</template>
