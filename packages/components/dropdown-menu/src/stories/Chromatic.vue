<script setup lang="ts">
import { reactive, ref } from 'vue'
import { OkuDropdownMenu, OkuDropdownMenuArrow, OkuDropdownMenuCheckboxItem, OkuDropdownMenuContent, OkuDropdownMenuGroup, OkuDropdownMenuItem, OkuDropdownMenuItemIndicator, OkuDropdownMenuLabel, OkuDropdownMenuPortal, OkuDropdownMenuRadioGroup, OkuDropdownMenuRadioItem, OkuDropdownMenuSeparator, OkuDropdownMenuSub, OkuDropdownMenuSubContent, OkuDropdownMenuSubTrigger, OkuDropdownMenuTrigger } from '@oku-ui/dropdown-menu'
import { OkuDialog, OkuDialogContent, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
import { ALIGN_OPTIONS, SIDE_OPTIONS } from '@oku-ui/popper'
import { foodGroups } from './foods'
import TickIcon from './TickIcon.vue'

// change order slightly for more pleasing visual
const SIDES = SIDE_OPTIONS.filter(side => side !== 'bottom').concat(['bottom'])

const checkboxItems = reactive([
  { label: 'Bold', state: false },
  { label: 'Italic', state: true },
  { label: 'Underline', state: false },
  { label: 'Strikethrough', state: false, disabled: true },
])
const files = ['README.md', 'index.js', 'page.css']
const file = ref(files[1])
</script>

<template>
  <div :style="{ padding: '200px', paddingBottom: '800px' }">
    <h1>Uncontrolled</h1>
    <h2>Closed</h2>
    <OkuDropdownMenu :modal="false">
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5" :avoid-collisions="false">
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
            Undo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
            Redo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
          <OkuDropdownMenuItem class="dropdown-menu-item" disabled @select="console.log('cut')">
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

    <h2>Open</h2>
    <OkuDropdownMenu default-open :modal="false">
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent
          class="dropdown-menu-content"
          :side-offset="5"
          :avoid-collisions="false"
          @focus-outside="(event) => event.preventDefault()"
        >
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
            Undo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
            Redo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
          <OkuDropdownMenuItem class="dropdown-menu-item" disabled @select="console.log('cut')">
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

    <h2 :style="{ marginTop: '180px' }">
      Open with reordered parts
    </h2>
    <OkuDropdownMenu default-open :modal="false">
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent
          class="dropdown-menu-content"
          :side-offset="5"
          :avoid-collisions="false"
          @focus-outside="(event) => event.preventDefault()"
        >
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
            Undo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
            Redo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
          <OkuDropdownMenuItem class="dropdown-menu-item" disabled @select="console.log('cut')">
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
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
    </OkuDropdownMenu>

    <h1 :style="{ marginTop: '200px' }">
      Controlled
    </h1>
    <h2>Closed</h2>
    <OkuDropdownMenu :open="false" :modal="false">
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5" :avoid-collisions="false">
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
            Undo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
            Redo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
          <OkuDropdownMenuItem class="dropdown-menu-item" disabled @select="console.log('cut')">
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

    <h2>Open</h2>
    <OkuDropdownMenu open :modal="false">
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5" :avoid-collisions="false">
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
            Undo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
            Redo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
          <OkuDropdownMenuItem class="dropdown-menu-item" disabled @select="console.log('cut')">
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

    <h2 :style="{ marginTop: '180px' }">
      Open with reordered parts
    </h2>
    <OkuDropdownMenu open :modal="false">
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5" :avoid-collisions="false">
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
            Undo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
            Redo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
          <OkuDropdownMenuItem class="dropdown-menu-item" disabled @select="console.log('cut')">
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
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
    </OkuDropdownMenu>

    <h1 :style="{ marginTop: '200px' }">
      Submenus
    </h1>
    <h2>Open</h2>
    <OkuDropdownMenu open :modal="false">
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5" :avoid-collisions="false">
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
            Undo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
            Redo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
          <OkuDropdownMenuSub open>
            <OkuDropdownMenuSubTrigger class="dropdown-menu-sub-trigger dropdown-menu-item">
              Submenu →
            </OkuDropdownMenuSubTrigger>
            <OkuDropdownMenuPortal>
              <OkuDropdownMenuSubContent
                class="dropdown-menu-content"
                :side-offset="12"
                :align-offset="-6"
                :avoid-collisions="false"
              >
                <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('one')">
                  One
                </OkuDropdownMenuItem>

                <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('two')">
                  Two
                </OkuDropdownMenuItem>
                <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
                <OkuDropdownMenuSub open>
                  <OkuDropdownMenuSubTrigger class="dropdown-menu-sub-trigger dropdown-menu-item">
                    Submenu →
                  </OkuDropdownMenuSubTrigger>
                  <OkuDropdownMenuPortal>
                    <OkuDropdownMenuSubContent
                      class="dropdown-menu-content"
                      :side-offset="12"
                      :align-offset="-6"
                      :avoid-collisions="false"
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
                <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('three')">
                  Three
                </OkuDropdownMenuItem>
                <OkuDropdownMenuArrow />
              </OkuDropdownMenuSubContent>
            </OkuDropdownMenuPortal>
          </OkuDropdownMenuSub>
          <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
          <OkuDropdownMenuItem class="dropdown-menu-item" disabled @select="console.log('cut')">
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
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
    </OkuDropdownMenu>

    <h2 :style="{ marginTop: '275px' }">
      RTL
    </h2>
    <div dir="rtl">
      <OkuDropdownMenu open dir="rtl" :modal="false">
        <OkuDropdownMenuPortal>
          <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5" :avoid-collisions="false">
            <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
              Undo
            </OkuDropdownMenuItem>
            <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
              Redo
            </OkuDropdownMenuItem>
            <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
            <OkuDropdownMenuSub open>
              <OkuDropdownMenuSubTrigger class="dropdown-menu-sub-trigger dropdown-menu-item">
                Submenu →
              </OkuDropdownMenuSubTrigger>
              <OkuDropdownMenuPortal>
                <OkuDropdownMenuSubContent
                  class="dropdown-menu-content"
                  :side-offset="12"
                  :align-offset="-6"
                  :avoid-collisions="false"
                >
                  <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('one')">
                    One
                  </OkuDropdownMenuItem>

                  <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('two')">
                    Two
                  </OkuDropdownMenuItem>
                  <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
                  <OkuDropdownMenuSub open>
                    <OkuDropdownMenuSubTrigger class="dropdown-menu-sub-trigger dropdown-menu-item">
                      Submenu →
                    </OkuDropdownMenuSubTrigger>
                    <OkuDropdownMenuPortal>
                      <OkuDropdownMenuSubContent
                        class="dropdown-menu-content"
                        :side-offset="12"
                        :align-offset="-6"
                        :avoid-collisions="false"
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
        <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
          Open
        </OkuDropdownMenuTrigger>
      </OkuDropdownMenu>
    </div>

    <h1 :style="{ marginTop: '275px' }">
      Positioning
    </h1>
    <h2>No collisions</h2>
    <h3>Side & Align</h3>
    <div class="dropdown-menu-grid">
      <template v-for="side in SIDES">
        <OkuDropdownMenu v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open :modal="false">
          <OkuDropdownMenuTrigger class="dropdown-menu-chromatic-trigger" />
          <OkuDropdownMenuPortal>
            <OkuDropdownMenuContent
              class="dropdown-menu-chromatic-content"
              :side="side"
              :align="align"
              :avoid-collisions="false"
            >
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <OkuDropdownMenuArrow class="dropdown-menu-chromatic-arrow" :width="20" :height="10" />
            </OkuDropdownMenuContent>
          </OkuDropdownMenuPortal>
        </OkuDropdownMenu>
      </template>
    </div>

    <h3>Side offset</h3>
    <h4>Positive</h4>
    <div class="dropdown-menu-grid">
      <template v-for="side in SIDES">
        <OkuDropdownMenu v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open :modal="false">
          <OkuDropdownMenuTrigger class="dropdown-menu-chromatic-trigger" />
          <OkuDropdownMenuPortal>
            <OkuDropdownMenuContent
              class="dropdown-menu-chromatic-content"
              :side="side"
              :side-offset="5"
              :align="align"
              :avoid-collisions="false"
            >
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <OkuDropdownMenuArrow class="dropdown-menu-chromatic-arrow" :width="20" :height="10" />
            </OkuDropdownMenuContent>
          </OkuDropdownMenuPortal>
        </OkuDropdownMenu>
      </template>
    </div>
    <h4>Negative</h4>
    <div class="dropdown-menu-grid">
      <template v-for="side in SIDES">
        <OkuDropdownMenu v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open :modal="false">
          <OkuDropdownMenuTrigger class="dropdown-menu-chromatic-trigger" />
          <OkuDropdownMenuPortal>
            <OkuDropdownMenuContent
              class="dropdown-menu-chromatic-content"
              :side="side"
              :side-offset="-10"
              :align="align"
              :avoid-collisions="false"
            >
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <OkuDropdownMenuArrow class="dropdown-menu-chromatic-arrow" :width="20" :height="10" />
            </OkuDropdownMenuContent>
          </OkuDropdownMenuPortal>
        </OkuDropdownMenu>
      </template>
    </div>

    <h3>Align offset</h3>
    <h4>Positive</h4>
    <div class="dropdown-menu-grid">
      <template v-for="side in SIDES">
        <OkuDropdownMenu v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open :modal="false">
          <OkuDropdownMenuTrigger class="dropdown-menu-chromatic-trigger" />
          <OkuDropdownMenuPortal>
            <OkuDropdownMenuContent
              class="dropdown-menu-chromatic-content"
              :side="side"
              :align="align"
              :align-offset="20"
              :avoid-collisions="false"
            >
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <OkuDropdownMenuArrow class="dropdown-menu-chromatic-arrow" :width="20" :height="10" />
            </OkuDropdownMenuContent>
          </OkuDropdownMenuPortal>
        </OkuDropdownMenu>
      </template>
    </div>
    <h4>Negative</h4>
    <div class="dropdown-menu-grid">
      <template v-for="side in SIDES">
        <OkuDropdownMenu v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open :modal="false">
          <OkuDropdownMenuTrigger class="dropdown-menu-chromatic-trigger" />
          <OkuDropdownMenuPortal>
            <OkuDropdownMenuContent
              class="dropdown-menu-chromatic-content"
              :side="side"
              :align="align"
              :align-offset="-10"
              :avoid-collisions="false"
            >
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <OkuDropdownMenuArrow class="dropdown-menu-chromatic-arrow" :width="20" :height="10" />
            </OkuDropdownMenuContent>
          </OkuDropdownMenuPortal>
        </OkuDropdownMenu>
      </template>
    </div>

    <h2>Collisions</h2>
    <p>See instances on the periphery of the page.</p>
    <template v-for="side in SIDES">
      <OkuDropdownMenu v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open :modal="false">
        <OkuDropdownMenuTrigger
          class="dropdown-menu-chromatic-trigger"
          :style="{
            position: 'absolute',
            [side]: '10px',
            ...((side === 'right' || side === 'left')
              && (align === 'start'
                ? { bottom: '10px' }
                : align === 'center'
                  ? { top: 'calc(50% - 15px)' }
                  : { top: '10px' })),
            ...((side === 'top' || side === 'bottom')
              && (align === 'start'
                ? { right: '10px' }
                : align === 'center'
                  ? { left: 'calc(50% - 15px)' }
                  : { left: '10px' })),
          }"
        />
        <OkuDropdownMenuPortal>
          <OkuDropdownMenuContent class="dropdown-menu-chromatic-content" :side="side" :align="align">
            <p :style="{ textAlign: 'center' }">
              {{ side }}
              <br>
              {{ align }}
            </p>
            <OkuDropdownMenuArrow class="dropdown-menu-chromatic-arrow" :width="20" :height="10" />
          </OkuDropdownMenuContent>
        </OkuDropdownMenuPortal>
      </OkuDropdownMenu>
    </template>

    <h2>Relative parent (non-portalled)</h2>
    <div :style="{ position: 'relative' }">
      <OkuDropdownMenu open :modal="false">
        <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
          Open
        </OkuDropdownMenuTrigger>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5" :avoid-collisions="false">
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
            Undo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
            Redo
          </OkuDropdownMenuItem>
          <OkuDropdownMenuArrow />
        </OkuDropdownMenuContent>
      </OkuDropdownMenu>
    </div>

    <h1 :style="{ marginTop: '100px' }">
      With labels
    </h1>
    <OkuDropdownMenu open :modal="false">
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5" :avoid-collisions="false">
          <OkuDropdownMenuGroup v-for="(foodGroup, index) in foodGroups" :key="index">
            <OkuDropdownMenuLabel v-if="foodGroup.label" :key="foodGroup.label" class="dropdown-menu-label">
              {{ foodGroup.label }}
            </OkuDropdownMenuLabel>
            <OkuDropdownMenuItem
              v-for="food in foodGroup.foods"
              :key="food.value"
              class="dropdown-menu-item"
              :disabled="food.disabled"
              @select="console.log(food.label)"
            >
              {{ food.label }}
            </OkuDropdownMenuItem>

            <OkuDropdownMenuSeparator v-if="index < foodGroups.length - 1" class="dropdown-menu-separator" />
          </OkuDropdownMenuGroup>
          <OkuDropdownMenuArrow />
        </OkuDropdownMenuContent>
      </OkuDropdownMenuPortal>
    </OkuDropdownMenu>

    <h1 :style="{ marginTop: '600px' }">
      With checkbox and radio items
    </h1>
    <OkuDropdownMenu open :modal="false">
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5" :avoid-collisions="false">
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('show')">
            Show fonts
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('bigger')">
            Bigger
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('smaller')">
            Smaller
          </OkuDropdownMenuItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
          <OkuDropdownMenuCheckboxItem
            v-for="({ label, state, disabled }, index) in checkboxItems"
            :key="label"
            class="dropdown-menu-item"
            :checked="state"
            :disabled="disabled"
            @checked-change="checkboxItems[index].state = !state"
          >
            {{ label }}
            <OkuDropdownMenuItemIndicator>
              <TickIcon />
            </OkuDropdownMenuItemIndicator>
          </OkuDropdownMenuCheckboxItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
          <OkuDropdownMenuRadioGroup :value="file" @value-change="(value: string) => file = value">
            <OkuDropdownMenuRadioItem v-for="_file in files" :key="_file" class="dropdown-menu-item" :value="_file">
              {{ _file }}
              <OkuDropdownMenuItemIndicator>
                <TickIcon />
              </OkuDropdownMenuItemIndicator>
            </OkuDropdownMenuRadioItem>
          </OkuDropdownMenuRadioGroup>
          <OkuDropdownMenuArrow />
        </OkuDropdownMenuContent>
      </OkuDropdownMenuPortal>
    </OkuDropdownMenu>

    <h1 :style="{ marginTop: '500px' }">
      Nested composition
    </h1>

    <OkuDropdownMenu open :modal="false">
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>

      <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5" :avoid-collisions="false">
        <OkuDialog open :modal="false">
          <OkuDialogTrigger class="dropdown-menu-item" as-child>
            <OkuDropdownMenuItem @select="(event) => event.preventDefault()">
              Open dialog
            </OkuDropdownMenuItem>
          </OkuDialogTrigger>

          <OkuDialogContent
            :style="{
              position: 'absolute',
              top: '0px',
              left: '150px',
              width: '300px',
              padding: '20px',
              backgroundColor: 'whitesmoke',
              border: '1px solid black',
            }"
          >
            <OkuDialogTitle :style="{ marginTop: '0px' }">
              Dropdown in nested dialog
            </OkuDialogTitle>
            <OkuDropdownMenu open :modal="false">
              <OkuDropdownMenuTrigger class="dropdown-menu-trigger" :style="{ width: '100%' }">
                Open
              </OkuDropdownMenuTrigger>
              <OkuDropdownMenuPortal>
                <OkuDropdownMenuContent
                  class="dropdown-menu-content"
                  :side-offset="5"
                  :avoid-collisions="false"
                >
                  <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('undo')">
                    Undo
                  </OkuDropdownMenuItem>
                  <OkuDropdownMenuItem class="dropdown-menu-item" @select="console.log('redo')">
                    Redo
                  </OkuDropdownMenuItem>
                  <OkuDropdownMenuArrow />
                </OkuDropdownMenuContent>
              </OkuDropdownMenuPortal>
            </OkuDropdownMenu>
          </OkuDialogContent>
        </OkuDialog>
        <OkuDropdownMenuItem class="dropdown-menu-item">
          Test
        </OkuDropdownMenuItem>
        <OkuDropdownMenuArrow />
      </OkuDropdownMenuContent>
    </OkuDropdownMenu>

    <h1 :style="{ marginTop: '500px' }">
      State attributes
    </h1>
    <h2>Closed</h2>
    <OkuDropdownMenu :open="false" :modal="false">
      <OkuDropdownMenuTrigger class="dropdown-menu-attr-styles">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent
          class="dropdown-menu-attr-styles"
          :side-offset="5"
          :avoid-collisions="false"
        />
      </OkuDropdownMenuPortal>
    </OkuDropdownMenu>

    <h2>Open</h2>
    <OkuDropdownMenu open :modal="false">
      <OkuDropdownMenuTrigger class="dropdown-menu-attr-styles">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent
          class="dropdown-menu-attr-styles"
          :side-offset="5"
          :avoid-collisions="false"
        >
          <OkuDropdownMenuItem class="dropdown-menu-attr-styles" @select="console.log('show')">
            Show fonts
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-attr-styles" @select="console.log('bigger')">
            Bigger
          </OkuDropdownMenuItem>
          <OkuDropdownMenuItem class="dropdown-menu-attr-styles" @select="console.log('smaller')">
            Smaller
          </OkuDropdownMenuItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-attr-styles" />
          <OkuDropdownMenuCheckboxItem
            v-for="({ label, state, disabled }, index) in checkboxItems"
            :key="label"
            class="dropdown-menu-attr-styles"
            :checked="state"
            :disabled="disabled"
            @checked-change="checkboxItems[index].state = !state"
          >
            {{ label }}
            <OkuDropdownMenuItemIndicator class="dropdown-menu-attr-styles">
              <TickIcon />
            </OkuDropdownMenuItemIndicator>
          </OkuDropdownMenuCheckboxItem>
          <OkuDropdownMenuSeparator class="dropdown-menu-attr-styles" />
          <OkuDropdownMenuRadioGroup
            class="dropdown-menu-attr-styles"
            :value="file"
            @value-change="(value: string) => file = value"
          >
            <OkuDropdownMenuRadioItem v-for="_file in files" :key="_file" class="dropdown-menu-attr-styles" :value="_file">
              {{ _file }}
              <OkuDropdownMenuItemIndicator class="dropdown-menu-attr-styles">
                <TickIcon />
              </OkuDropdownMenuItemIndicator>
            </OkuDropdownMenuRadioItem>
          </OkuDropdownMenuRadioGroup>
          <OkuDropdownMenuArrow class="dropdown-menu-attr-styles" />
        </OkuDropdownMenuContent>
      </OkuDropdownMenuPortal>
    </OkuDropdownMenu>
  </div>
</template>
