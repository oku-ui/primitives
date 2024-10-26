<script setup lang="ts">
import { DialogClose, DialogContent, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from '../../dialog/index.ts'
import { DropdownMenuArrow, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuTrigger } from '../index.ts'
import './style.css'
import '../../menu/stories/styles.css'

function log(v: string) {
  // eslint-disable-next-line no-console
  console.log(v)
}
</script>

<template>
  <div>
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }"
    >
      <DropdownMenuRoot>
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5">
            <DialogRoot>
              <DialogTrigger class="menu_itemClass" as="template">
                <DropdownMenuItem @select="(event) => event.preventDefault()">
                  Open dialog
                </DropdownMenuItem>
              </DialogTrigger>

              <DialogPortal>
                <DialogContent class="dropdownMenu_dialogClass">
                  <DialogTitle>Nested dropdown</DialogTitle>
                  <DropdownMenuRoot>
                    <DropdownMenuTrigger
                      class="dropdownMenu_triggerClass"
                      :style="{ width: '100%', marginBottom: '20px' }"
                    >
                      Open
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuContent class="menu_contentClass" :side-offset="5">
                        <DropdownMenuItem
                          class="menu_itemClass"
                          @select="log('undo')"
                        >
                          Undo
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          class="menu_itemClass"
                          @select="log('redo')"
                        >
                          Redo
                        </DropdownMenuItem>
                        <DropdownMenuArrow />
                      </DropdownMenuContent>
                    </DropdownMenuPortal>
                  </DropdownMenuRoot>
                  <DialogClose>Close</DialogClose>
                </DialogContent>
              </DialogPortal>
            </DialogRoot>
            <DropdownMenuItem class="menu_itemClass">
              Test
            </DropdownMenuItem>
            <DropdownMenuArrow />
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
    </div>
  </div>
</template>
