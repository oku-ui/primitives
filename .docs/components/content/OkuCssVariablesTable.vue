<script setup lang="ts">
interface PropDef {
  cssVariable: string
  description: string[]
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
          <span>CSS Variable</span>
        </ProseTh>
        <ProseTh>
          <span>Description</span>
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr v-for="(item, i) in data" :key="`${item}-${i}`">
        <ProseTd>
          <ProseCodeInline>
            {{ item.cssVariable }}
          </ProseCodeInline>
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
