<script setup lang="ts">
import { OkuContextMenu, OkuContextMenuArrow, OkuContextMenuContent, OkuContextMenuItem, OkuContextMenuPortal, OkuContextMenuSeparator, OkuContextMenuSub, OkuContextMenuSubContent, OkuContextMenuSubTrigger, OkuContextMenuTrigger } from '@oku-ui/context-menu'
</script>

<template>
  <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '110vh' }">
    <div :style="{ display: 'grid', gap: '50px' }">
      <div :style="{ display: 'inline-flex', alignItems: 'center', flexDirection: 'column' }">
        <h1>Modal (default)</h1>
        <OkuContextMenu>
          <OkuContextMenuTrigger class="context-menu-trigger" />
          <OkuContextMenuPortal>
            <OkuContextMenuContent class="context-menu-content" :align-offset="-5">
              <OkuContextMenuItem class="context-menu-item" @select="console.log('undo')">
                Undo
              </OkuContextMenuItem>
              <OkuContextMenuItem class="context-menu-item" @select="console.log('redo')">
                Redo
              </OkuContextMenuItem>
              <OkuContextMenuSeparator class="context-menu-separator" />
              <OkuContextMenuSub>
                <OkuContextMenuSubTrigger class="context-menu-sub-trigger context-menu-item">
                  Submenu →
                </OkuContextMenuSubTrigger>
                <OkuContextMenuPortal>
                  <OkuContextMenuSubContent class="context-menu-content" :side-offset="12" :align-offset="-6">
                    <OkuContextMenuItem class="context-menu-item" @select="console.log('one')">
                      One
                    </OkuContextMenuItem>
                    <OkuContextMenuItem class="context-menu-item" @select="console.log('two')">
                      Two
                    </OkuContextMenuItem>
                    <OkuContextMenuSeparator class="context-menu-separator" />
                    <OkuContextMenuSub>
                      <OkuContextMenuSubTrigger class="context-menu-sub-trigger context-menu-item">
                        Submenu →
                      </OkuContextMenuSubTrigger>
                      <OkuContextMenuPortal>
                        <OkuContextMenuSubContent class="context-menu-content" :side-offset="12" :align-offset="-6">
                          <OkuContextMenuItem class="context-menu-item" @select="console.log('one')">
                            One
                          </OkuContextMenuItem>
                          <OkuContextMenuItem class="context-menu-item" @select="console.log('two')">
                            Two
                          </OkuContextMenuItem>
                          <OkuContextMenuItem class="context-menu-item" @select="console.log('three')">
                            Three
                          </OkuContextMenuItem>
                          <OkuContextMenuArrow />
                        </OkuContextMenuSubContent>
                      </OkuContextMenuPortal>
                    </OkuContextMenuSub>
                    <OkuContextMenuSeparator class="context-menu-separator" />
                    <OkuContextMenuItem class="context-menu-item" @select="console.log('three')">
                      Three
                    </OkuContextMenuItem>
                    <OkuContextMenuArrow />
                  </OkuContextMenuSubContent>
                </OkuContextMenuPortal>
              </OkuContextMenuSub>
              <OkuContextMenuSeparator class="context-menu-separator" />
              <OkuContextMenuItem class="context-menu-item" disabled @select="console.log('cut')">
                Cut
              </OkuContextMenuItem>
              <OkuContextMenuItem class="context-menu-item" @select="console.log('copy')">
                Copy
              </OkuContextMenuItem>
              <OkuContextMenuItem class="context-menu-item" @select="console.log('paste')">
                Paste
              </OkuContextMenuItem>
            </OkuContextMenuContent>
          </OkuContextMenuPortal>
        </OkuContextMenu>
        <textarea
          :style="{ width: '500px', height: '100px', marginTop: '10px' }"
          defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet."
        />
      </div>
      <div :style="{ display: 'inline-flex', alignItems: 'center', flexDirection: 'column' }">
        <h1>Non modal</h1>
        <OkuContextMenu :modal="false">
          <OkuContextMenuTrigger class="context-menu-trigger" />
          <OkuContextMenuPortal>
            <OkuContextMenuContent class="context-menu-content" :align-offset="-5">
              <OkuContextMenuItem class="context-menu-item" @select="console.log('undo')">
                Undo
              </OkuContextMenuItem>
              <OkuContextMenuItem class="context-menu-item" @select="console.log('redo')">
                Redo
              </OkuContextMenuItem>
              <OkuContextMenuSeparator class="context-menu-separator" />
              <OkuContextMenuSub>
                <OkuContextMenuSubTrigger class="context-menu-sub-trigger context-menu-item">
                  Submenu →
                </OkuContextMenuSubTrigger>
                <OkuContextMenuPortal>
                  <OkuContextMenuSubContent class="context-menu-content" :side-offset="12" :align-offset="-6">
                    <OkuContextMenuItem class="context-menu-item" @select="console.log('one')">
                      One
                    </OkuContextMenuItem>
                    <OkuContextMenuItem class="context-menu-item" @select="console.log('two')">
                      Two
                    </OkuContextMenuItem>
                    <OkuContextMenuSeparator class="context-menu-separator" />
                    <OkuContextMenuSub>
                      <OkuContextMenuSubTrigger class="context-menu-sub-trigger context-menu-item">
                        Submenu →
                      </OkuContextMenuSubTrigger>
                      <OkuContextMenuPortal>
                        <OkuContextMenuSubContent class="context-menu-content" :side-offset="12" :align-offset="-6">
                          <OkuContextMenuItem class="context-menu-item" @select="console.log('one')">
                            One
                          </OkuContextMenuItem>
                          <OkuContextMenuItem class="context-menu-item" @select="console.log('two')">
                            Two
                          </OkuContextMenuItem>
                          <OkuContextMenuItem class="context-menu-item" @select="console.log('three')">
                            Three
                          </OkuContextMenuItem>
                          <OkuContextMenuArrow />
                        </OkuContextMenuSubContent>
                      </OkuContextMenuPortal>
                    </OkuContextMenuSub>
                    <OkuContextMenuSeparator class="context-menu-separator" />
                    <OkuContextMenuItem class="context-menu-item" @select="console.log('three')">
                      Three
                    </OkuContextMenuItem>
                    <OkuContextMenuArrow />
                  </OkuContextMenuSubContent>
                </OkuContextMenuPortal>
              </OkuContextMenuSub>
              <OkuContextMenuSeparator class="context-menu-separator" />
              <OkuContextMenuItem class="context-menu-item" disabled @select="console.log('cut')">
                Cut
              </OkuContextMenuItem>
              <OkuContextMenuItem class="context-menu-item" @select="console.log('copy')">
                Copy
              </OkuContextMenuItem>
              <OkuContextMenuItem class="context-menu-item" @select="console.log('paste')">
                Paste
              </OkuContextMenuItem>
            </OkuContextMenuContent>
          </OkuContextMenuPortal>
        </OkuContextMenu>
        <textarea
          :style="{ width: '500px', height: '100px', marginTop: '10px' }"
          defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet."
        />
      </div>
    </div>
  </div>
</template>
