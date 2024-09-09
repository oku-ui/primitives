<script setup lang="ts">
import { shallowRef } from 'vue'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from '../index.ts'
import './styles.css'

const value = shallowRef<string>()
</script>

<template>
  <div>
    <h1>Uncontrolled</h1>
    <AccordionRoot type="single" class="accordion_rootClass">
      <AccordionItem class="accordion_itemClass" value="one">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            One
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
          integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
          habitant sed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="accordion_itemClass" value="two">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            Two
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
          porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="accordion_itemClass" value="three" disabled>
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            Three (disabled)
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
          himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="accordion_itemClass" value="four">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            Four
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Odio placerat
          <a href="#">quisque</a>
          sapien sagittis non sociis ligula penatibus
          dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
          <button>Cool</button>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h1>Controlled</h1>
    <AccordionRoot
      v-model:value="value"
      type="single"
      class="accordion_rootClass"
    >
      <AccordionItem class="accordion_itemClass" value="one">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            One
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
          integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
          habitant sed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="accordion_itemClass" value="two">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            Two
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
          porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="accordion_itemClass" value="three" disabled>
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            Three (disabled)
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
          himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="accordion_itemClass" value="four">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            Four
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Odio placerat
          <a href="#">quisque</a>
          sapien sagittis non sociis ligula penatibus
          dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
          <button>Cool</button>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h1>Collapsible</h1>
    <AccordionRoot type="single" class="accordion_rootClass" default-value="one" collapsible>
      <AccordionItem class="accordion_itemClass" value="one">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            One
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
          integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
          habitant sed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="accordion_itemClass" value="two">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            Two
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
          porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="accordion_itemClass" value="three" disabled>
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            Three (disabled)
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
          himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="accordion_itemClass" value="four">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            Four
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Odio placerat
          <a href="#">quisque</a>
          sapien sagittis non sociis ligula penatibus
          dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
          <button>Cool</button>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  </div>
</template>
