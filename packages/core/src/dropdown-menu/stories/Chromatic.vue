<script setup lang="ts">
import { shallowRef } from 'vue'
import { DialogContent, DialogRoot, DialogTitle, DialogTrigger } from '../../dialog/index.ts'
import { foodGroups } from '../../menu/stories/foods.ts'
import TickIcon from '../../menu/stories/TickIcon.vue'
import { DropdownMenuArrow, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuItemIndicator, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../index.ts'
import './style.css'
import '../../menu/stories/styles.css'

const checkboxItems = [
  { label: 'Bold', state: shallowRef(false) },
  { label: 'Italic', state: shallowRef(true) },
  { label: 'Underline', state: shallowRef(false) },
  { label: 'Strikethrough', state: shallowRef(false), disabled: true },
]
const files = ['README.md', 'index.js', 'page.css']
const file = shallowRef(files[1])

function setFile(v: string) {
  file.value = v
}

function log(v: string) {
  // eslint-disable-next-line no-console
  console.log(v)
}

const SIDE_OPTIONS = ['top', 'right', 'bottom', 'left']
const ALIGN_OPTIONS = ['start', 'center', 'end']

// change order slightly for more pleasing visual
const SIDES = SIDE_OPTIONS.filter(side => side !== 'bottom').concat(['bottom'])
</script>

<template>
  <div>
    <div :style="{ padding: '200px', paddingBottom: '800px' }">
      <h1>Uncontrolled</h1>
      <h2>Closed</h2>
      <DropdownMenuRoot :modal="false">
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5" :avoid-collisions="false">
            <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
              Undo
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
              Redo
            </DropdownMenuItem>
            <DropdownMenuSeparator class="menu_separatorClass" />
            <DropdownMenuItem class="menu_itemClass" disabled @select="log('cut')">
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

      <h2>Open</h2>
      <DropdownMenuRoot default-open :modal="false">
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            class="menu_contentClass"
            :side-offset="5"
            :avoid-collisions="false"
            @focus-outside="(event: Event) => event.preventDefault()"
          >
            <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
              Undo
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
              Redo
            </DropdownMenuItem>
            <DropdownMenuSeparator class="menu_separatorClass" />
            <DropdownMenuItem class="menu_itemClass" disabled @select="log('cut')">
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

      <h2 :style="{ marginTop: '180px' }">
        Open with reordered parts
      </h2>
      <DropdownMenuRoot default-open :modal="false">
        <DropdownMenuPortal>
          <DropdownMenuContent
            class="menu_contentClass"
            :side-offset="5"
            :avoid-collisions="false"
            @focus-outside="(event: Event) => event.preventDefault()"
          >
            <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
              Undo
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
              Redo
            </DropdownMenuItem>
            <DropdownMenuSeparator class="menu_separatorClass" />
            <DropdownMenuItem class="menu_itemClass" disabled @select="log('cut')">
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
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
      </DropdownMenuRoot>

      <h1 :style="{ marginTop: '200px' }">
        Controlled
      </h1>
      <h2>Closed</h2>
      <DropdownMenuRoot :open="false" :modal="false">
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5" :avoid-collisions="false">
            <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
              Undo
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
              Redo
            </DropdownMenuItem>
            <DropdownMenuSeparator class="menu_separatorClass" />
            <DropdownMenuItem class="menu_itemClass" disabled @select="log('cut')">
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

      <h2>Open</h2>
      <DropdownMenuRoot open :modal="false">
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5" :avoid-collisions="false">
            <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
              Undo
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
              Redo
            </DropdownMenuItem>
            <DropdownMenuSeparator class="menu_separatorClass" />
            <DropdownMenuItem class="menu_itemClass" disabled @select="log('cut')">
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

      <h2 :style="{ marginTop: '180px' }">
        Open with reordered parts
      </h2>
      <DropdownMenuRoot open :modal="false">
        <DropdownMenuPortal>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5" :avoid-collisions="false">
            <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
              Undo
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
              Redo
            </DropdownMenuItem>
            <DropdownMenuSeparator class="menu_separatorClass" />
            <DropdownMenuItem class="menu_itemClass" disabled @select="log('cut')">
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
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
      </DropdownMenuRoot>

      <h1 :style="{ marginTop: '200px' }">
        Submenus
      </h1>
      <h2>Open</h2>
      <DropdownMenuRoot open :modal="false">
        <DropdownMenuPortal>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5" :avoid-collisions="false">
            <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
              Undo
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
              Redo
            </DropdownMenuItem>
            <DropdownMenuSeparator class="menu_separatorClass" />
            <DropdownMenuSub open>
              <DropdownMenuSubTrigger class="menu_subTriggerClass">
                Submenu →
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent
                  class="menu_contentClass"
                  :side-offset="12"
                  :align-offset="-6"
                  :avoid-collisions="false"
                >
                  <DropdownMenuItem class="menu_itemClass" @select="log('one')">
                    One
                  </DropdownMenuItem>

                  <DropdownMenuItem class="menu_itemClass" @select="log('two')">
                    Two
                  </DropdownMenuItem>
                  <DropdownMenuSeparator class="menu_separatorClass" />
                  <DropdownMenuSub open>
                    <DropdownMenuSubTrigger class="menu_subTriggerClass">
                      Submenu →
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent
                        class="menu_contentClass"
                        :side-offset="12"
                        :align-offset="-6"
                        :avoid-collisions="false"
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
                  <DropdownMenuItem class="menu_itemClass" @select="log('three')">
                    Three
                  </DropdownMenuItem>
                  <DropdownMenuArrow />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator class="menu_separatorClass" />
            <DropdownMenuItem class="menu_itemClass" disabled @select="log('cut')">
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
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
      </DropdownMenuRoot>

      <h2 :style="{ marginTop: '275px' }">
        RTL
      </h2>
      <div dir="rtl">
        <DropdownMenuRoot open dir="rtl" :modal="false">
          <DropdownMenuPortal>
            <DropdownMenuContent class="menu_contentClass" :side-offset="5" :avoid-collisions="false">
              <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
                Undo
              </DropdownMenuItem>
              <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
                Redo
              </DropdownMenuItem>
              <DropdownMenuSeparator class="menu_separatorClass" />
              <DropdownMenuSub open>
                <DropdownMenuSubTrigger class="menu_subTriggerClass">
                  Submenu →
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    class="menu_contentClass"
                    :side-offset="12"
                    :align-offset="-6"
                    :avoid-collisions="false"
                  >
                    <DropdownMenuItem class="menu_itemClass" @select="log('one')">
                      One
                    </DropdownMenuItem>

                    <DropdownMenuItem class="menu_itemClass" @select="log('two')">
                      Two
                    </DropdownMenuItem>
                    <DropdownMenuSeparator class="menu_separatorClass" />
                    <DropdownMenuSub open>
                      <DropdownMenuSubTrigger class="menu_subTriggerClass">
                        Submenu →
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent
                          class="menu_contentClass"
                          :side-offset="12"
                          :align-offset="-6"
                          :avoid-collisions="false"
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
          <DropdownMenuTrigger class="dropdownMenu_triggerClass">
            Open
          </DropdownMenuTrigger>
        </DropdownMenuRoot>
      </div>

      <h1 :style="{ marginTop: '275px' }">
        Positioning
      </h1>
      <h2>No collisions</h2>
      <h3>Side & Align</h3>
      <div class="dropdownMenu_gridClass">
        <template v-for="side in SIDES">
          <DropdownMenuRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open :modal="false">
            <DropdownMenuTrigger class="dropdownMenu_chromaticTriggerClass" />
            <DropdownMenuPortal>
              <DropdownMenuContent
                class="dropdownMenu_chromaticContentClass"
                :side="side"
                :align="align"
                :avoid-collisions="false"
              >
                <p :style="{ textAlign: 'center' }">
                  {{ side }}
                  <br>
                  {{ align }}
                </p>
                <DropdownMenuArrow class="dropdownMenu_chromaticArrowClass" :width="20" :height="10" />
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
        </template>
      </div>

      <h3>Side offset</h3>
      <h4>Positive</h4>
      <div class="dropdownMenu_gridClass">
        <template v-for="side in SIDES">
          <DropdownMenuRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open :modal="false">
            <DropdownMenuTrigger class="dropdownMenu_chromaticTriggerClass" />
            <DropdownMenuPortal>
              <DropdownMenuContent
                class="dropdownMenu_chromaticContentClass"
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
                <DropdownMenuArrow class="dropdownMenu_chromaticArrowClass" :width="20" :height="10" />
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
        </template>
      </div>
      <h4>Negative</h4>
      <div class="dropdownMenu_gridClass">
        <template v-for="side in SIDES">
          <DropdownMenuRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open :modal="false">
            <DropdownMenuTrigger class="dropdownMenu_chromaticTriggerClass" />
            <DropdownMenuPortal>
              <DropdownMenuContent
                class="dropdownMenu_chromaticContentClass"
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
                <DropdownMenuArrow class="dropdownMenu_chromaticArrowClass" :width="20" :height="10" />
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
        </template>
      </div>

      <h3>Align offset</h3>
      <h4>Positive</h4>
      <div class="dropdownMenu_gridClass">
        <template v-for="side in SIDES">
          <DropdownMenuRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open :modal="false">
            <DropdownMenuTrigger class="dropdownMenu_chromaticTriggerClass" />
            <DropdownMenuPortal>
              <DropdownMenuContent
                class="dropdownMenu_chromaticContentClass"
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
                <DropdownMenuArrow class="dropdownMenu_chromaticArrowClass" :width="20" :height="10" />
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
        </template>
      </div>
      <h4>Negative</h4>
      <div class="dropdownMenu_gridClass">
        <template v-for="side in SIDES">
          <DropdownMenuRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open :modal="false">
            <DropdownMenuTrigger class="dropdownMenu_chromaticTriggerClass" />
            <DropdownMenuPortal>
              <DropdownMenuContent
                class="dropdownMenu_chromaticContentClass"
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
                <DropdownMenuArrow class="dropdownMenu_chromaticArrowClass" :width="20" :height="10" />
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
        </template>
      </div>

      <h2>Collisions</h2>
      <p>See instances on the periphery of the page.</p>
      <template v-for="side in SIDES">
        <DropdownMenuRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open :modal="false">
          <DropdownMenuTrigger
            class="dropdownMenu_chromaticTriggerClass"
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
          <DropdownMenuPortal>
            <DropdownMenuContent class="dropdownMenu_chromaticContentClass" :side="side" :align="align">
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <DropdownMenuArrow class="dropdownMenu_chromaticArrowClass" :width="20" :height="10" />
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>
      </template>
      <h2>Relative parent (non-portalled)</h2>
      <div :style="{ position: 'relative' }">
        <DropdownMenuRoot open :modal="false">
          <DropdownMenuTrigger class="dropdownMenu_triggerClass">
            Open
          </DropdownMenuTrigger>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5" :avoid-collisions="false">
            <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
              Undo
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
              Redo
            </DropdownMenuItem>
            <DropdownMenuArrow />
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </div>

      <h1 :style="{ marginTop: '100px' }">
        With labels
      </h1>
      <DropdownMenuRoot open :modal="false">
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5" :avoid-collisions="false">
            <DropdownMenuGroup v-for="(foodGroup, index) in foodGroups" :key="index">
              <DropdownMenuLabel v-if="foodGroup.label" :key="foodGroup.label" class="menu_labelClass">
                {{ foodGroup.label }}}
              </DropdownMenuLabel>
              <DropdownMenuItem
                v-for="food in foodGroup.foods"
                :key="food.value"
                class="menu_itemClass"
                :disabled="food.disabled"
                @select="log(food.label)"
              >
                {{ food.label }}
              </DropdownMenuItem>
              <DropdownMenuSeparator v-if="index < foodGroups.length - 1" class="menu_separatorClass" />
            </DropdownMenuGroup>
            <DropdownMenuArrow />
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>

      <h1 :style="{ marginTop: '600px' }">
        With checkbox and radio items
      </h1>
      <DropdownMenuRoot open :modal="false">
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5" :avoid-collisions="false">
            <DropdownMenuItem class="menu_itemClass" @select="log('show')">
              Show fonts
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('bigger')">
              Bigger
            </DropdownMenuItem>
            <DropdownMenuItem class="menu_itemClass" @select="log('smaller')">
              Smaller
            </DropdownMenuItem>
            <DropdownMenuSeparator class="menu_separatorClass" />
            <DropdownMenuCheckboxItem
              v-for="option in checkboxItems"
              :key="option.label"
              class="menu_itemClass"
              :checked="option.state.value"
              :disabled="option.disabled"
              @update:checked="(v) => {
                option.state.value = v
              }"
            >
              {{ option.label }}
              <DropdownMenuItemIndicator>
                <TickIcon />
              </DropdownMenuItemIndicator>
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator class="menu_separatorClass" />
            <DropdownMenuRadioGroup :value="file" @update:value="setFile">
              <DropdownMenuRadioItem v-for="el in files" :key="el" class="menu_itemClass" :value="el">
                {{ el }}
                <DropdownMenuItemIndicator>
                  <TickIcon />
                </DropdownMenuItemIndicator>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuArrow />
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>

      <h1 :style="{ marginTop: '500px' }">
        Nested composition
      </h1>

      <DropdownMenuRoot open :modal="false">
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>

        <DropdownMenuContent class="menu_contentClass" :side-offset="5" :avoid-collisions="false">
          <DialogRoot open :modal="false">
            <DialogTrigger class="menu_itemClass" as="template">
              <DropdownMenuItem @select="(event) => event.preventDefault()">
                Open dialog
              </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent
              :style="{
                position: 'absolute',
                top: 0,
                left: '150px',
                width: '300px',
                padding: '20px',
                backgroundColor: 'whitesmoke',
                border: '1px solid black',
              }"
            >
              <DialogTitle :style="{ marginTop: 0 }">
                Dropdown in nested dialog
              </DialogTitle>
              <DropdownMenuRoot open :modal="false">
                <DropdownMenuTrigger class="dropdownMenu_triggerClass" :style="{ width: '100%' }">
                  Open
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent
                    class="menu_contentClass"
                    :side-offset="5"
                    :avoid-collisions="false"
                  >
                    <DropdownMenuItem class="menu_itemClass" @select="log('undo')">
                      Undo
                    </DropdownMenuItem>
                    <DropdownMenuItem class="menu_itemClass" @select="log('redo')">
                      Redo
                    </DropdownMenuItem>
                    <DropdownMenuArrow />
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenuRoot>
            </DialogContent>
          </DialogRoot>
          <DropdownMenuItem class="menu_itemClass">
            Test
          </DropdownMenuItem>
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenuRoot>

      <h1 :style="{ marginTop: '500px' }">
        State attributes
      </h1>
      <h2>Closed</h2>
      <DropdownMenuRoot :open="false" :modal="false">
        <DropdownMenuTrigger class="dropdownMenu_triggerAttrClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            class="dropdownMenu_contentAttrClass"
            :side-offset="5"
            :avoid-collisions="false"
          />
        </DropdownMenuPortal>
      </DropdownMenuRoot>

      <h2>Open</h2>
      <DropdownMenuRoot open :modal="false">
        <DropdownMenuTrigger class="dropdownMenu_triggerAttrClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            class="dropdownMenu_contentAttrClass"
            :side-offset="5"
            :avoid-collisions="false"
          >
            <DropdownMenuItem class="dropdownMenu_itemAttrClass" @select="log('show')">
              Show fonts
            </DropdownMenuItem>
            <DropdownMenuItem class="dropdownMenu_itemAttrClass" @select="log('bigger')">
              Bigger
            </DropdownMenuItem>
            <DropdownMenuItem class="dropdownMenu_itemAttrClass" @select="log('smaller')">
              Smaller
            </DropdownMenuItem>
            <DropdownMenuSeparator class="dropdownMenu_separatorAttrClass" />
            <DropdownMenuCheckboxItem
              v-for="option in checkboxItems"
              :key="option.label"
              class="dropdownMenu_checkboxItemAttrClass"
              :checked="option.state.value"
              :disabled="option.disabled"
              @update:checked="(v) => {
                option.state.value = v
              }"
            >
              {{ option.label }}
              <DropdownMenuItemIndicator class="dropdownMenu_itemIndicatorAttrClass">
                <TickIcon />
              </DropdownMenuItemIndicator>
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator class="dropdownMenu_separatorAttrClass" />

            <DropdownMenuRadioGroup class="dropdownMenu_radioGroupAttrClass" :value="file" @update:value="setFile">
              <DropdownMenuRadioItem v-for="el in files" :key="el" class="dropdownMenu_radioItemAttrClass" :value="el">
                {{ el }}
                <DropdownMenuItemIndicator class="dropdownMenu_itemIndicatorAttrClass">
                  <TickIcon />
                </DropdownMenuItemIndicator>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>

            <DropdownMenuArrow class="dropdownMenu_arrowAttrClass" />
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
    </div>
  </div>
</template>
