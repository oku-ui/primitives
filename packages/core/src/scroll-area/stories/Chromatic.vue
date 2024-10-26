<script setup lang="ts">
import Copy from './Copy.vue'
import ScrollAreaStory from './ScrollAreaStory.vue'
</script>

<template>
  <div>
    <h1>Vertical</h1>
    <h2>Auto with overflow</h2>
    <ScrollAreaStory type="auto" vertical :horizontal="false">
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Auto without overflow</h2>
    <ScrollAreaStory type="auto" vertical :horizontal="false">
      <Copy :style="{ height: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h2>Always with overflow</h2>
    <ScrollAreaStory type="always" vertical :horizontal="false">
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Always without overflow</h2>
    <ScrollAreaStory type="always" vertical :horizontal="false">
      <Copy :style="{ height: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h2>Scroll with overflow</h2>
    <ScrollAreaStory type="scroll" vertical :horizontal="false">
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Scroll without overflow</h2>
    <ScrollAreaStory type="scroll" vertical :horizontal="false">
      <Copy :style="{ height: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h2>Hover with overflow</h2>
    <ScrollAreaStory type="hover" vertical :horizontal="false">
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Hover without overflow</h2>
    <ScrollAreaStory type="hover" vertical :horizontal="false">
      <Copy :style="{ height: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h1>Horizontal</h1>
    <h2>Auto with overflow</h2>
    <ScrollAreaStory type="auto" :vertical="false" horizontal>
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Auto without overflow</h2>
    <ScrollAreaStory type="auto" :vertical="false" horizontal>
      <Copy :style="{ width: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h2>Always with overflow</h2>
    <ScrollAreaStory type="always" :vertical="false" horizontal>
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Always without overflow</h2>
    <ScrollAreaStory type="always" :vertical="false" horizontal>
      <Copy :style="{ width: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h2>Scroll with overflow</h2>
    <ScrollAreaStory type="scroll" :vertical="false" horizontal>
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Scroll without overflow</h2>
    <ScrollAreaStory type="scroll" :vertical="false" horizontal>
      <Copy :style="{ width: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h2>Hover with overflow</h2>
    <ScrollAreaStory type="hover" :vertical="false" horizontal>
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Hover without overflow</h2>
    <ScrollAreaStory type="hover" :vertical="false" horizontal>
      <Copy :style="{ width: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h1>Both</h1>
    <h2>Auto with overflow</h2>
    <ScrollAreaStory type="auto" vertical horizontal>
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Auto with horizontal overflow</h2>
    <ScrollAreaStory type="auto" vertical horizontal>
      <Copy v-for="(_, index) in 1" :key="index" />
    </ScrollAreaStory>

    <h2>Auto with vertical overflow</h2>
    <ScrollAreaStory type="auto" vertical horizontal>
      <Copy v-for="(_, index) in 10" :key="index" :style="{ width: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h2>Auto without overflow</h2>
    <ScrollAreaStory type="auto" vertical horizontal>
      <Copy :style="{ width: '50px', height: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h2>Always with overflow</h2>
    <ScrollAreaStory type="always" vertical horizontal>
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Always without overflow</h2>
    <ScrollAreaStory type="always" vertical horizontal>
      <Copy :style="{ width: '50px', height: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h2>Scroll with overflow</h2>
    <ScrollAreaStory type="scroll" vertical horizontal>
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Scroll without overflow</h2>
    <ScrollAreaStory type="scroll" vertical horizontal>
      <Copy :style="{ width: '50px', height: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h2>Hover with overflow</h2>
    <ScrollAreaStory type="hover" vertical horizontal>
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Hover without overflow</h2>
    <ScrollAreaStory type="hover" vertical horizontal>
      <Copy :style="{ width: '50px', height: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h2>Hover with horizontal overflow</h2>
    <ScrollAreaStory type="hover" vertical horizontal>
      <Copy v-for="(_, index) in 1" :key="index" />
    </ScrollAreaStory>

    <h2>Hover with vertical overflow</h2>
    <ScrollAreaStory type="hover" vertical horizontal>
      <Copy v-for="(_, index) in 10" :key="index" :style="{ width: '50px', overflow: 'hidden' }" />
    </ScrollAreaStory>

    <h1>Min thumb size</h1>
    <ScrollAreaStory type="always" vertical horizontal>
      <Copy v-for="(_, index) in 100" :key="index" :style="{ width: '10000px' }" />
    </ScrollAreaStory>

    <h1>RTL</h1>
    <h2>Prop</h2>
    <ScrollAreaStory type="always" dir="rtl" vertical horizontal>
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>

    <h2>Inherited: WIP</h2>
    <!-- <DirectionProvider dir="rtl"> -->
    <ScrollAreaStory type="always" vertical horizontal>
      <Copy v-for="(_, index) in 10" :key="index" />
    </ScrollAreaStory>
    <!-- </DirectionProvider> -->
  </div>
</template>
