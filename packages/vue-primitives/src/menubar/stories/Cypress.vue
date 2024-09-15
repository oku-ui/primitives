<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarRoot,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '../index.ts'
import './styles.css'
import '../../menu/stories/styles.css'

const loop = shallowRef(false)
function setLoop(value: boolean) {
  loop.value = value
}
const rtl = shallowRef(false)
function setRtl(value: boolean) {
  rtl.value = value
}
const dir = computed(() => rtl.value ? 'rtl' : 'ltr')
</script>

<template>
  <div>
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: '50px',
      }"
    >
      <div :style="{ display: 'flex', gap: '25px', marginBottom: '20px' }">
        <label>
          <input
            type="checkbox"
            :checked="rtl"
            @change="(event) => setRtl((event.currentTarget as any).checked)"
          >
          Right-to-left
        </label>

        <label>
          <input
            type="checkbox"
            :checked="loop"
            @change="(event) => setLoop((event.currentTarget as any).checked)"
          >
          Loop
        </label>
      </div>

      <div :dir="dir">
        <MenubarRoot class="menubar_rootClass" :loop="loop" :dir="dir">
          <MenubarMenu>
            <MenubarTrigger class="menubar_triggerClass">
              File
            </MenubarTrigger>
            <MenubarPortal>
              <MenubarContent class="menu_contentClass" :side-offset="2">
                <MenubarItem class="menu_itemClass">
                  New Tab
                </MenubarItem>
                <MenubarItem class="menu_itemClass">
                  New Window
                </MenubarItem>
                <MenubarItem class="menu_itemClass">
                  New Incognito Window
                </MenubarItem>
                <MenubarSeparator class="menu_separatorClass" />
                <MenubarSub>
                  <MenubarSubTrigger class="menu_subTriggerClass">
                    Share <span>→</span>
                  </MenubarSubTrigger>
                  <MenubarSubContent class="menu_contentClass" :align-offset="-6">
                    <MenubarItem class="menu_itemClass">
                      Email Link
                    </MenubarItem>
                    <MenubarItem class="menu_itemClass">
                      Messages
                    </MenubarItem>
                    <MenubarItem class="menu_itemClass">
                      Airdrop
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator class="menu_separatorClass" />
                <MenubarItem class="menu_itemClass">
                  Print…
                </MenubarItem>
              </MenubarContent>
            </MenubarPortal>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger class="menubar_triggerClass">
              Edit
            </MenubarTrigger>
            <MenubarPortal>
              <MenubarContent class="menu_contentClass" :side-offset="2">
                <MenubarItem class="menu_itemClass" disabled>
                  Undo
                </MenubarItem>
                <MenubarItem class="menu_itemClass">
                  Redo
                </MenubarItem>
                <MenubarSeparator class="menu_separatorClass" />
                <MenubarSub>
                  <MenubarSubTrigger class="menu_subTriggerClass">
                    Find <span>→</span>
                  </MenubarSubTrigger>
                  <MenubarPortal>
                    <MenubarSubContent class="menu_contentClass" :align-offset="-6">
                      <MenubarItem class="menu_itemClass">
                        Search the web…
                      </MenubarItem>
                      <MenubarSeparator class="menu_separatorClass" />
                      <MenubarItem class="menu_itemClass">
                        Find…
                      </MenubarItem>
                      <MenubarItem class="menu_itemClass">
                        Find Next
                      </MenubarItem>
                      <MenubarItem class="menu_itemClass">
                        Find Previous
                      </MenubarItem>
                      <MenubarSub>
                        <MenubarSubTrigger class="menu_subTriggerClass">
                          Advanced <span>→</span>
                        </MenubarSubTrigger>

                        <MenubarPortal>
                          <MenubarSubContent class="menu_contentClass" :align-offset="-6">
                            <MenubarItem class="menu_itemClass">
                              Regex
                            </MenubarItem>
                            <MenubarItem class="menu_itemClass">
                              Replace
                            </MenubarItem>
                          </MenubarSubContent>
                        </MenubarPortal>
                      </MenubarSub>
                    </MenubarSubContent>
                  </MenubarPortal>
                </MenubarSub>

                <MenubarSub>
                  <MenubarSubTrigger class="menu_subTriggerClass" disabled>
                    Speech <span>→</span>
                  </MenubarSubTrigger>
                  <MenubarPortal>
                    <MenubarSubContent class="menu_contentClass" :align-offset="-6">
                      <MenubarItem class="menu_itemClass">
                        Start Speaking
                      </MenubarItem>
                      <MenubarItem class="menu_itemClass">
                        Stop Speaking
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarPortal>
                </MenubarSub>

                <MenubarSub>
                  <MenubarSubTrigger class="menu_subTriggerClass">
                    Substitutions <span>→</span>
                  </MenubarSubTrigger>
                  <MenubarPortal>
                    <MenubarSubContent class="menu_contentClass" :align-offset="-6">
                      <MenubarItem class="menu_itemClass">
                        Smart Quotes
                      </MenubarItem>
                      <MenubarItem class="menu_itemClass">
                        Smart Dashes
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarPortal>
                </MenubarSub>
                <MenubarSeparator class="menu_separatorClass" />
                <MenubarItem class="menu_itemClass">
                  Cut
                </MenubarItem>
                <MenubarItem class="menu_itemClass">
                  Copy
                </MenubarItem>
                <MenubarItem class="menu_itemClass">
                  Paste
                </MenubarItem>
              </MenubarContent>
            </MenubarPortal>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger class="menubar_triggerClass">
              History
            </MenubarTrigger>
            <MenubarPortal>
              <MenubarContent class="menu_contentClass" :side-offset="2">
                <MenubarItem class="menu_itemClass">
                  Radix
                </MenubarItem>
                <MenubarItem class="menu_itemClass">
                  Github
                </MenubarItem>
                <MenubarItem class="menu_itemClass">
                  WorkOS
                </MenubarItem>
              </MenubarContent>
            </MenubarPortal>
          </MenubarMenu>
        </MenubarRoot>
      </div>
    </div>
  </div>
</template>
