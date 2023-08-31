<script setup lang="ts">
import { ref } from 'vue'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'

export interface ICheckBoxProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<ICheckBoxProps>(), {

})

const extra = ref(false)
const disabled = ref(false)
const hidden = ref(false)
const disabled3To5 = ref(false)

const dir = ref<RovingFocusGroupProps['dir']>('ltr')

function handleDir() {
  dir.value = dir.value === 'ltr' ? 'rtl' : 'ltr'
}
</script>

<template>
  <div class="dark:text-white">
    <div v-if="template === '#1' || allshow" :dir="dir" class="rounded-sm overflow-hidden">
      <h1>
        Direction: {{ dir }}
        <button type="button" @click="handleDir">
          Toggle to {{ dir === 'ltr' ? 'rtl' : 'ltr' }}
        </button>
      </h1>
      <h2>no orientation (both) + no looping</h2>
      <ButtonGroup :dir="dir" value="two">
        <Button value="one">
          one
        </Button>
        <Button value="two">
          two
        </Button>
        <Button value="three" disabled>
          three
        </Button>
        <Button value="four">
          four
        </Button>
      </ButtonGroup>

      <h2>no orientation (both) + looping</h2>
      <ButtonGroup :dir="dir" loop>
        <Button value="hidden" style="display: none;">
          Hidden
        </Button>
        <Button value="one">
          One
        </Button>
        <Button value="two">
          Two
        </Button>
        <Button disabled value="three">
          Three
        </Button>
        <Button value="four">
          Four
        </Button>
      </ButtonGroup>

      <h2>horizontal orientation + no looping</h2>
      <ButtonGroup orientation="horizontal" :dir="dir">
        <Button value="one">
          One
        </Button>
        <Button value="two">
          Two
        </Button>
        <Button disabled value="three">
          Three
        </Button>
        <Button value="four">
          Four
        </Button>
      </ButtonGroup>

      <h2>horizontal orientation + looping</h2>
      <ButtonGroup orientation="horizontal" :dir="dir" loop>
        <Button value="one">
          One
        </Button>
        <Button value="two">
          Two
        </Button>
        <Button disabled value="three">
          Three
        </Button>
        <Button value="four">
          Four
        </Button>
      </ButtonGroup>

      <h2>vertical orientation + no looping</h2>
      <ButtonGroup orientation="vertical" :dir="dir">
        <Button value="one">
          One
        </Button>
        <Button value="two">
          Two
        </Button>
        <Button disabled value="three">
          Three
        </Button>
        <Button value="four">
          Four
        </Button>
      </ButtonGroup>

      <h2>vertical orientation + looping</h2>
      <ButtonGroup orientation="vertical" :dir="dir" loop>
        <Button value="one">
          One
        </Button>
        <Button value="two">
          Two
        </Button>
        <Button disabled value="three">
          Three
        </Button>
        <Button value="four">
          Four
        </Button>
      </ButtonGroup>

      <!-- <ButtonProvide>
        <OkuRovingFocusGroup class="flex flex-col" orientation="vertical" dir="ltr">
          <Button value="one">
            Button1
          </Button>
          <Button value="two" disabled>
            Button2
          </Button>
          <Button value="three">
            three
          </Button>
        </OkuRovingFocusGroup>
      </ButtonProvide>

      <OkuRovingFocusGroup class="flex flex-col" loop>
        <OkuRovingFocusGroupItem
          as-child focusable @click="() => console.log('click')"
          @focus="() => console.log('focus')"
        >
          <button>1</button>
        </OkuRovingFocusGroupItem>
        <OkuRovingFocusGroupItem as-child focusable :active="true">
          <button>2</button>
        </OkuRovingFocusGroupItem>
      </OkuRovingFocusGroup>

      <OkuRovingFocusGroup class="flex gap-4" orientation="horizontal">
        <OkuRovingFocusGroupItem
          as-child focusable :active="true" @click="() => console.log('click')"
          @focus="() => console.log('focus')"
        >
          <button>1</button>
        </OkuRovingFocusGroupItem>
        <OkuRovingFocusGroupItem as-child focusable :active="true">
          <button>2</button>
        </OkuRovingFocusGroupItem>
        <OkuRovingFocusGroupItem as-child :focusable="false" :active="true">
          <button disable>
            2- disable
          </button>
        </OkuRovingFocusGroupItem>
        <OkuRovingFocusGroupItem as-child focusable :active="true">
          <button>2</button>
        </OkuRovingFocusGroupItem>
      </OkuRovingFocusGroup> -->
    </div>
    <div v-if="template === '#2' || allshow" class="rounded-sm overflow-hidden">
      <ButtonGroup orientation="vertical" loop>
        <Button value="1">
          1
        </Button>

        <div style="display: flex;flex-direction: column;">
          <Button value="2" class="mb-2">
            2
          </Button>

          <ButtonGroup orientation="horizontal" loop>
            <Button value="2.1">
              2.1
            </Button>
            <Button value="2.2">
              2.2
            </Button>
            <Button disabled value="2.3">
              2.3
            </Button>
            <Button value="2.4">
              2.4
            </Button>
          </ButtonGroup>
        </div>

        <Button value="3" disabled>
          3
        </Button>
        <Button value="4">
          4
        </Button>
      </ButtonGroup>
    </div>
    <!-- <div v-if="template === '#3' || allshow" class="w-[300px] rounded-sm overflow-hidden">
      <div class="flex space-x-5 w-full">
        <button @click="extra = !extra">
          Toggle extra
        </button>
        <button @click="disabled = !disabled">
          Toggle disabled
        </button>
        <button @click="hidden = !hidden">
          Toggle hidden
        </button>
        <button @click="disabled3To5 = !disabled3To5">
          Toggle disabled 3-5
        </button>
      </div>
      <ButtonProvide>
        <OkuRovingFocusGroup class="flex flex-col" orientation="vertical" dir="ltr">
          <Button v-if="extra" value="one" :class="hidden ? 'hidden' : ''">
            Toggle extra
          </Button>
          <Button value="two" :disabled="disabled">
            two
          </Button>
          <Button value="three" :disabled="disabled3To5">
            three
          </Button>
          <Button value="four" :disabled="disabled3To5" class="hidden">
            four
          </Button>
          <Button value="five" :disabled="disabled3To5">
            five
          </Button>
        </OkuRovingFocusGroup>
      </ButtonProvide>
    </div> -->
  </div>
</template>

<style>
h2 {
  font-weight: 500;
}

h1 {
  font-size: larger;
  font-weight: bold;
}

button {
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  padding: 2px;
}
</style>
