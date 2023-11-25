<script setup lang="ts">
import { ref } from 'vue'
import { OkuDropdownMenu, OkuDropdownMenuArrow, OkuDropdownMenuContent, OkuDropdownMenuItem, OkuDropdownMenuPortal, OkuDropdownMenuSeparator, OkuDropdownMenuSub, OkuDropdownMenuSubContent, OkuDropdownMenuSubTrigger, OkuDropdownMenuTrigger } from '@oku-ui/dropdown-menu'

const rtl = ref(false)
</script>

<template>
  <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }">
    <div :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }">
      <label :style="{ marginBottom: '10px' }">
        <input
          type="checkbox"
          :checked="rtl"
          @change="(event) => rtl = (event.currentTarget as HTMLInputElement).checked"
        >
        Right-to-left
      </label>
      <OkuDropdownMenu :dir="rtl ? 'rtl' : 'ltr'">
        <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
          Open
        </OkuDropdownMenuTrigger>
        <OkuDropdownMenuPortal>
          <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5">
            <OkuDropdownMenuItem
              class="dropdown-menu-item" @select="console.log('new-tab')"
            >
              New Tab
            </OkuDropdownMenuItem>
            <OkuDropdownMenuItem
              class="dropdown-menu-item" @select="console.log('new-window')"
            >
              New Window
            </OkuDropdownMenuItem>
            <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
            <OkuDropdownMenuSub>
              <OkuDropdownMenuSubTrigger class="dropdown-menu-sub-trigger dropdown-menu-item">
                Bookmarks →
              </OkuDropdownMenuSubTrigger>
              <OkuDropdownMenuPortal>
                <OkuDropdownMenuSubContent
                  class="dropdown-menu-content"
                  :side-offset="12"
                  :align-offset="-6"
                >
                  <OkuDropdownMenuItem
                    class="dropdown-menu-item"
                    @select="console.log('index')"
                  >
                    Inbox
                  </OkuDropdownMenuItem>
                  <OkuDropdownMenuItem
                    class="dropdown-menu-item"
                    @select="console.log('calendar')"
                  >
                    Calendar
                  </OkuDropdownMenuItem>
                  <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
                  <OkuDropdownMenuSub>
                    <OkuDropdownMenuSubTrigger class="dropdown-menu-sub-trigger dropdown-menu-item">
                      WorkOS →
                    </OkuDropdownMenuSubTrigger>
                    <OkuDropdownMenuPortal>
                      <OkuDropdownMenuSubContent
                        class="dropdown-menu-content"
                        :side-offset="12"
                        :align-offset="-6"
                      >
                        <OkuDropdownMenuItem
                          class="dropdown-menu-item"
                          @select="console.log('stitches')"
                        >
                          Stitches
                        </OkuDropdownMenuItem>
                        <OkuDropdownMenuItem
                          class="dropdown-menu-item"
                          @select="console.log('composer')"
                        >
                          Composer
                        </OkuDropdownMenuItem>
                        <OkuDropdownMenuItem
                          class="dropdown-menu-item"
                          @select="console.log('oku')"
                        >
                          Oku
                        </OkuDropdownMenuItem>
                        <OkuDropdownMenuArrow />
                      </OkuDropdownMenuSubContent>
                    </OkuDropdownMenuPortal>
                  </OkuDropdownMenuSub>
                  <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
                  <OkuDropdownMenuItem
                    class="dropdown-menu-item"
                    @select="console.log('notion')"
                  >
                    Notion
                  </OkuDropdownMenuItem>
                  <OkuDropdownMenuArrow />
                </OkuDropdownMenuSubContent>
              </OkuDropdownMenuPortal>
            </OkuDropdownMenuSub>
            <OkuDropdownMenuSub>
              <OkuDropdownMenuSubTrigger class="dropdown-menu-sub-trigger dropdown-menu-item" disabled>
                History →
              </OkuDropdownMenuSubTrigger>
              <OkuDropdownMenuPortal>
                <OkuDropdownMenuSubContent
                  class="dropdown-menu-content"
                  :side-offset="12"
                  :align-offset="-6"
                >
                  <OkuDropdownMenuItem
                    class="dropdown-menu-item"
                    @select="console.log('github')"
                  >
                    Github
                  </OkuDropdownMenuItem>
                  <OkuDropdownMenuItem
                    class="dropdown-menu-item"
                    @select="console.log('google')"
                  >
                    Google
                  </OkuDropdownMenuItem>
                  <OkuDropdownMenuItem
                    class="dropdown-menu-item"
                    @select="console.log('stack-overflow')"
                  >
                    Stack Overflow
                  </OkuDropdownMenuItem>
                  <OkuDropdownMenuArrow />
                </OkuDropdownMenuSubContent>
              </OkuDropdownMenuPortal>
            </OkuDropdownMenuSub>
            <OkuDropdownMenuSub>
              <OkuDropdownMenuSubTrigger class="dropdown-menu-sub-trigger dropdown-menu-item">
                Tools →
              </OkuDropdownMenuSubTrigger>
              <OkuDropdownMenuPortal>
                <OkuDropdownMenuSubContent
                  class="dropdown-menu-content"
                  :side-offset="12"
                  :align-offset="-6"
                >
                  <OkuDropdownMenuItem
                    class="dropdown-menu-item"
                    @select="console.log('extensions')"
                  >
                    Extensions
                  </OkuDropdownMenuItem>
                  <OkuDropdownMenuItem
                    class="dropdown-menu-item"
                    @select="console.log('task-manager')"
                  >
                    Task Manager
                  </OkuDropdownMenuItem>
                  <OkuDropdownMenuItem
                    class="dropdown-menu-item"
                    @select="console.log('developer-tools')"
                  >
                    Developer Tools
                  </OkuDropdownMenuItem>
                  <OkuDropdownMenuArrow />
                </OkuDropdownMenuSubContent>
              </OkuDropdownMenuPortal>
            </OkuDropdownMenuSub>
            <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
            <OkuDropdownMenuItem
              class="dropdown-menu-item"
              disabled
              @select="console.log('print')"
            >
              Print…
            </OkuDropdownMenuItem>
            <OkuDropdownMenuItem
              class="dropdown-menu-item" @select="console.log('cast')"
            >
              Cast…
            </OkuDropdownMenuItem>
            <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('find')">
              Find…
            </OkuDropdownMenuItem>
            <OkuDropdownMenuArrow />
          </OkuDropdownMenuContent>
        </OkuDropdownMenuPortal>
      </OkuDropdownMenu>
    </div>
  </div>
</template>
