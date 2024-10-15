<script setup lang="ts">
const { data: primitives } = await useAsyncData('primitives-components', () => queryContent('primitives', 'components').where({ hide: { $ne: true } }).only([
  'link',
  'version',
  'title',
  'description',
  'componentName',
]).sort({ to: -1 }).find())

onMounted(() => {
  localStorage.getItem('oku-design')
})
</script>

<template>
  <div class="relative">
    <!-- <ContentSlot :use="$slots.root" /> -->

    <!-- <div class="mx-auto max-w-xs mb-10">
      <OkuToggleGroup
        v-model="useGlobal.design"
        class="inline-flex rounded w-full"
        type="single"
        default-value="center"
        aria-label="Text alignment"
        @value-change="useGlobal.setDesign"
      >
        <OkuToggleGroupItem class="toggle-group-item" value="oku" aria-label="Left aligned">
          Oku
        </OkuToggleGroupItem>
        <OkuToggleGroupItem class="toggle-group-item" value="radix" aria-label="Center aligned">
          Radix
        </OkuToggleGroupItem>
      </OkuToggleGroup>
    </div> -->

    <div class="hidden lg:grid grid-cols-3 gap-6 mb-6">
      <!-- eslint-disable -->
      <div class="w-full space-y-6">
        <template v-for="(item, index) in primitives">
          <ComponentCard v-if="index % 3 === 0" :key="item.title" :data="item" />
        </template>
      </div>
      <div class="w-full space-y-6">
        <template v-for="(item, index) in primitives">
          <ComponentCard v-if="index % 3 === 1" :key="item.title" :data="item" />
        </template>
      </div>
      <div class="w-full space-y-6">
        <template v-for="(item, index) in primitives">
          <ComponentCard v-if="index % 3 === 2" :key="item.title" :data="item" />
        </template>
      </div>
    </div>
    <div class="hidden sm:grid grid-cols-2 lg:hidden gap-6 mb-6">
      <!-- eslint-disable -->
      <div class="w-full space-y-6">
        <template v-for="(item, index) in primitives">
          <ComponentCard v-if="index % 2 === 0" :key="item.title" :data="item" />
        </template>
      </div>
      <div class="w-full space-y-6">
        <template v-for="(item, index) in primitives">
          <ComponentCard v-if="index % 2 === 1" :key="item.title" :data="item" />
        </template>
      </div>
    </div>
    <div class="grid sm:hidden grid-cols-1 gap-6 mb-6">
      <!-- eslint-disable -->
      <div class="w-full space-y-6">
        <template v-for="item in primitives" :key="item.title">
          <ComponentCard :data="item" />
        </template>
      </div>
    </div>
  </div>
</template>
