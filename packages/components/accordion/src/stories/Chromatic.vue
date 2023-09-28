<script setup lang="ts">
import { ref } from 'vue'
import { OkuAccordion, OkuAccordionContent, OkuAccordionHeader, OkuAccordionItem, OkuAccordionTrigger } from '@oku-ui/accordion'

const values = ref(['One', 'Two', 'Three', 'Four'])
</script>

<template>
  <div>
    <h1>Uncontrolled</h1>
    <h2>Single closed</h2>
    <OkuAccordion type="single" class="accordion-root">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item" :value="item">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h2>Single open</h2>
    <OkuAccordion type="single" class="accordion-root" default-value="Two">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item" :value="item">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h2>Multiple closed</h2>
    <OkuAccordion type="multiple" class="accordion-root">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item" :value="item">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h2>Multiple open</h2>
    <OkuAccordion type="multiple" class="accordion-root" :default-value="['One', 'Two']">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item" :value="item">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h1>Controlled</h1>
    <h2>Single open</h2>
    <OkuAccordion type="single" class="accordion-root" value="Three">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item" :value="item">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h2>Multiple open</h2>
    <OkuAccordion type="multiple" class="accordion-root" :value="['Two', 'Three']">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item" :value="item">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h1>Disabled (whole)</h1>
    <OkuAccordion type="single" class="accordion-root" disabled>
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item" :value="item">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h1>Disabled (item)</h1>
    <h2>Just item</h2>
    <OkuAccordion type="single" class="accordion-root">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item" :value="item" :disabled="item === 'Two'">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h2>with `disabled=false` on top-level</h2>
    <OkuAccordion type="single" class="accordion-root" :disabled="false">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item" :value="item" :disabled="item === 'Two'">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content">
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h1>Force mounted contents</h1>
    <OkuAccordion type="single" class="accordion-root">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item" :value="item">
        <OkuAccordionHeader class="accordion-header">
          <OkuAccordionTrigger class="accordion-trigger">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content" force-mount>
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h1>State attributes</h1>
    <h2>Accordion disabled</h2>
    <OkuAccordion type="single" class="accordion-root-attr" default-value="Two" disabled>
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item-attr" :value="item">
        <OkuAccordionHeader class="accordion-header-attr">
          <OkuAccordionTrigger class="accordion-trigger-attr">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content-attr">
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h2>Accordion enabled with item override</h2>
    <OkuAccordion type="single" class="accordion-root-attr" default-value="Two" :disabled="false">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item-attr" :value="item" :disabled="['Two', 'Four'].includes(item)">
        <OkuAccordionHeader class="accordion-header-attr">
          <OkuAccordionTrigger class="accordion-trigger-attr">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content-attr">
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
    <h2>Accordion disabled with item override</h2>
    <OkuAccordion type="single" class="accordion-root-attr" default-value="Two" :disabled="true">
      <OkuAccordionItem v-for="item in values" :key="item" class="accordion-item-attr" :value="item" :disabled="['Two', 'Four'].includes(item) ? false : undefined">
        <OkuAccordionHeader class="accordion-header-attr">
          <OkuAccordionTrigger class="accordion-trigger-attr">
            {{ item }}
          </OkuAccordionTrigger>
        </OkuAccordionHeader>
        <OkuAccordionContent class="accordion-content-attr">
          {{ item }}: Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
          quam suscipit habitant sed.
        </OkuAccordionContent>
      </OkuAccordionItem>
    </OkuAccordion>
  </div>
</template>
