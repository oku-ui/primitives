<script setup lang="ts">
import { onWatcherCleanup, shallowRef, watch } from 'vue'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from '../index.ts'
import './styles.css'

const values = ['One', 'Two', 'Three', 'Four']
const count = shallowRef(1)
function setCount(newValue: number) {
  count.value = newValue
}
const hasDynamicContent = shallowRef(false)
function setHasDynamicContent(newValue: boolean) {
  hasDynamicContent.value = newValue
}
let timerRef = 0

watch([hasDynamicContent, count], () => {
  if (hasDynamicContent.value) {
    timerRef = window.setTimeout(() => {
      const nextCount = count.value < 5 ? count.value + 1 : count.value
      if (nextCount === 5)
        setHasDynamicContent(false)
      count.value = nextCount
    }, 3000)
    onWatcherCleanup(() => {
      clearTimeout(timerRef)
    })
  }
})
</script>

<template>
  <div>
    <label>
      <input
        type="checkbox"
        :checked="hasDynamicContent"
        @click="(event) => {
          const checked = (event.target as HTMLInputElement).checked
          if (checked)
            setCount(1)
          setHasDynamicContent(checked)
        }"
      >
      Dynamic content
    </label>
    <br>
    <br>
    <h1>Closed by default</h1>
    <AccordionRoot type="single" class="accordion_rootClass">
      <AccordionItem v-for="value in values" :key="value" :value="value" class="accordion_itemClass">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ value }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_animatedContentClass">
          <div v-for="c in count" :key="c" :style="{ padding: '10px' }">
            Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
            viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
            quam suscipit habitant sed.
          </div>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h1>Open by default</h1>
    <AccordionRoot type="single" class="accordion_rootClass" default-value="One">
      <AccordionItem v-for="value in values" :key="value" :value="value" class="accordion_itemClass">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ value }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_animatedContentClass">
          <div v-for="c in count" :key="c" :style="{ padding: '10px' }">
            Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
            viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
            quam suscipit habitant sed.
          </div>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  </div>
</template>
