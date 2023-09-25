<script setup lang="ts">
import { ref } from 'vue'
import { OkuAccordion, OkuAccordionContent, OkuAccordionHeader, OkuAccordionItem, OkuAccordionTrigger } from '@oku-ui/accordion'

const values = ref(['one', 'two', 'three', 'four'])

function onValueChange(value: any) {
  values.value = value
}
</script>

<template>
  <div>
    <OkuAccordion selection-type="multiple" class="rootClass" :value="values" @value-change="onValueChange">
      <OkuAccordionItem class="itemClass" value="one">
        <OkuAccordionHeader class="headerClass">
          <OkuAccordionTrigger class="triggerClass">
            One
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="animatedContentClass">
          Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
          integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
          habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
      <OkuAccordionItem class="itemClass" value="two">
        <OkuAccordionHeader class="headerClass">
          <OkuAccordionTrigger class="triggerClass">
            Two
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="animatedContentClass">
          Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
          porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
        </OkuAccordionContent>
      </OkuAccordionItem>
      <OkuAccordionItem class="itemClass" value="three">
        <OkuAccordionHeader class="headerClass">
          <OkuAccordionTrigger class="triggerClass">
            Three
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="animatedContentClass">
          Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
          himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
        </OkuAccordionContent>
      </OkuAccordionItem>
      <OkuAccordionItem class="itemClass" value="four">
        <OkuAccordionHeader class="headerClass">
          <OkuAccordionTrigger class="triggerClass">
            Four
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="animatedContentClass">
          Odio placerat <a href="#">quisque</a> sapien sagittis non sociis ligula penatibus
          dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
          <button>Cool</button>
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
  </div>
</template>
