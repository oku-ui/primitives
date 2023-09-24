<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { OkuAccordion, OkuAccordionContent, OkuAccordionHeader, OkuAccordionItem, OkuAccordionTrigger } from '@oku-ui/accordion'

const values = ref(['One', 'Two', 'Three', 'Four'])

const count = ref(1)

const hasDynamicContent = ref(false)

const timerRef = ref(0)

watchEffect(() => {
  if (hasDynamicContent.value) {
    timerRef.value = window.setTimeout(() => {
      const nextCount = count.value < 5 ? count.value + 1 : count.value
      if (nextCount === 5)
        hasDynamicContent.value = false
    }, 3000)
    return () => {
      clearTimeout(timerRef.value)
    }
  }
})
function valueChange(event: any) {
  const checked = event.target.checked
  if (checked)
    count.value = 1
  hasDynamicContent.value = checked
}
</script>

<template>
  <div>
    <label>
      <input
        type="checkbox"
        :checked="hasDynamicContent"
        @onChange="valueChange"
      >
      Dynamic content
    </label>
    <h1>Closed by default</h1>
    <OkuAccordion selection-type="single" class="rootClass">
      <OkuAccordionItem v-for="item in values" :key="item" class="itemClass" :value="item">
        <OkuAccordionHeader class="headerClass">
          <OkuAccordionTrigger class="triggerClass">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="animatedContentClass">
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
