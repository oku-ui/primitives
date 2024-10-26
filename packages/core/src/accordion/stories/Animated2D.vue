<script setup lang="ts">
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from '../index.ts'
import './styles.css'

const values = ['One', 'Two', 'Three', 'Four']
</script>

<template>
  <div>
    <AccordionRoot type="single" class="accordion_rootClass">
      <AccordionItem v-for="value in values" :key="value" :value="value" class="accordion_itemClass">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ value }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_animated2DContentClass">
          <div :style="{ padding: '10px', background: 'whitesmoke', overflow: 'hidden' }">
            <div :style="{ width: 'calc(20em - 20px)', height: '100px' }">
              Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
              viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
              quam suscipit habitant sed.
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  </div>
</template>
