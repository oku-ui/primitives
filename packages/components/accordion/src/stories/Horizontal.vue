<script setup lang="ts">
import { OkuAccordion, OkuAccordionContent, OkuAccordionHeader, OkuAccordionItem, OkuAccordionTrigger } from '@oku-ui/accordion'
</script>

<template>
  <div>
    <h1>Horizontal Orientation</h1>
    <OkuAccordion selection-type="single" class="accordion-root" orientation="horizontal">
      <OkuAccordionItem class="accordion-item" value="one">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            One
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
          integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
          habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
      <OkuAccordionItem class="accordion-item" value="two">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            Two
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
          porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
        </OkuAccordionContent>
      </OkuAccordionItem>
      <OkuAccordionItem class="accordion-item" value="three" disabled>
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            Three (disabled)
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
          himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
        </OkuAccordionContent>
      </OkuAccordionItem>
      <OkuAccordionItem class="accordion-item" value="four">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            Four
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          Odio placerat <a href="#">quisque</a> sapien sagittis non sociis ligula penatibus
          dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
          <button>Cool</button>
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
  </div>
</template>
