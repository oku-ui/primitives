<script setup lang="ts">
import { OkuContextMenu, OkuContextMenuArrow, OkuContextMenuContent, OkuContextMenuItem, OkuContextMenuLabel, OkuContextMenuPortal, OkuContextMenuSeparator, OkuContextMenuSub, OkuContextMenuSubContent, OkuContextMenuSubTrigger, OkuContextMenuTrigger } from '@oku-ui/context-menu'
</script>

<template>
  <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center' }">
    <OkuContextMenu>
      <OkuContextMenuTrigger
        class="context-menu-trigger"
        :style="{ padding: '100px', backgroundColor: 'royalblue' }"
      >
        <OkuContextMenu>
          <OkuContextMenuTrigger class="context-menu-trigger" :style="{ backgroundColor: 'tomato' }" />{{ ' ' }}
          <OkuContextMenuPortal>
            <OkuContextMenuContent class="context-menu-content" :align-offset="-5">
              <OkuContextMenuLabel class="context-menu-label">
                Red box menu
              </OkuContextMenuLabel>
              <OkuContextMenuSeparator class="context-menu-separator" />
              <OkuContextMenuItem class="context-menu-item" @select="console.log('red action1')">
                Red action 1
              </OkuContextMenuItem>
              <OkuContextMenuItem class="context-menu-item" @select="console.log('red action2')">
                Red action 2
              </OkuContextMenuItem>
              <OkuContextMenuSeparator class="context-menu-separator" />
              <OkuContextMenuSub>
                <OkuContextMenuSubTrigger class="context-menu-sub-trigger context-menu-item">
                  Submenu →
                </OkuContextMenuSubTrigger>
                <OkuContextMenuPortal>
                  <OkuContextMenuSubContent
                    class="context-menu-content"
                    :side-offset="12"
                    :align-offset="-6"
                  >
                    <OkuContextMenuItem
                      class="context-menu-item"
                      @elect="console.log('red sub action 1')"
                    >
                      Red sub action 1
                    </OkuContextMenuItem>
                    <OkuContextMenuItem
                      class="context-menu-item"
                      @select="console.log('red sub action 2')"
                    >
                      Red sub action 2
                    </OkuContextMenuItem>
                    <OkuContextMenuArrow />
                  </OkuContextMenuSubContent>
                </OkuContextMenuPortal>
              </OkuContextMenuSub>
            </OkuContextMenuContent>
          </OkuContextMenuPortal>
        </OkuContextMenu>
      </OkuContextMenuTrigger>
      <OkuContextMenuPortal>
        <OkuContextMenuContent class="context-menu-content" :align-offset="-5">
          <OkuContextMenuLabel class="context-menu-label">
            Blue box menu
          </OkuContextMenuLabel>
          <OkuContextMenuSeparator class="context-menu-separator" />
          <OkuContextMenuItem class="context-menu-item" @select="console.log('blue action1')">
            Blue action 1
          </OkuContextMenuItem>
          <OkuContextMenuItem class="context-menu-item" @select="console.log('blue action2')">
            Blue action 2
          </OkuContextMenuItem>
          <OkuContextMenuSeparator class="context-menu-separator" />
          <OkuContextMenuSub>
            <OkuContextMenuSubTrigger class="context-menu-sub-trigger context-menu-item">
              Submenu →
            </OkuContextMenuSubTrigger>
            <OkuContextMenuPortal>
              <OkuContextMenuSubContent class="context-menu-content" :side-offset="12" :align-offset="-6">
                <OkuContextMenuItem
                  class="context-menu-item"
                  @select="console.log('blue sub action 1')"
                >
                  Blue sub action 1
                </OkuContextMenuItem>
                <OkuContextMenuItem
                  class="context-menu-item"
                  @select="console.log('blue sub action 2')"
                >
                  Blue sub action 2
                </OkuContextMenuItem>
                <OkuContextMenuArrow />
              </OkuContextMenuSubContent>
            </OkuContextMenuPortal>
          </OkuContextMenuSub>
        </OkuContextMenuContent>
      </OkuContextMenuPortal>
    </OkuContextMenu>
  </div>
</template>
