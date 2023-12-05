<script setup lang="ts">
interface PropDef {
  attribute: string
  values: string[]
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
          <span>Data attribute</span>
        </ProseTh>
        <ProseTh>
          <span>Values</span>
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr v-for="(item, index) in data" :key="index">
        <ProseTd>
          <ProseCodeInline class="!text-[12px]">
            {{ item.attribute }}
          </ProseCodeInline>
        </ProseTd>
        <ProseTd>
          <ProseCodeInline v-if="Array.isArray(item.values)" class="bg-oku-100">
            <span v-for="(value, index) in item.values" :key="index">
              {{ index + 1 !== item.values.length ? `"${value}" | ` : `"${value}"` }}
            </span>
          </ProseCodeInline>
          <span v-else>{{ item.values }}</span>
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
