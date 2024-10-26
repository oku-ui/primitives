<script setup lang="ts">
import { shallowRef } from 'vue'
import {
  ContextMenuArrow,
  ContextMenuContent,
  ContextMenuItem,
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

const rtl = shallowRef(false)

function setRtl(value: boolean) {
  rtl.value = value
}

function log(v: string) {
  // eslint-disable-next-line no-console
  console.log(v)
}
</script>

<template>
  <div>
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '20px',
      }"
    >
      <div :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center' }">
        <label :style="{ marginBottom: '10px' }">
          <input
            type="checkbox"
            :checked="rtl"
            @change="(event) => setRtl((event.currentTarget as any).checked)"
          >
          Right-to-left
        </label>
        <ContextMenuRoot :dir="rtl ? 'rtl' : 'ltr'">
          <ContextMenuTrigger class="contextMenu_triggerClass">
            Right Click Here
          </ContextMenuTrigger>
          <ContextMenuPortal>
            <ContextMenuContent class="menu_contentClass">
              <ContextMenuItem class="menu_itemClass" @select="log('new-tab')">
                New Tab
              </ContextMenuItem>
              <ContextMenuItem class="menu_itemClass" @select="log('new-window')">
                New Window
              </ContextMenuItem>
              <ContextMenuSeparator class="menu_separatorClass" />
              <ContextMenuSub>
                <ContextMenuSubTrigger class="menu_subTriggerClass">
                  Bookmarks →
                </ContextMenuSubTrigger>
                <ContextMenuPortal>
                  <ContextMenuSubContent
                    class="menu_contentClass"
                    :side-offset="12"
                    :align-offset="-6"
                  >
                    <ContextMenuItem class="menu_itemClass" @select="log('index')">
                      Inbox
                    </ContextMenuItem>
                    <ContextMenuItem
                      class="menu_itemClass"
                      @select="log('calendar')"
                    >
                      Calendar
                    </ContextMenuItem>
                    <ContextMenuSeparator class="menu_separatorClass" />
                    <ContextMenuSub>
                      <ContextMenuSubTrigger class="menu_subTriggerClass">
                        WorkOS →
                      </ContextMenuSubTrigger>
                      <ContextMenuPortal>
                        <ContextMenuSubContent
                          class="menu_contentClass"
                          :side-offset="12"
                          :align-offset="-6"
                        >
                          <ContextMenuItem
                            class="menu_itemClass"
                            @select="log('stitches')"
                          >
                            Stitches
                          </ContextMenuItem>
                          <ContextMenuItem
                            class="menu_itemClass"
                            @select="log('composer')"
                          >
                            Composer
                          </ContextMenuItem>
                          <ContextMenuItem
                            class="menu_itemClass"
                            @select="log('radix')"
                          >
                            Radix
                          </ContextMenuItem>
                          <ContextMenuArrow />
                        </ContextMenuSubContent>
                      </ContextMenuPortal>
                    </ContextMenuSub>
                    <ContextMenuSeparator class="menu_separatorClass" />
                    <ContextMenuItem
                      class="menu_itemClass"
                      @select="log('notion')"
                    >
                      Notion
                    </ContextMenuItem>
                    <ContextMenuArrow />
                  </ContextMenuSubContent>
                </ContextMenuPortal>
              </ContextMenuSub>
              <ContextMenuSub>
                <ContextMenuSubTrigger class="menu_subTriggerClass" disabled>
                  History →
                </ContextMenuSubTrigger>
                <ContextMenuPortal>
                  <ContextMenuSubContent
                    class="menu_contentClass"
                    :side-offset="12"
                    :align-offset="-6"
                  >
                    <ContextMenuItem
                      class="menu_itemClass"
                      @select="log('github')"
                    >
                      Github
                    </ContextMenuItem>
                    <ContextMenuItem
                      class="menu_itemClass"
                      @select="log('google')"
                    >
                      Google
                    </ContextMenuItem>
                    <ContextMenuItem
                      class="menu_itemClass"
                      @select="log('stack-overflow')"
                    >
                      Stack Overflow
                    </ContextMenuItem>
                    <ContextMenuArrow />
                  </ContextMenuSubContent>
                </ContextMenuPortal>
              </ContextMenuSub>
              <ContextMenuSub>
                <ContextMenuSubTrigger class="menu_subTriggerClass">
                  Tools →
                </ContextMenuSubTrigger>
                <ContextMenuPortal>
                  <ContextMenuSubContent
                    class="menu_contentClass"
                    :side-offset="12"
                    :align-offset="-6"
                  >
                    <ContextMenuItem
                      class="menu_itemClass"
                      @select="log('extensions')"
                    >
                      Extensions
                    </ContextMenuItem>
                    <ContextMenuItem
                      class="menu_itemClass"
                      @select="log('task-manager')"
                    >
                      Task Manager
                    </ContextMenuItem>
                    <ContextMenuItem
                      class="menu_itemClass"
                      @select="log('developer-tools')"
                    >
                      Developer Tools
                    </ContextMenuItem>
                    <ContextMenuArrow />
                  </ContextMenuSubContent>
                </ContextMenuPortal>
              </ContextMenuSub>
              <ContextMenuSeparator class="menu_separatorClass" />
              <ContextMenuItem
                class="menu_itemClass"
                disabled
                @select="log('print')"
              >
                Print…
              </ContextMenuItem>
              <ContextMenuItem class="menu_itemClass" @select="log('cast')">
                Cast…
              </ContextMenuItem>
              <ContextMenuItem class="menu_itemClass" @select="log('find')">
                Find…
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenuPortal>
        </ContextMenuRoot>
      </div>
    </div>
  </div>
</template>
