<script setup lang="ts">
import { shallowRef } from 'vue'
import { DropdownMenuArrow, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../index.ts'
import './style.css'
import '../../menu/stories/styles.css'

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
    <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }">
      <div :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }">
        <label :style="{ marginBottom: '10px' }">
          <input
            type="checkbox"
            :checked="rtl"
            @change="(event) => setRtl((event.currentTarget as any).checked)"
          >
          Right-to-left
        </label>
        <DropdownMenuRoot :dir="rtl ? 'rtl' : 'ltr'">
          <DropdownMenuTrigger class="dropdownMenu_triggerClass">
            Open
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent class="menu_contentClass" :side-offset="5">
              <DropdownMenuItem class="menu_itemClass" @select="log('new-tab')">
                New Tab
              </DropdownMenuItem>
              <DropdownMenuItem class="menu_itemClass" @select="log('new-window')">
                New Window
              </DropdownMenuItem>
              <DropdownMenuSeparator class="menu_separatorClass" />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger class="menu_subTriggerClass">
                  Bookmarks →
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    class="menu_contentClass"
                    :side-offset="12"
                    :align-offset="-6"
                  >
                    <DropdownMenuItem
                      class="menu_itemClass"
                      @select="log('index')"
                    >
                      Inbox
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="menu_itemClass"
                      @select="log('calendar')"
                    >
                      Calendar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator class="menu_separatorClass" />
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger class="menu_subTriggerClass">
                        WorkOS →
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent
                          class="menu_contentClass"
                          :side-offset="12"
                          :align-offset="-6"
                        >
                          <DropdownMenuItem
                            class="menu_itemClass"
                            @select="log('stitches')"
                          >
                            Stitches
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            class="menu_itemClass"
                            @select="log('composer')"
                          >
                            Composer
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            class="menu_itemClass"
                            @select="log('radix')"
                          >
                            Radix
                          </DropdownMenuItem>
                          <DropdownMenuArrow />
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator class="menu_separatorClass" />
                    <DropdownMenuItem
                      class="menu_itemClass"
                      @select="log('notion')"
                    >
                      Notion
                    </DropdownMenuItem>
                    <DropdownMenuArrow />
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger class="menu_subTriggerClass" disabled>
                  History →
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    class="menu_contentClass"
                    :side-offset="12"
                    :align-offset="-6"
                  >
                    <DropdownMenuItem
                      class="menu_itemClass"
                      @select="log('github')"
                    >
                      Github
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="menu_itemClass"
                      @select="log('google')"
                    >
                      Google
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="menu_itemClass"
                      @select="log('stack-overflow')"
                    >
                      Stack Overflow
                    </DropdownMenuItem>
                    <DropdownMenuArrow />
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger class="menu_subTriggerClass">
                  Tools →
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    class="menu_contentClass"
                    :side-offset="12"
                    :align-offset="-6"
                  >
                    <DropdownMenuItem
                      class="menu_itemClass"
                      @select="log('extensions')"
                    >
                      Extensions
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="menu_itemClass"
                      @select="log('task-manager')"
                    >
                      Task Manager
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="menu_itemClass"
                      @select="log('developer-tools')"
                    >
                      Developer Tools
                    </DropdownMenuItem>
                    <DropdownMenuArrow />
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator class="menu_separatorClass" />
              <DropdownMenuItem
                class="menu_itemClass"
                disabled
                @select="log('print')"
              >
                Print…
              </DropdownMenuItem>
              <DropdownMenuItem class="menu_itemClass" @select="log('cast')">
                Cast…
              </DropdownMenuItem>
              <DropdownMenuItem class="menu_itemClass" @select="log('find')">
                Find…
              </DropdownMenuItem>
              <DropdownMenuArrow />
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>
      </div>
    </div>
  </div>
</template>
