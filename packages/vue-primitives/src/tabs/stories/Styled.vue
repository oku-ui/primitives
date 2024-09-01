<script setup lang="ts">
import './styles.css'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '../index.ts'
</script>

<template>
  <div>
    <h1>Horizontal (automatic activation)</h1>
    <TabsRoot default-value="tab1" class="tabs_rootClass">
      <TabsList aria-label="tabs example" class="tabs_listClass">
        <TabsTrigger value="tab1" class="tabs_triggerClass">
          Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" disabled class="tabs_triggerClass">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3" class="tabs_triggerClass">
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" class="tabs_contentClass">
        Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
        integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
        pellentesque volutpat dictum ipsum.
      </TabsContent>
      <TabsContent value="tab2" class="tabs_contentClass">
        You'll never find me!
      </TabsContent>
      <TabsContent value="tab3" class="tabs_contentClass">
        Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
        quam tempus pretium.
      </TabsContent>
    </TabsRoot>

    <h1>Vertical (manual activation)</h1>
    <TabsRoot
      default-value="tab1"
      class="tabs_rootClass"
      orientation="vertical"
      activation-mode="manual"
    >
      <TabsList aria-label="tabs example" class="tabs_listClass">
        <TabsTrigger value="tab1" class="tabs_triggerClass">
          Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" disabled class="tabs_triggerClass">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3" class="tabs_triggerClass">
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" class="tabs_contentClass">
        Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
        integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
        pellentesque volutpat dictum ipsum.
      </TabsContent>
      <TabsContent value="tab2" class="tabs_contentClass">
        You'll never find me!
      </TabsContent>
      <TabsContent value="tab3" class="tabs_contentClass">
        Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
        quam tempus pretium.
      </TabsContent>
    </TabsRoot>
  </div>
</template>
