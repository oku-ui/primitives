<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import {
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@oku-ui/primitives'

const toggleState = ref(false)
const checkboxOne = ref(false)
const checkboxTwo = ref(false)
const person = ref('pedro')

function handleClick() {
  // eslint-disable-next-line no-alert
  alert('hello!')
}
</script>

<template>
  <DropdownMenuRoot v-model:open="toggleState">
    <DropdownMenuTrigger
      class="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-mauve12 bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-indigo3 focus:shadow-[0_0_0_2px] focus:shadow-black"
      aria-label="Customise options"
    >
      <Icon icon="radix-icons:hamburger-menu" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        class="min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        :side-offset="5"
      >
        <DropdownMenuItem
          value="New Tab"
          class="group text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
          @click="handleClick"
        >
          New Tab
          <div
            class="ml-auto pl-[20px] text-mauve12 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
          >
            ⌘+T
          </div>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            value="more toolsz"
            class="group w-full text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-indigo4 data-[state=open]:text-mauve12 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1 data-[highlighted]:data-[state=open]:bg-indigo9 data-[highlighted]:data-[state=open]:text-indigo1"
          >
            More Tools
            <div
              class="ml-auto pl-[20px] text-mauve12 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
            >
              <Icon icon="radix-icons:chevron-right" />
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              class="min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              :side-offset="2"
              :align-offset="-5"
            >
              <DropdownMenuItem
                class="group text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
              >
                Save Page As…
                <div
                  class="ml-auto pl-[20px] text-mauve12 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                >
                  ⌘+S
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
              >
                Create Shortcut…
              </DropdownMenuItem>
              <DropdownMenuItem
                class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
              >
                Name Window…
              </DropdownMenuItem>
              <DropdownMenuSeparator class="h-[1px] bg-indigo6 m-[5px]" />
              <DropdownMenuItem
                class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
              >
                Developer Tools
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem
          value="New Window"
          class="group text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
        >
          New Window
          <div
            class="ml-auto pl-[20px] text-mauve12 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
          >
            ⌘+N
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          value="New Private Window"
          class="group text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
          disabled
        >
          New Private Window
          <div
            class="ml-auto pl-[20px] text-mauve12 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
          >
            ⇧+⌘+N
          </div>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            value="more tools"
            class="group text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none w-full outline-none data-[state=open]:bg-indigo4 data-[state=open]:text-mauve12 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1 data-[highlighted]:data-[state=open]:bg-indigo9 data-[highlighted]:data-[state=open]:text-indigo1"
          >
            More Tools
            <div
              class="ml-auto pl-[20px] text-mauve12 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
            >
              <Icon icon="radix-icons:chevron-right" />
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              class="min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              :side-offset="2"
              :align-offset="-5"
            >
              <DropdownMenuItem
                class="group text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
              >
                Save Page As…
                <div
                  class="ml-auto pl-[20px] text-mauve12 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                >
                  ⌘+S
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
              >
                Create Shortcut…
              </DropdownMenuItem>
              <DropdownMenuItem
                class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
              >
                Name Window…
              </DropdownMenuItem>
              <DropdownMenuSeparator class="h-[1px] bg-indigo6 m-[5px]" />
              <DropdownMenuItem
                class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
              >
                Developer Tools
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  value="more toolsz"
                  class="group w-full text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-indigo4 data-[state=open]:text-mauve12 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1 data-[highlighted]:data-[state=open]:bg-indigo9 data-[highlighted]:data-[state=open]:text-indigo1"
                >
                  More Tools
                  <div
                    class="ml-auto pl-[20px] text-mauve12 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                  >
                    <Icon icon="radix-icons:chevron-right" />
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    class="min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    :side-offset="2"
                    :align-offset="-5"
                  >
                    <DropdownMenuItem
                      class="group text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
                    >
                      Save Page As…
                      <div
                        class="ml-auto pl-[20px] text-mauve12 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                      >
                        ⌘+S
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
                    >
                      Create Shortcut…
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
                    >
                      Name Window…
                    </DropdownMenuItem>
                    <DropdownMenuSeparator class="h-[1px] bg-indigo6 m-[5px]" />
                    <DropdownMenuItem
                      class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
                    >
                      Developer Tools
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger
                        value="more toolsz"
                        class="group w-full text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-indigo4 data-[state=open]:text-mauve12 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1 data-[highlighted]:data-[state=open]:bg-indigo9 data-[highlighted]:data-[state=open]:text-indigo1"
                      >
                        More Tools
                        <div
                          class="ml-auto pl-[20px] text-mauve12 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                        >
                          <Icon icon="radix-icons:chevron-right" />
                        </div>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent
                          class="min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                          :side-offset="2"
                          :align-offset="-5"
                        >
                          <DropdownMenuItem
                            class="group text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
                          >
                            Save Page As…
                            <div
                              class="ml-auto pl-[20px] text-mauve12 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                            >
                              ⌘+S
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
                          >
                            Create Shortcut…
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
                          >
                            Name Window…
                          </DropdownMenuItem>
                          <DropdownMenuSeparator class="h-[1px] bg-indigo6 m-[5px]" />
                          <DropdownMenuItem
                            class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
                          >
                            Developer Tools
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem
                class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
              >
                Developer Tools
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator class="h-[1px] bg-indigo6 m-[5px]" />
        <DropdownMenuCheckboxItem
          v-model:checked="checkboxOne"
          class="group text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
        >
          <DropdownMenuItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
            <Icon icon="radix-icons:check" />
          </DropdownMenuItemIndicator>
          Show Bookmarks
          <div
            class="ml-auto pl-[20px] text-mauve12 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
          >
            ⌘+B
          </div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          v-model:checked="checkboxTwo"
          class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
        >
          <DropdownMenuItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
            <Icon icon="radix-icons:check" />
          </DropdownMenuItemIndicator>
          Show Full URLs
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator class="h-[1px] bg-indigo6 m-[5px]" />

        <DropdownMenuLabel class="pl-[25px] text-xs leading-[25px] text-mauve12">
          People
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup v-model="person">
          <DropdownMenuRadioItem
            class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
            value="pedro"
          >
            <DropdownMenuItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
              <Icon icon="radix-icons:dot-filled" />
            </DropdownMenuItemIndicator>
            Pedro Duarte
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            class="text-[13px] leading-none text-mauve12 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo9 data-[highlighted]:text-indigo1"
            value="colm"
          >
            <DropdownMenuItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
              <Icon icon="radix-icons:dot-filled" />
            </DropdownMenuItemIndicator>
            Colm Tuite
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuArrow class="fill-white" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
