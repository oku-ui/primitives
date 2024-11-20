<script setup lang="ts">
import { contributors } from '../contributors'
import { AvatarFallback, AvatarImage, AvatarRoot, TooltipContent, TooltipProvider, TooltipRoot, TooltipTrigger } from '@oku-ui/primitives'

function getInitials(name: string) {
  return name.match(/\b[A-Z]/gi)?.join('') ?? name[0]
}
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center my-8 not-prose">
    <TooltipProvider>
      <TooltipRoot
        v-for="{ name, avatar } of contributors"
        :key="name"
        :delay-duration="0"
        :disable-hoverable-content="true"
      >
        <TooltipTrigger as="template">
          <AvatarRoot as="template">
            <a
              :href="`https://github.com/${name}`"
              class="group relative inline-flex items-center justify-center"
              rel="noopener noreferrer"
              :aria-label="`${name} on GitHub`"
              target="_blank"
            >
              <div
                class="h-14 w-14 rounded-full overflow-hidden bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg transform transition-all group-hover:scale-110"
              >
                <AvatarImage
                  :src="avatar"
                  :alt="`${name}'s avatar`"
                  class="h-full w-full object-cover"
                />
                <AvatarFallback
                  class="text-center uppercase text-sm font-semibold text-white"
                  :delay-ms="1000"
                >
                  {{ getInitials(name) }}
                </AvatarFallback>
              </div>
            </a>
          </AvatarRoot>
        </TooltipTrigger>

        <TooltipContent
          class="text-xs font-semibold text-white px-3 py-1 rounded bg-gray-800 border border-gray-600 shadow-md transform transition-opacity duration-200"
          side="bottom"
        >
          {{ name }}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  </div>
</template>