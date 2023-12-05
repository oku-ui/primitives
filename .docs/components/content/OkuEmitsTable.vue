<script setup lang="ts">
import { OkuPopover, OkuPopoverArrow, OkuPopoverContent, OkuPopoverTrigger } from '@oku-ui/popover'

interface PropDef {
  name?: string
  required?: boolean
  default?: string | boolean
  type: string
  typeSimple: string
  description?: string
}

interface PropsTableProps {
  data: PropDef[]
}
const props = defineProps<PropsTableProps>()
</script>

<template>
  <ProseTable>
    <thead>
      <ProseTr>
        <ProseTh class="w-[33%]">
          <span>Emit</span>
        </ProseTh>
        <ProseTh>
          <span>Type</span>
        </ProseTh>
      </ProseTr>
    </thead>
    <tbody>
      <ProseTr v-for="(item, i) in props.data" :key="`${item.name}-${i}`">
        <ProseTd>
          <div class="flex items-center justify-between">
            <ProseCodeInline class="!text-[12px]">
              {{ item.name }} - {{ item.required ? "*" : null }}
            </ProseCodeInline>
            <template v-if="item.description">
              <OkuPopover>
                <OkuPopoverTrigger
                  class="rounded-full w-[20px] h-[20px] inline-flex items-center justify-center text-violet11 bg-white dark:bg-codGray-900 hover:bg-codGray-100 cursor-default outline-none"
                >
                  <i class="i-ph-info h-4 w-4 text-neutral-400" />
                </OkuPopoverTrigger>
                <OkuPopoverContent
                  side="top"
                  :side-offset="5"
                  class="rounded p-5 w-[260px] bg-white dark:bg-codGray-900 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade z-50"
                >
                  <span size="2" class="leading-5" v-html="item.description" />
                  <OkuPopoverArrow class="fill-white dark:fill-codGray-900" :size="5" />
                </OkuPopoverContent>
              </OkuPopover>
            </template>
          </div>
        </ProseTd>
        <ProseTd>
          <div class="flex items-center">
            <ProseCodeInline>
              {{ item.typeSimple ? item.typeSimple : item.type }}
            </ProseCodeInline>
            <template v-if="item.typeSimple">
              <OkuPopover>
                <OkuPopoverTrigger class="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white dark:bg-codGray-900 hover:bg-violet3 cursor-default outline-none">
                  <i class="i-ph-info h-4 w-4 text-neutral-400" />
                </OkuPopoverTrigger>
                <OkuPopoverContent
                  :side-offset="5"
                  side="top"
                  class="rounded p-5 w-[260px] bg-white dark:bg-codGray-900 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                >
                  <ProseCodeInline class="whitespace-nowrap !text-[12px]">
                    {{ item.type }}
                  </ProseCodeInline>
                  <OkuPopoverArrow class="fill-white dark:fill-codGray-900" :size="10" />
                </OkuPopoverContent>
              </OkuPopover>
            </template>
          </div>
        </ProseTd>
      </ProseTr>
    </tbody>
  </ProseTable>
</template>
