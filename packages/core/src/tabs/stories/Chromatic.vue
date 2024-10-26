<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <h1>Uncontrolled</h1>
    <TabsRoot default-value="tab3" class="tabs_rootClass">
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

    <h1>Controlled</h1>
    <TabsRoot value="tab3" class="tabs_rootClass">
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

    <h1>Vertical</h1>
    <TabsRoot default-value="tab3" class="tabs_rootClass" orientation="vertical" activation-mode="manual">
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

    <h1>Direction</h1>
    <h2>Prop</h2>
    <TabsRoot default-value="tab3" dir="rtl" class="tabs_rootClass">
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

    <h2>Inherited Wip:DirectionProvider</h2>
    <!-- <DirectionProvider dir="rtl"> -->
    <TabsRoot default-value="tab3" class="tabs_rootClass">
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
        Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem
        himenaeos integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida
        elementum pellentesque volutpat dictum ipsum.
      </TabsContent>
      <TabsContent value="tab2" class="tabs_contentClass">
        You'll never find me!
      </TabsContent>
      <TabsContent value="tab3" class="tabs_contentClass">
        Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
        quam tempus pretium.
      </TabsContent>
    </TabsRoot>
    <!-- </DirectionProvider> -->

    <h1>Animated</h1>
    <p>Should not animate on initial mount</p>
    <TabsRoot value="tab1" class="tabs_rootClass">
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
      <TabsContent value="tab1" class="tabs_animatedContentClass" :style="{ animationDuration: '3000ms' }">
        Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
        integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
        pellentesque volutpat dictum ipsum.
      </TabsContent>
      <TabsContent value="tab2" class="tabs_animatedContentClass">
        You'll never find me!
      </TabsContent>
      <TabsContent value="tab3" class="tabs_animatedContentClass">
        Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
        quam tempus pretium.
      </TabsContent>
    </TabsRoot>

    <h1>Force mounted contents</h1>
    <TabsRoot class="tabs_rootClass">
      <TabsList aria-label="tabs example" class="tabs_listClass">
        <TabsTrigger value="tab1" class="tabs_triggerClass">
          Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" class="tabs_triggerClass">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3" class="tabs_triggerClass">
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" class="tabs_contentClass" force-mount>
        Tab 1 content
      </TabsContent>
      <TabsContent value="tab2" class="tabs_contentClass" force-mount>
        Tab 2 content
      </TabsContent>
      <TabsContent value="tab3" class="tabs_contentClass" force-mount>
        Tab 3 content
      </TabsContent>
    </TabsRoot>

    <h1>State attributes</h1>
    <TabsRoot default-value="tab3" class="tabs_rootAttrClass">
      <TabsList aria-label="tabs example" class="tabs_listAttrClass">
        <TabsTrigger value="tab1" class="tabs_triggerAttrClass">
          Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" disabled class="tabs_triggerAttrClass">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3" class="tabs_triggerAttrClass">
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" class="tabs_contentAttrClass">
        Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
        integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
        pellentesque volutpat dictum ipsum.
      </TabsContent>
      <TabsContent value="tab2" class="tabs_contentAttrClass">
        You'll never find me!
      </TabsContent>
      <TabsContent value="tab3" class="tabs_contentAttrClass">
        Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
        quam tempus pretium.
      </TabsContent>
    </TabsRoot>
  </div>
</template>
