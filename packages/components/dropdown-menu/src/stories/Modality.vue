<script setup lang="ts">
import { OkuDropdownMenu, OkuDropdownMenuArrow, OkuDropdownMenuContent, OkuDropdownMenuItem, OkuDropdownMenuPortal, OkuDropdownMenuSeparator, OkuDropdownMenuSub, OkuDropdownMenuSubContent, OkuDropdownMenuSubTrigger, OkuDropdownMenuTrigger } from '@oku-ui/dropdown-menu'
</script>

<template>
  <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '110vh' }">
    <div :style="{ display: 'grid', gap: '50px' }">
      <div :style="{ display: 'inline-flex', alignItems: 'center', flexDirection: 'column' }">
        <h1>Modal (default)</h1>
        <OkuDropdownMenu>
          <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
            Open
          </OkuDropdownMenuTrigger>
          <OkuDropdownMenuPortal>
            <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5">
              <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
                Undo
              </OkuDropdownMenuItem>
              <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
                Redo
              </OkuDropdownMenuItem>
              <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
              <OkuDropdownMenuSub>
                <OkuDropdownMenuSubTrigger class="dropdown-menu-sub-trigger dropdown-menu-item">
                  Submenu →
                </OkuDropdownMenuSubTrigger>
                <OkuDropdownMenuPortal>
                  <OkuDropdownMenuSubContent
                    class="dropdown-menu-content"
                    :side-offset="12"
                    :align-offset="-6"
                  >
                    <OkuDropdownMenuItem
                      class="dropdown-menu-item"
                      @select="console.log('one')"
                    >
                      One
                    </OkuDropdownMenuItem>
                    <OkuDropdownMenuItem
                      class="dropdown-menu-item"
                      @select="console.log('two')"
                    >
                      Two
                    </OkuDropdownMenuItem>
                    <OkuDropdownMenuItem
                      class="dropdown-menu-item"
                      @select="console.log('three')"
                    >
                      Three
                    </OkuDropdownMenuItem>
                    <OkuDropdownMenuArrow />
                  </OkuDropdownMenuSubContent>
                </OkuDropdownMenuPortal>
              </OkuDropdownMenuSub>
              <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
              <OkuDropdownMenuItem
                class="dropdown-menu-item"
                disabled
                @select="console.log('cut')"
              >
                Cut
              </OkuDropdownMenuItem>
              <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('copy')">
                Copy
              </OkuDropdownMenuItem>
              <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('paste')">
                Paste
              </OkuDropdownMenuItem>
              <OkuDropdownMenuArrow />
            </OkuDropdownMenuContent>
          </OkuDropdownMenuPortal>
        </OkuDropdownMenu>
        <textarea
          :style="{ width: '500px', height: '100px', marginTop: '10px' }"
          defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet."
        />
      </div>
      <div :style="{ display: 'inline-flex', alignItems: 'center', flexDirection: 'column' }">
        <h1>Non modal</h1>
        <OkuDropdownMenu :modal="false">
          <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
            Open
          </OkuDropdownMenuTrigger>
          <OkuDropdownMenuPortal>
            <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5">
              <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
                Undo
              </OkuDropdownMenuItem>
              <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
                Redo
              </OkuDropdownMenuItem>
              <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
              <OkuDropdownMenuSub>
                <OkuDropdownMenuSubTrigger class="dropdown-menu-sub-trigger dropdown-menu-item">
                  Submenu →
                </OkuDropdownMenuSubTrigger>
                <OkuDropdownMenuPortal>
                  <OkuDropdownMenuSubContent
                    class="dropdown-menu-content"
                    :side-offset="12"
                    :align-offset="-6"
                  >
                    <OkuDropdownMenuItem
                      class="dropdown-menu-item"
                      @select="console.log('one')"
                    >
                      One
                    </OkuDropdownMenuItem>
                    <OkuDropdownMenuItem
                      class="dropdown-menu-item"
                      @select="console.log('two')"
                    >
                      Two
                    </OkuDropdownMenuItem>
                    <OkuDropdownMenuItem
                      class="dropdown-menu-item"
                      @select="console.log('three')"
                    >
                      Three
                    </OkuDropdownMenuItem>
                    <OkuDropdownMenuArrow />
                  </OkuDropdownMenuSubContent>
                </OkuDropdownMenuPortal>
              </OkuDropdownMenuSub>
              <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
              <OkuDropdownMenuItem
                class="dropdown-menu-item"
                disabled
                @select="console.log('cut')"
              >
                Cut
              </OkuDropdownMenuItem>
              <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('copy')">
                Copy
              </OkuDropdownMenuItem>
              <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('paste')">
                Paste
              </OkuDropdownMenuItem>
              <OkuDropdownMenuArrow />
            </OkuDropdownMenuContent>
          </OkuDropdownMenuPortal>
        </OkuDropdownMenu>
        <textarea
          :style="{ width: '500px', height: '100px', marginTop: '10px' }"
          defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet."
        />
      </div>
    </div>
  </div>
</template>
