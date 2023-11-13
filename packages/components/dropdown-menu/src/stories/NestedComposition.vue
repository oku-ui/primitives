<script setup lang="ts">
import { OkuDropdownMenu, OkuDropdownMenuArrow, OkuDropdownMenuContent, OkuDropdownMenuItem, OkuDropdownMenuPortal, OkuDropdownMenuTrigger } from '@oku-ui/dropdown-menu'
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }"
  >
    <OkuDropdownMenu>
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5">
          <OkuDialog>
            <OkuDialogTrigger class="dropdown-menu-item" as-child>
              <OkuDropdownMenuItem @select="(event) => event.preventDefault()">
                Open dialog
              </OkuDropdownMenuItem>
            </OkuDialogTrigger>

            <OkuDialogPortal>
              <OkuDialogContent class="dropdown-menu-dialog">
                <OkuDialogTitle>Nested dropdown</OkuDialogTitle>
                <OkuDropdownMenu>
                  <OkuDropdownMenuTrigger
                    class="dropdown-menu-trigger"
                    :style="{ width: '100%', marginBottom: '20px' }"
                  >
                    Open
                  </OkuDropdownMenuTrigger>
                  <OkuDropdownMenuPortal>
                    <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5">
                      <OkuDropdownMenuItem
                        class="dropdown-menu-item"
                        @select="console.log('undo')"
                      >
                        Undo
                      </OkuDropdownMenuItem>
                      <OkuDropdownMenuItem
                        class="dropdown-menu-item"
                        @select="console.log('redo')"
                      >
                        Redo
                      </OkuDropdownMenuItem>
                      <OkuDropdownMenuArrow />
                    </OkuDropdownMenuContent>
                  </OkuDropdownMenuPortal>
                </OkuDropdownMenu>
                <OkuDialogClose>Close</OkuDialogClose>
              </OkuDialogContent>
            </OkuDialogPortal>
          </OkuDialog>
          <OkuDropdownMenuItem class="dropdown-menu-item">
            Test
          </OkuDropdownMenuItem>
          <OkuDropdownMenuArrow />
        </OkuDropdownMenuContent>
      </OkuDropdownMenuPortal>
    </OkuDropdownMenu>
  </div>
</template>
