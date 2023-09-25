<script setup lang="ts">
import { ref } from 'vue'
import { OkuAccordion, OkuAccordionContent, OkuAccordionHeader, OkuAccordionItem, OkuAccordionTrigger } from '@oku-ui/accordion'

const values = ref(['One', 'Two', 'Three', 'Four'])

const count = ref(1)
</script>

<template>
  <div>
    <OkuAccordion selection-type="single" class="rootClass">
      <OkuAccordionItem v-for="item in values" :key="item" class="itemClass" :value="item">
        <OkuAccordionHeader class="headerClass">
          <OkuAccordionTrigger class="triggerClass">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="animated2DContentClass">
          <div v-for="index in count" :key="index" style="padding: 10px">
            <div style="padding: 10; background: whitesmoke; overflow: hidden">
              <div style="width: calc(20em - 20px); height: 100px">
                Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
                quam suscipit habitant sed.
              </div>
            </div>
          </div>
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
  </div>
</template>
