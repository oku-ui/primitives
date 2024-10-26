<script setup lang="ts">
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

function log(v: string) {
  // eslint-disable-next-line no-console
  console.log(v)
}
</script>

<template>
  <div>
    <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '110vh' }">
      <div :style="{ display: 'grid', gap: 50 }">
        <div :style="{ display: 'inline-flex', alignItems: 'center', flexDirection: 'column' }">
          <h1>Modal (default)</h1>
          <ContextMenuRoot>
            <ContextMenuTrigger class="contextMenu_triggerClass" />
            <ContextMenuPortal>
              <ContextMenuContent class="menu_contentClass" :align-offset="-5">
                <ContextMenuItem class="menu_itemClass" @select="log('undo')">
                  Undo
                </ContextMenuItem>
                <ContextMenuItem class="menu_itemClass" @select="log('redo')">
                  Redo
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
                      <ContextMenuItem class="menu_itemClass" @select="log('one')">
                        One
                      </ContextMenuItem>
                      <ContextMenuItem class="menu_itemClass" @select="log('two')">
                        Two
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
                              @select="log('one')"
                            >
                              One
                            </ContextMenuItem>
                            <ContextMenuItem
                              class="menu_itemClass"
                              @select="log('two')"
                            >
                              Two
                            </ContextMenuItem>
                            <ContextMenuItem
                              class="menu_itemClass"
                              @select="log('three')"
                            >
                              Three
                            </ContextMenuItem>
                            <ContextMenuArrow />
                          </ContextMenuSubContent>
                        </ContextMenuPortal>
                      </ContextMenuSub>
                      <ContextMenuSeparator class="menu_separatorClass" />
                      <ContextMenuItem class="menu_itemClass" @select="log('three')">
                        Three
                      </ContextMenuItem>
                      <ContextMenuArrow />
                    </ContextMenuSubContent>
                  </ContextMenuPortal>
                </ContextMenuSub>
                <ContextMenuSeparator class="menu_separatorClass" />
                <ContextMenuItem
                  class="menu_itemClass"
                  disabled
                  @select="log('cut')"
                >
                  Cut
                </ContextMenuItem>
                <ContextMenuItem class="menu_itemClass" @select="log('copy')">
                  Copy
                </ContextMenuItem>
                <ContextMenuItem class="menu_itemClass" @select="log('paste')">
                  Paste
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenuPortal>
          </ContextMenuRoot>
          <textarea
            :style="{ width: '500px', height: '100px', marginTop: '10px' }"
            value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet."
          />
        </div>
        <div :style="{ display: 'inline-flex', alignItems: 'center', flexDirection: 'column' }">
          <h1>Non modal</h1>
          <ContextMenuRoot :modal="false">
            <ContextMenuTrigger class="contextMenu_triggerClass" />
            <ContextMenuPortal>
              <ContextMenuContent class="menu_contentClass" :align-offset="-5">
                <ContextMenuItem class="menu_itemClass" @select="log('undo')">
                  Undo
                </ContextMenuItem>
                <ContextMenuItem class="menu_itemClass" @select="log('redo')">
                  Redo
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
                      <ContextMenuItem class="menu_itemClass" @select="log('one')">
                        One
                      </ContextMenuItem>
                      <ContextMenuItem class="menu_itemClass" @select="log('two')">
                        Two
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
                              @select="log('one')"
                            >
                              One
                            </ContextMenuItem>
                            <ContextMenuItem
                              class="menu_itemClass"
                              @select="log('two')"
                            >
                              Two
                            </ContextMenuItem>
                            <ContextMenuItem
                              class="menu_itemClass"
                              @select="log('three')"
                            >
                              Three
                            </ContextMenuItem>
                            <ContextMenuArrow />
                          </ContextMenuSubContent>
                        </ContextMenuPortal>
                      </ContextMenuSub>
                      <ContextMenuSeparator class="menu_separatorClass" />
                      <ContextMenuItem class="menu_itemClass" @select="log('three')">
                        Three
                      </ContextMenuItem>
                      <ContextMenuArrow />
                    </ContextMenuSubContent>
                  </ContextMenuPortal>
                </ContextMenuSub>
                <ContextMenuSeparator class="menu_separatorClass" />
                <ContextMenuItem
                  class="menu_itemClass"
                  disabled
                  @select="log('cut')"
                >
                  Cut
                </ContextMenuItem>
                <ContextMenuItem class="menu_itemClass" @select="log('copy')">
                  Copy
                </ContextMenuItem>
                <ContextMenuItem class="menu_itemClass" @select="log('paste')">
                  Paste
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenuPortal>
          </ContextMenuRoot>
          <textarea
            :style="{ width: '500px', height: '100px', marginTop: '10px' }"
            value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet."
          />
        </div>
      </div>
    </div>
  </div>
</template>
