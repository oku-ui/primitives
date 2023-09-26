<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { OkuAccordion, OkuAccordionContent, OkuAccordionHeader, OkuAccordionItem, OkuAccordionTrigger } from '@oku-ui/accordion'

const values = ref(['One', 'Two', 'Three', 'Four'])
const count = ref(1)
const hasDynamicContent = ref(false)
const timerRef = ref()

watchEffect(() => {
  if (hasDynamicContent.value) {
    timerRef.value = window.setTimeout(() => {
      const nextCount = count.value < 5 ? count.value + 1 : count.value

      if (nextCount === 5)
        hasDynamicContent.value = false

      count.value = nextCount
    }, 3000)

    return () => {
      clearTimeout(timerRef.value)
    }
  }
})
</script>

<template>
  <div>
    <label>
      <input
        v-model="hasDynamicContent"
        type="checkbox"
      >
      Dynamic content
    </label>
    <h1>Closed by default</h1>
    <OkuAccordion type="single" class="accordion-root">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item" :value="item">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-animated-content">
          <div v-for="index in count" :key="index" style="padding: 10px">
            Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
            viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
            quam suscipit habitant sed.
          </div>
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h1>Open by default</h1>
    <OkuAccordion type="single" class="accordion-root" default-value="One">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item" :value="item">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-animated-content">
          <div v-for="index in count" :key="index" style="padding: 10px">
            Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
            viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
            quam suscipit habitant sed.
          </div>
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
  </div>
</template>
