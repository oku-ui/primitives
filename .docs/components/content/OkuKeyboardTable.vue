<script setup lang="ts">
interface PropDef {
  description: string
  keys: string[]
}

interface PropsTableProps {
  data: PropDef[]
}
defineProps<PropsTableProps>()
</script>

<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh class="w-[37%]">
          <span>Key</span>
        </ProseTh>
        <ProseTh>
          <span>Description</span>
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr v-for="(item, i) in data" :key="`${item}-${i}`">
        <ProseTd>
          <div class="flex items-center py-2">
            <kbd
              v-for="key in item.keys"
              :key="`${key}-${i}`"
              class="font-sans rounded-md bg-oku-800 text-white dark:bg-blue-950 px-2 py-0.5"
            >
              {{ key }}
            </kbd>
          </div>
        </ProseTd>
        <ProseTd>
          <div class="flex items-center">
            <span v-html="item.description" />
          </div>
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
