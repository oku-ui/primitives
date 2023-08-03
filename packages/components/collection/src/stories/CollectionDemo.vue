<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createCollection } from '@oku-ui/collection'

export interface OkuCollectionProps {
  template: '#1' | '#2'
  allshow?: boolean
}

withDefaults(defineProps<OkuCollectionProps>(), {
  template: '#1',
})

type ItemData = { disabled?: boolean }

const [Collection, useCollection] = createCollection<HTMLLIElement, ItemData >('List')

const labelRef = ref()
onMounted(() => {
  console.log(labelRef.value?.$el)
})
const alert = () => window.alert('clicked')

onMounted(() => {
  const getItems = useCollection(undefined)

  console.log(getItems.value)
})
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <Collection.Provider :scope="undefined">
        <Collection.Slot :scope="undefined">
          <ul clas="w-52">
            <Collection.ItemSlot :scope="undefined">
              <li class="opacity-50">
                Red
              </li>
            </Collection.ItemSlot>
            <Collection.ItemSlot :scope="undefined" :disabled="true">
              <li class="opacity-50">
                Green
              </li>
            </Collection.ItemSlot>

            <Collection.ItemSlot :scope="undefined">
              <li class="opacity-50">
                Blue
              </li>
            </Collection.ItemSlot>
          </ul>
        </Collection.Slot>
      </Collection.Provider>
    </div>
  </div>
</template>
