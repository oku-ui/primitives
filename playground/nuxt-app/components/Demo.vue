<script setup lang="ts">
import { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from '@teleskop150750/vue-primitives/accordion';
import { useConfigContext } from '@teleskop150750/vue-primitives/config';
const context = useConfigContext()
const id = context?.useId?.()
</script>

<template>
  <div>
    <h1>Uncontrolled</h1>
    {{ id }}
    <Accordion type="single" class="accordion_rootClass">
      <AccordionItem class="accordion_itemClass" value="one">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">One</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
          integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
          habitant sed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="accordion_itemClass" value="two">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">Two</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
          porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="accordion_itemClass" value="three" disabled>
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">Three (disabled)</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
          himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="accordion_itemClass" value="four">
        <AccordionHeader class="accordion_headerClass">
          <AccordionTrigger class="accordion_triggerClass">Four</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="accordion_contentClass">
          Odio placerat
          {{' '}}
          <a href="#">quisque</a>
          {{ ' ' }}
          sapien sagittis non sociis ligula penatibus
          dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
          <button>Cool</button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<style>
.accordion_rootClass {
  font-family: sans-serif;

  &[data-orientation="horizontal"] {
    display: flex;
    max-width: 40em;
    height: 50vh;
  }

  &[data-orientation="vertical"] {
    max-width: 20em;
  }
}

.accordion_itemClass {
  &[data-orientation="horizontal"] {
    display: flex;
    border-right: 1px solid white;
  }

  &[data-orientation="vertical"] {
    border-bottom: 1px solid white;
  }
}

.accordion_headerClass {
  margin: 0;

  &[data-orientation="horizontal"] {
    height: 100%;
  }
}

.accordion_triggerClass {
  box-sizing: border-box;
  appearance: none;
  border: none;
  padding: 10px;
  background-color: black;
  color: white;
  font-family: inherit;
  font-size: 1.2em;
  --shadow-color: crimson;
  text-align: inherit;

  &:focus {
    outline: none;
    box-shadow: inset 0 -5px 0 0 var(--shadow-color);
    color: red;
  }

  &[data-disabled] {
    color: #ccc;
  }

  &[data-state="open"] {
    background-color: red;
    color: white;

    &:focus {
      --shadow-color: #111;
      color: black;
    }
  }

  &[data-orientation="horizontal"] {
    height: 100%;
  }

  &[data-orientation="vertical"] {
    width: 100%;
  }
}

.accordion_contentClass {
  padding: 10px;
  line-height: 1.5;
}

@keyframes accordion_slideDown {
  from {
    height: 0;
  }

  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes accordion_slideUp {
  from {
    height: var(--radix-accordion-content-height);
  }

  to {
    height: 0;
  }
}

@keyframes accordion_open2D {
  from {
    width: 0;
    height: 0;
  }

  to {
    width: var(--radix-accordion-content-width);
    height: var(--radix-accordion-content-height);
  }
}

@keyframes accordion_close2D {
  from {
    width: var(--radix-accordion-content-width);
    height: var(--radix-accordion-content-height);
  }

  to {
    width: 0;
    height: 0;
  }
}

.accordion_animatedContentClass {
  overflow: hidden;

  &[data-state="open"] {
    animation: accordion_slideDown 300ms ease-out;
  }

  &[data-state="closed"] {
    animation: accordion_slideUp 300ms ease-out;
  }
}

.accordion_animated2DContentClass {
  overflow: hidden;

  &[data-state="open"] {
    animation: accordion_open2D 1000ms ease-out;
  }

  &[data-state="closed"] {
    animation: accordion_close2D 1000ms ease-out;
  }
}

.accordion_rootAttrClass,
.accordion_itemAttrClass,
.accordion_headerAttrClass,
.accordion_triggerAttrClass,
.accordion_contentAttrClass {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] {
    border-color: red;
  }

  &[data-state="open"] {
    border-color: green;
  }

  &[data-disabled] {
    border-style: dashed;
  }

  &:disabled {
    opacity: 0.5;
  }
}

.accordion_contentAttrClass {
  display: block;
}
</style>
