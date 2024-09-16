<script setup lang="ts">
import { watchEffect } from 'vue'
import DropdownMenuSub from '../DropdownMenuSub.vue'
import { DropdownMenuArrow, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../index.ts'
import './style.css'
import '../../menu/stories/styles.css'

function log(v: string) {
  // eslint-disable-next-line no-console
  console.log(v)
}
</script>

<template>
  <div>
    <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '110vh' }">
      <div :style="{ display: 'grid', gap: '50px' }">
        <div :style="{ display: 'inline-flex', alignItems: 'center', flexDirection: 'column' }">
          <h1>Modal (default)</h1>
          <DropdownMenuRoot>
            <DropdownMenuTrigger class="dropdownMenu_triggerClass">
              Open
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent class="menu_contentClass" :side-offset="5">
                <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
                  Undo
                </DropdownMenuItem>
                <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
                  Redo
                </DropdownMenuItem>
                <DropdownMenuSeparator class="menu_separatorClass" />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger class="menu_subTriggerClass">
                    Submenu →
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent
                      class="menu_contentClass"
                      :side-offset="12"
                      :align-offset="-6"
                    >
                      <DropdownMenuItem
                        class="menu_itemClass"
                        @select="log('one')"
                      >
                        One
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        class="menu_itemClass"
                        @select="log('two')"
                      >
                        Two
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        class="menu_itemClass"
                        @select="log('three')"
                      >
                        Three
                      </DropdownMenuItem>
                      <DropdownMenuArrow />
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator class="menu_separatorClass" />
                <DropdownMenuItem
                  class="menu_itemClass"
                  disabled
                  @select="log('cut')"
                >
                  Cut
                </DropdownMenuItem>
                <DropdownMenuItem class="menu_itemClass" @select="log('copy')">
                  Copy
                </DropdownMenuItem>
                <DropdownMenuItem class="menu_itemClass" @select="log('paste')">
                  Paste
                </DropdownMenuItem>
                <DropdownMenuArrow />
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
          <textarea
            :style="{ width: '500px', height: '100px', marginTop: '10px' }"
            value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet."
          />
        </div>

        <div :style="{ display: 'inline-flex', alignItems: 'center', flexDirection: 'column' }">
          <h1>Non modal</h1>
          <DropdownMenuRoot :modal="false">
            <DropdownMenuTrigger class="dropdownMenu_triggerClass">
              Open
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent class="menu_contentClass" :side-offset="5">
                <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
                  Undo
                </DropdownMenuItem>
                <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
                  Redo
                </DropdownMenuItem>
                <DropdownMenuSeparator class="menu_separatorClass" />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger class="menu_subTriggerClass">
                    Submenu →
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent
                      class="menu_contentClass"
                      :side-offset="12"
                      :align-offset="-6"
                    >
                      <DropdownMenuItem
                        class="menu_itemClass"
                        @select="log('one')"
                      >
                        One
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        class="menu_itemClass"
                        @select="log('two')"
                      >
                        Two
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        class="menu_itemClass"
                        @select="log('three')"
                      >
                        Three
                      </DropdownMenuItem>
                      <DropdownMenuArrow />
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator class="menu_separatorClass" />
                <DropdownMenuItem
                  class="menu_itemClass"
                  disabled
                  @select="log('cut')"
                >
                  Cut
                </DropdownMenuItem>
                <DropdownMenuItem class="menu_itemClass" @select="log('copy')">
                  Copy
                </DropdownMenuItem>
                <DropdownMenuItem class="menu_itemClass" @select="log('paste')">
                  Paste
                </DropdownMenuItem>
                <DropdownMenuArrow />
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
          <textarea
            :style="{ width: '500px', height: '100px', marginTop: '10px' }"
            value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet."
          />
        </div>
      </div>
    </div>
  </div>
</template>
