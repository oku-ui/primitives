<script setup lang="ts">
import { OkuAccordion, OkuAccordionContent, OkuAccordionHeader, OkuAccordionItem, OkuAccordionTrigger } from '@oku-ui/accordion'

defineOptions({
  inheritAttrs: false,
})

const data = [
  {
    title: 'Is it accessible?',
    description: 'Yes. It adheres to the WAI-ARIA design pattern.',
    value: 'v-1',
  },
  {
    title: 'Is it unstyled?',
    description: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.',
    value: 'v-2',
  },
  {
    title: 'Can it be animated?',
    description: 'Yes! You can animate the Accordion with CSS or JavaScript.',
    value: 'v-3',
  },
]
</script>

<template>
  <OkuAccordion
    class="bg-white dark:bg-grayOA-950 w-[300px] rounded-md shadow-[0_2px_10px] shadow-grayOA-200 dark:shadow-grayOA-900"
    type="single"
    default-value="item-1"
    collapsible
  >
    <template v-for="(item, index) in data" :key="index">
      <OkuAccordionItem class="focus-within:shadow-grayOA-950 dark:focus-within:shadow-grayOA-200 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]" :value="item.value">
        <OkuAccordionHeader class="flex">
          <OkuAccordionTrigger class="text-grayOA-950 group dark:text-white shadow-grayOA-300 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white dark:bg-grayOA-950 px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none">
            {{ item.title }}
            <i class="i-ic-baseline-keyboard-arrow-down h-3.5 w-3.5 !text-black dark:!text-white ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180" />
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent
          class="text-grayOA-800 dark:text-grayOA-200 bg-white dark:bg-grayOA-950 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]"
        >
          <div class="py-[15px] px-5">
            {{ item.description }}
          </div>
        </OkuAccordionContent>
      </OkuAccordionItem>
    </template>
  </OkuAccordion>
</template>
