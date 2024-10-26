<script setup lang="ts">
import {
  ContextMenuArrow,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '../index.ts'
import '../../menu/stories/styles.css'
import './styles.css'

function log(v: string) {
  // eslint-disable-next-line no-console
  console.log(v)
}
</script>

<template>
  <div>
    <div
      :style="{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }"
    >
      <ContextMenuRoot>
        <ContextMenuTrigger
          class="contextMenu_triggerClass"
          :style="{ padding: '100px', backgroundColor: 'royalblue' }"
        >
          <ContextMenuRoot>
            <ContextMenuTrigger class="contextMenu_triggerClass" :style="{ backgroundColor: 'tomato' }" />{{ ' ' }}
            <ContextMenuPortal>
              <ContextMenuContent class="menu_contentClass" :align-offset="-5">
                <ContextMenuLabel class="menu_labelClass">
                  Red box menu
                </ContextMenuLabel>
                <ContextMenuSeparator class="menu_separatorClass" />
                <ContextMenuItem class="menu_itemClass" @select="log('red action1')">
                  Red action 1
                </ContextMenuItem>
                <ContextMenuItem class="menu_itemClass" @select="log('red action2')">
                  Red action 2
                </ContextMenuItem>
                <ContextMenuSeparator class="menu_separatorClass" />
                <ContextMenuSub>
                  <ContextMenuSubTrigger class="menu_subTriggerClass">
                    Submenu →
                  </ContextMenuSubTrigger>
                  <ContextMenuPortal>
                    <ContextMenuSubContent
                      class="menu_contentClass"
                      :side-offset="12"
                      :align-offset="-6"
                    >
                      <ContextMenuItem
                        class="menu_itemClass"
                        @select="log('red sub action 1')"
                      >
                        Red sub action 1
                      </ContextMenuItem>
                      <ContextMenuItem
                        class="menu_itemClass"
                        @select="log('red sub action 2')"
                      >
                        Red sub action 2
                      </ContextMenuItem>
                      <ContextMenuArrow />
                    </ContextMenuSubContent>
                  </ContextMenuPortal>
                </ContextMenuSub>
              </ContextMenuContent>
            </ContextMenuPortal>
          </ContextMenuRoot>
        </ContextMenuTrigger>
        <ContextMenuPortal>
          <ContextMenuContent class="menu_contentClass" :align-offset="-5">
            <ContextMenuLabel class="menu_labelClass">
              Blue box menu
            </ContextMenuLabel>
            <ContextMenuSeparator class="menu_separatorClass" />
            <ContextMenuItem class="menu_itemClass" @select="log('blue action1')">
              Blue action 1
            </ContextMenuItem>
            <ContextMenuItem class="menu_itemClass" @select="log('blue action2')">
              Blue action 2
            </ContextMenuItem>
            <ContextMenuSeparator class="menu_separatorClass" />
            <ContextMenuSub>
              <ContextMenuSubTrigger class="menu_subTriggerClass">
                Submenu →
              </ContextMenuSubTrigger>
              <ContextMenuPortal>
                <ContextMenuSubContent class="menu_contentClass" :side-offset="12" :align-offset="-6">
                  <ContextMenuItem
                    class="menu_itemClass"
                    @select="log('blue sub action 1')"
                  >
                    Blue sub action 1
                  </ContextMenuItem>
                  <ContextMenuItem
                    class="menu_itemClass"
                    @select="log('blue sub action 2')"
                  >
                    Blue sub action 2
                  </ContextMenuItem>
                  <ContextMenuArrow />
                </ContextMenuSubContent>
              </ContextMenuPortal>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenuPortal>
      </ContextMenuRoot>
    </div>
  </div>
</template>
