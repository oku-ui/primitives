<script setup lang="ts">
import { ref } from 'vue'
import { OkuContextMenu, OkuContextMenuArrow, OkuContextMenuContent, OkuContextMenuItem, OkuContextMenuPortal, OkuContextMenuSeparator, OkuContextMenuSub, OkuContextMenuSubContent, OkuContextMenuSubTrigger, OkuContextMenuTrigger } from '@oku-ui/context-menu'

const rtl = ref(false)
</script>

<template>
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
          @change="(event) => rtl = (event.currentTarget as HTMLInputElement).checked"
        >
        Right-to-left
      </label>
      <OkuContextMenu :dir="rtl ? 'rtl' : 'ltr'">
        <OkuContextMenuTrigger class="context-menu-trigger">
          Right Click Here
        </OkuContextMenuTrigger>
        <OkuContextMenuPortal>
          <OkuContextMenuContent class="context-menu-content">
            <OkuContextMenuItem class="context-menu-item" @select="console.log('new-tab')">
              New Tab
            </OkuContextMenuItem>
            <OkuContextMenuItem class="context-menu-item" @select="console.log('new-window')">
              New Window
            </OkuContextMenuItem>
            <OkuContextMenuSeparator class="context-menu-separator" />
            <OkuContextMenuSub>
              <OkuContextMenuSubTrigger class="context-menu-sub-trigger context-menu-item">
                Bookmarks →
              </OkuContextMenuSubTrigger>
              <OkuContextMenuPortal>
                <OkuContextMenuSubContent
                  class="context-menu-content"
                  :side-offset="12"
                  :align-offset="-6"
                >
                  <OkuContextMenuItem class="context-menu-item" @select="console.log('index')">
                    Inbox
                  </OkuContextMenuItem>
                  <OkuContextMenuItem
                    class="context-menu-item"
                    @select="console.log('calendar')"
                  >
                    Calendar
                  </OkuContextMenuItem>
                  <OkuContextMenuSeparator class="context-menu-separator" />
                  <OkuContextMenuSub>
                    <OkuContextMenuSubTrigger class="context-menu-sub-trigger context-menu-item">
                      WorkOS →
                    </OkuContextMenuSubTrigger>
                    <OkuContextMenuPortal>
                      <OkuContextMenuSubContent
                        class="context-menu-content"
                        :side-offset="12"
                        :align-offset="-6"
                      >
                        <OkuContextMenuItem
                          class="context-menu-item"
                          @select="console.log('stitches')"
                        >
                          Stitches
                        </OkuContextMenuItem>
                        <OkuContextMenuItem
                          class="context-menu-item"
                          @select="console.log('composer')"
                        >
                          Composer
                        </OkuContextMenuItem>
                        <OkuContextMenuItem
                          class="context-menu-item"
                          @select="console.log('oku')"
                        >
                          Oku
                        </OkuContextMenuItem>
                        <OkuContextMenuArrow />
                      </OkuContextMenuSubContent>
                    </OkuContextMenuPortal>
                  </OkuContextMenuSub>
                  <OkuContextMenuSeparator class="context-menu-separator" />
                  <OkuContextMenuItem
                    class="context-menu-item"
                    @select="console.log('notion')"
                  >
                    Notion
                  </OkuContextMenuItem>
                  <OkuContextMenuArrow />
                </OkuContextMenuSubContent>
              </OkuContextMenuPortal>
            </OkuContextMenuSub>
            <OkuContextMenuSub>
              <OkuContextMenuSubTrigger class="context-menu-sub-trigger context-menu-item" disabled>
                History →
              </OkuContextMenuSubTrigger>
              <OkuContextMenuPortal>
                <OkuContextMenuSubContent
                  class="context-menu-content"
                  :side-offset="12"
                  :align-offset="-6"
                >
                  <OkuContextMenuItem
                    class="context-menu-item"
                    @select="console.log('github')"
                  >
                    Github
                  </OkuContextMenuItem>
                  <OkuContextMenuItem
                    class="context-menu-item"
                    @select="console.log('google')"
                  >
                    Google
                  </OkuContextMenuItem>
                  <OkuContextMenuItem
                    class="context-menu-item"
                    @select="console.log('stack-overflow')"
                  >
                    Stack Overflow
                  </OkuContextMenuItem>
                  <OkuContextMenuArrow />
                </OkuContextMenuSubContent>
              </OkuContextMenuPortal>
            </OkuContextMenuSub>
            <OkuContextMenuSub>
              <OkuContextMenuSubTrigger class="context-menu-sub-trigger context-menu-item">
                Tools →
              </OkuContextMenuSubTrigger>
              <OkuContextMenuPortal>
                <OkuContextMenuSubContent
                  class="context-menu-content"
                  :side-offset="12"
                  :align-offset="-6"
                >
                  <OkuContextMenuItem
                    class="context-menu-item"
                    @select="console.log('extensions')"
                  >
                    Extensions
                  </OkuContextMenuItem>
                  <OkuContextMenuItem
                    class="context-menu-item"
                    @select="console.log('task-manager')"
                  >
                    Task Manager
                  </OkuContextMenuItem>
                  <OkuContextMenuItem
                    class="context-menu-item"
                    @select="console.log('developer-tools')"
                  >
                    Developer Tools
                  </OkuContextMenuItem>
                  <OkuContextMenuArrow />
                </OkuContextMenuSubContent>
              </OkuContextMenuPortal>
            </OkuContextMenuSub>
            <OkuContextMenuSeparator class="context-menu-separator" />
            <OkuContextMenuItem
              class="context-menu-item"
              disabled
              @select="console.log('print')"
            >
              Print…
            </OkuContextMenuItem>
            <OkuContextMenuItem class="context-menu-item" @select="console.log('cast')">
              Cast…
            </OkuContextMenuItem>
            <OkuContextMenuItem class="context-menu-item" @select="console.log('find')">
              Find…
            </OkuContextMenuItem>
          </OkuContextMenuContent>
        </OkuContextMenuPortal>
      </OkuContextMenu>
    </div>
  </div>
</template>
