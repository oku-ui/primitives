<script setup lang="ts">
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from '../index.ts'
import './styles.css'

const items = ['One', 'Two', 'Three', 'Four']
</script>

<template>
  <div>
    <h1>Uncontrolled</h1>
    <h2>Single closed</h2>
    <AccordionRoot type="single" class="accordion_rootClass">
      <AccordionItem v-for="item in items" :key="item" class="accordion_itemClass" :value="item">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h2>Single open</h2>
    <AccordionRoot type="single" class="accordion_rootClass" default-value="Two">
      <AccordionItem v-for="item in items" :key="item" class="accordion_itemClass" :value="item">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h2>Multiple closed</h2>
    <AccordionRoot type="multiple" class="accordion_rootClass">
      <AccordionItem v-for="item in items" :key="item" class="accordion_itemClass" :value="item">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h2>Multiple open</h2>
    <AccordionRoot type="multiple" class="accordion_rootClass" :default-value="['One', 'Two']">
      <AccordionItem v-for="item in items" :key="item" class="accordion_itemClass" :value="item">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h1>Controlled</h1>
    <h2>Single open</h2>
    <AccordionRoot type="single" class="accordion_rootClass" value="Three">
      <AccordionItem v-for="item in items" :key="item" class="accordion_itemClass" :value="item">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h2>Multiple open</h2>
    <AccordionRoot type="multiple" class="accordion_rootClass" :value="['Two', 'Three']">
      <AccordionItem v-for="item in items" :key="item" class="accordion_itemClass" :value="item">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h1>Disabled (whole)</h1>
    <AccordionRoot type="single" class="accordion_rootClass" disabled>
      <AccordionItem v-for="item in items" :key="item" class="accordion_itemClass" :value="item">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h1>Disabled (item)</h1>
    <h2>Just item</h2>
    <AccordionRoot type="single" class="accordion_rootClass">
      <AccordionItem
        v-for="item in items" :key="item" class="accordion_itemClass" :value="item"
        :disabled="item === 'Two'"
      >
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h2>with `disabled=false` on top-level</h2>
    <AccordionRoot type="single" class="accordion_rootClass" :disabled="false">
      <AccordionItem
        v-for="item in items" :key="item" class="accordion_itemClass" :value="item"
        :disabled="item === 'Two'"
      >
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h1>Force mounted contents</h1>
    <AccordionRoot type="single" class="accordion_rootClass">
      <AccordionItem v-for="item in items" :key="item" class="accordion_itemClass" :value="item">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass" force-mount>
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h1>State attributes</h1>
    <h2>Accordion disabled</h2>
    <AccordionRoot type="single" class="accordion_rootAttrClass" default-value="Two" disabled>
      <AccordionItem v-for="item in items" :key="item" class="accordion_itemAttrClass" :value="item">
        <AccordionHeader class="accordion_headerAttrClass">
          <AccordionTrigger class="accordion_triggerAttrClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentAttrClass">
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h2>Accordion enabled with item override</h2>
    <AccordionRoot type="single" class="accordion_rootAttrClass" default-value="Two" :disabled="false">
      <AccordionItem
        v-for="item in items" :key="item" class="accordion_itemAttrClass" :value="item"
        :disabled="['Two', 'Four'].includes(item)"
      >
        <AccordionHeader class="accordion_headerAttrClass">
          <AccordionTrigger class="accordion_triggerAttrClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentAttrClass">
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>

    <h2>Accordion disabled with item override</h2>
    <AccordionRoot type="single" class="accordion_rootAttrClass" default-value="Two" :disabled="true">
      <AccordionItem
        v-for="item in items" :key="item" class="accordion_itemAttrClass" :value="item" :disabled="['Two', 'Four'].includes(item)
          ? false : undefined"
      >
        <AccordionHeader class="accordion_headerAttrClass">
          <AccordionTrigger class="accordion_triggerAttrClass">
            {{ item }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentAttrClass">
          {{ item }}
          : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
          viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
          suscipit habitant sed.
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  </div>
</template>
