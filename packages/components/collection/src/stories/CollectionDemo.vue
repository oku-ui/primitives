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

const { CollectionSlot, CollectionItemSlot, CollectionProvider, useCollection } = createCollection<HTMLLIElement, ItemData >('List')

const labelRef = ref<any>()
onMounted(() => {
  console.log(labelRef.value, 'ref')
})
const alert = () => window.alert('clicked')

function LogsItem() {
  const getItems = useCollection(undefined)
  console.log(getItems.value[0].ref.value)
}
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <CollectionProvider :scope="undefined">
        <CollectionSlot :scope="undefined">
          <ul clas="w-52">
            <CollectionItemSlot ref="labelRef" :scope="undefined">
              <li>
                Red
              </li>
            </CollectionItemSlot>
            <CollectionItemSlot :scope="undefined" :disabled="true">
              <li class="opacity-50">
                Green
              </li>
            </CollectionItemSlot>

            <CollectionItemSlot :scope="undefined">
              <li>
                Blue
              </li>
            </CollectionItemSlot>
          </ul>
        </CollectionSlot>
        <LogsItem />
      </CollectionProvider>
    </div>
  </div>
</template>
