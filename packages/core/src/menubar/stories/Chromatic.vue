<script setup lang="ts">
import { shallowRef } from 'vue'
import { foodGroups } from '../../menu/stories/foods.ts'
import TickIcon from '../../menu/stories/TickIcon.vue'
import {
  MenubarArrow,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarItemIndicator,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarRoot,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '../index.ts'
import './styles.css'
import '../../menu/stories/styles.css'

const checkboxItems = [
  { label: 'Bold', state: shallowRef(false) },
  { label: 'Italic', state: shallowRef(true) },
  { label: 'Underline', state: shallowRef(false) },
  { label: 'Strikethrough', state: shallowRef(false), disabled: true },
]
const files = ['README.md', 'index.js', 'page.css']
const file = shallowRef(files[1]!)

function setFile(value: string) {
  file.value = value
}

function log(value: string) {
  // eslint-disable-next-line no-console
  console.log(value)
}
</script>

<template>
  <div>
    <div :style="{ padding: '200px', paddingTop: '50px', paddingBottom: '800px' }">
      <h1>Uncontrolled</h1>
      <h2>Closed</h2>
      <MenubarRoot class="menubar_rootClass">
        <MenubarMenu>
          <MenubarTrigger class="menubar_triggerClass">
            File
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
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
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
              <MenubarItem class="menu_itemClass" disabled>
                Undo
              </MenubarItem>
              <MenubarItem class="menu_itemClass">
                Redo
              </MenubarItem>
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
      </MenubarRoot>

      <h2>Open</h2>
      <MenubarRoot default-value="file" class="menubar_rootClass">
        <MenubarMenu value="file">
          <MenubarTrigger class="menubar_triggerClass">
            File
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent
              class="menu_contentClass"
              :avoid-collisions="false"
              :side-offset="2"
              @focus-outside="(event) => event.preventDefault()"
            >
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

              <MenubarItem class="menu_itemClass">
                Print…
              </MenubarItem>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>

        <MenubarMenu value="edit">
          <MenubarTrigger class="menubar_triggerClass">
            Edit
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
              <MenubarItem class="menu_itemClass" disabled>
                Undo
              </MenubarItem>
              <MenubarItem class="menu_itemClass">
                Redo
              </MenubarItem>
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
      </MenubarRoot>

      <h1 :style="{ marginTop: '180px' }">
        Controlled
      </h1>
      <h2>Closed</h2>
      <MenubarRoot value="" class="menubar_rootClass">
        <MenubarMenu value="file">
          <MenubarTrigger class="menubar_triggerClass">
            File
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
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

              <MenubarItem class="menu_itemClass">
                Print…
              </MenubarItem>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>

        <MenubarMenu value="edit">
          <MenubarTrigger class="menubar_triggerClass">
            Edit
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
              <MenubarItem class="menu_itemClass" disabled>
                Undo
              </MenubarItem>
              <MenubarItem class="menu_itemClass">
                Redo
              </MenubarItem>
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
      </MenubarRoot>

      <h2>Open</h2>
      <MenubarRoot value="file" class="menubar_rootClass">
        <MenubarMenu value="file">
          <MenubarTrigger class="menubar_triggerClass">
            File
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
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

              <MenubarItem class="menu_itemClass">
                Print…
              </MenubarItem>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>

        <MenubarMenu value="edit">
          <MenubarTrigger class="menubar_triggerClass">
            Edit
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
              <MenubarItem class="menu_itemClass" disabled>
                Undo
              </MenubarItem>
              <MenubarItem class="menu_itemClass">
                Redo
              </MenubarItem>
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
      </MenubarRoot>

      <h1 :style="{ marginTop: '200px' }">
        Submenus
      </h1>
      <MenubarRoot value="edit" class="menubar_rootClass">
        <MenubarMenu value="file">
          <MenubarTrigger class="menubar_triggerClass">
            File
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
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

              <MenubarItem class="menu_itemClass">
                Print…
              </MenubarItem>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>

        <MenubarMenu value="edit">
          <MenubarTrigger class="menubar_triggerClass">
            Edit
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
              <MenubarItem class="menu_itemClass" disabled>
                Undo
              </MenubarItem>
              <MenubarItem class="menu_itemClass">
                Redo
              </MenubarItem>
              <MenubarSeparator class="menu_separatorClass" />
              <MenubarSub open>
                <MenubarSubTrigger class="menu_subTriggerClass">
                  Find <span>→</span>
                </MenubarSubTrigger>
                <MenubarPortal>
                  <MenubarSubContent
                    class="menu_contentClass"
                    :side-offset="10"
                    :align-offset="-6"
                    :avoid-collisions="false"
                  >
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
                    <MenubarSub open>
                      <MenubarSubTrigger class="menu_subTriggerClass">
                        Advanced <span>→</span>
                      </MenubarSubTrigger>

                      <MenubarPortal>
                        <MenubarSubContent
                          class="menu_contentClass"
                          :side-offset="10"
                          :align-offset="-6"
                          :avoid-collisions="false"
                        >
                          <MenubarItem class="menu_itemClass">
                            Regex
                          </MenubarItem>
                          <MenubarItem class="menu_itemClass">
                            Replace
                          </MenubarItem>
                          <MenubarArrow />
                        </MenubarSubContent>
                      </MenubarPortal>
                    </MenubarSub>
                    <MenubarArrow />
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
      </MenubarRoot>

      <h2 :style="{ marginTop: '250px' }">
        RTL
      </h2>
      <div dir="rtl">
        <MenubarRoot value="edit" class="menu_rootClass" dir="rtl">
          <MenubarMenu value="file">
            <MenubarTrigger class="menubar_triggerClass">
              File
            </MenubarTrigger>
            <MenubarPortal>
              <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
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

                <MenubarItem class="menu_itemClass">
                  Print…
                </MenubarItem>
              </MenubarContent>
            </MenubarPortal>
          </MenubarMenu>

          <MenubarMenu value="edit">
            <MenubarTrigger class="menubar_triggerClass">
              Edit
            </MenubarTrigger>
            <MenubarPortal>
              <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
                <MenubarItem class="menu_itemClass" disabled>
                  Undo
                </MenubarItem>
                <MenubarItem class="menu_itemClass">
                  Redo
                </MenubarItem>
                <MenubarSeparator class="menu_separatorClass" />
                <MenubarSub open>
                  <MenubarSubTrigger class="menu_subTriggerClass">
                    Find <span>→</span>
                  </MenubarSubTrigger>
                  <MenubarPortal>
                    <MenubarSubContent
                      class="menu_contentClass"
                      :side-offset="10"
                      :align-offset="-6"
                      :avoid-collisions="false"
                    >
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
                      <MenubarSub open>
                        <MenubarSubTrigger class="menu_subTriggerClass">
                          Advanced <span>→</span>
                        </MenubarSubTrigger>

                        <MenubarPortal>
                          <MenubarSubContent
                            class="menu_contentClass"
                            :side-offset="10"
                            :align-offset="-6"
                            :avoid-collisions="false"
                          >
                            <MenubarItem class="menu_itemClass">
                              Regex
                            </MenubarItem>
                            <MenubarItem class="menu_itemClass">
                              Replace
                            </MenubarItem>
                            <MenubarArrow />
                          </MenubarSubContent>
                        </MenubarPortal>
                      </MenubarSub>
                      <MenubarArrow />
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
        </MenubarRoot>
      </div>

      <h2 :style="{ marginTop: '250px' }">
        With labels
      </h2>
      <MenubarRoot value="food" class="menubar_rootClass">
        <MenubarMenu value="food">
          <MenubarTrigger class="menubar_triggerClass">
            Food
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
              <MenubarGroup v-for="(foodGroup, index) in foodGroups" :key="index">
                <MenubarLabel v-if="foodGroup.label" :key="foodGroup.label" class="menu_labelClass">
                  {{ foodGroup.label }}
                </MenubarLabel>
                <MenubarItem
                  v-for="food in foodGroup.foods"
                  :key="food.value"
                  class="menu_itemClass"
                  :disabled="food.disabled"
                  @select="log(food.label)"
                >
                  {{ food.label }}
                </MenubarItem>
                <MenubarSeparator v-if="index < foodGroups.length - 1" class="menu_separatorClass" />
              </MenubarGroup>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>

        <MenubarMenu value="edit">
          <MenubarTrigger class="menubar_triggerClass">
            Edit
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
              <MenubarItem class="menu_itemClass" disabled>
                Undo
              </MenubarItem>
              <MenubarItem class="menu_itemClass">
                Redo
              </MenubarItem>
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
      </MenubarRoot>

      <h2 :style="{ marginTop: '600px' }">
        With checkbox and radio items
      </h2>
      <MenubarRoot value="items" class="menubar_rootClass">
        <MenubarMenu value="items">
          <MenubarTrigger class="menubar_triggerClass">
            Items
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
              <MenubarItem class="menu_itemClass" @select="log('show')">
                Show fonts
              </MenubarItem>
              <MenubarItem class="menu_itemClass" @select="log('bigger')">
                Bigger
              </MenubarItem>
              <MenubarItem class="menu_itemClass" @select="log('smaller')">
                Smaller
              </MenubarItem>
              <MenubarSeparator class="menu_separatorClass" />
              <MenubarCheckboxItem
                v-for="checkboxItem in checkboxItems"
                :key="checkboxItem.label"
                class="menu_itemClass"
                :checked="checkboxItem.state.value"
                :disabled="checkboxItem.disabled"
                @update:checked="(v) => {
                  checkboxItem.state.value = v
                }"
              >
                {{ checkboxItem.label }}
                <MenubarItemIndicator>
                  <TickIcon />
                </MenubarItemIndicator>
              </MenubarCheckboxItem>
              <MenubarSeparator class="menu_separatorClass" />
              <MenubarRadioGroup :value="file" @update:value="setFile">
                <MenubarRadioItem
                  v-for="el in files"
                  :key="el"
                  class="menu_itemClass" :value="el"
                >
                  {{ el }}
                  <MenubarItemIndicator>
                    <TickIcon />
                  </MenubarItemIndicator>
                </MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>

        <MenubarMenu value="edit">
          <MenubarTrigger class="menubar_triggerClass">
            Edit
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent class="menu_contentClass" :avoid-collisions="false" :side-offset="2">
              <MenubarItem class="menu_itemClass" disabled>
                Undo
              </MenubarItem>
              <MenubarItem class="menu_itemClass">
                Redo
              </MenubarItem>
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
      </MenubarRoot>
    </div>
  </div>
</template>
