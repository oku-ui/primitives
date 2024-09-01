<script setup lang="ts">
import { computed, onMounted, shallowRef } from 'vue'
// import Foo from '../src/Foo.vue'
// import Primitive from './primitive/Primitive.vue'
import { Toggle } from './toggle/index.ts'
import { ToggleGroupItem, ToggleGroupRoot } from './toggle-group/index.ts'
import Accordion from './accordion/AccordionRoot.vue'
import AccordionItem from './accordion/AccordionItem.vue'
import { AccordionContent, AccordionHeader, AccordionTrigger } from './accordion/index.ts'

const open = shallowRef(true)
const dis = shallowRef(true)
function toggle() {
  open.value = !open.value
}
function toggleDis() {
  dis.value = !dis.value
}

const on = computed(() => {
  if (!open.value) {
    return {}
  }

  return {
    click: log,
  }
})

function log(event: Event) {
  if (dis.value) {
    event.preventDefault()
  }
  console.error('LOG')
}

onMounted(() => {
  // console.log(a.value)
})
</script>

<template>
  <div>
    <div>
      <Accordion type="single">
        <AccordionItem value="ff">
          <AccordionHeader>
            <AccordionTrigger>
              1
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            ff
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="ggg">
          <AccordionHeader>
            <AccordionTrigger>
              2
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            gg
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <button @click="toggle">
      ON {{ open }}
    </button>
    <button @click="toggleDis">
      Dis {{ dis }}
    </button>

    <div>
      <ToggleGroupRoot type="single">
        <ToggleGroupItem value="1">
          1
        </ToggleGroupItem>
        <ToggleGroupItem value="2">
          2
        </ToggleGroupItem>
      </ToggleGroupRoot>
    </div>

    <div>
      <Toggle v-on="on">
        Toggle
      </Toggle>
    </div>
    <div>
      <pre>{{ on }}</pre>
    </div>
  </div>
</template>

<style>
.baz {
  color: green;
}
</style>
