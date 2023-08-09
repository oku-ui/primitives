<script setup lang="ts">
import { ref } from 'vue'
import { OkuRovingFocusGroup, OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import ButtonProvide from './ButtonProvide.vue'
import ButtonDeneme from './Button.vue'

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
</script>

<template>
  <div class="dark:text-white">
    <div v-if="template === '#1' || allshow" class="w-[300px] rounded-sm overflow-hidden">
      <ButtonProvide>
        <OkuRovingFocusGroup class="flex flex-col" orientation="vertical" dir="ltr">
          <ButtonDeneme value="one">
            ButtonDeneme1
          </ButtonDeneme>
          <ButtonDeneme value="two" disabled>
            ButtonDeneme2
          </ButtonDeneme>
          <ButtonDeneme value="three">
            three
          </ButtonDeneme>
        </OkuRovingFocusGroup>
      </ButtonProvide>

      <OkuRovingFocusGroup class="flex flex-col" loop>
        <OkuRovingFocusGroupItem
          as-child
          focusable @click="() => console.log('click')"
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
          as-child
          focusable :active="true" @click="() => console.log('click')"
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
      </OkuRovingFocusGroup>
    </div>
    <div v-if="template === '#2' || allshow" class="w-[300px] rounded-sm overflow-hidden">
      <ButtonProvide>
        <OkuRovingFocusGroup class="flex flex-col" orientation="vertical" dir="ltr">
          <ButtonDeneme value="2">
            2
          </ButtonDeneme>
          <div class="flex flex-col my-4">
            <OkuRovingFocusGroup class="flex" orientation="horizontal" loop>
              <ButtonDeneme value="2.1">
                2.1
              </ButtonDeneme>
              <ButtonDeneme value="2.2">
                2.2
              </ButtonDeneme>
            </OkuRovingFocusGroup>
          </div>
          <ButtonDeneme value="3" disabled>
            3
          </ButtonDeneme>

          <ButtonDeneme value="4">
            4
          </ButtonDeneme>
        </OkuRovingFocusGroup>
      </ButtonProvide>
    </div>
    <div v-if="template === '#3' || allshow" class="w-[300px] rounded-sm overflow-hidden">
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
          <ButtonDeneme v-if="extra" value="one" :class="hidden ? 'hidden' : ''">
            Toggle extra
          </ButtonDeneme>
          <ButtonDeneme value="two" :disabled="disabled">
            two
          </ButtonDeneme>
          <ButtonDeneme value="three" :disabled="disabled3To5">
            three
          </ButtonDeneme>
          <ButtonDeneme value="four" :disabled="disabled3To5" class="hidden">
            four
          </ButtonDeneme>
          <ButtonDeneme value="five" :disabled="disabled3To5">
            five
          </ButtonDeneme>
        </OkuRovingFocusGroup>
      </ButtonProvide>
    </div>
  </div>
</template>
