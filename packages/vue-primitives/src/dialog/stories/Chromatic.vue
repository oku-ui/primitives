<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div
    :style="{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      height: '50vh',
    }"
  >
    <div>
      <h1>Uncontrolled</h1>
      <h2>Closed</h2>
      <DialogRoot>
        <DialogTrigger class="dialog_triggerClass">
          open
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay class="dialog_overlayClass" />
          <DialogContent class="dialog_chromaticContentClass">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
            <DialogClose class="dialog_closeClass">
              close
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>

      <h2>Open</h2>
      <DialogRoot default-open>
        <DialogTrigger class="dialog_triggerClass">
          open
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay class="dialog_overlayClass" :style="{ left: '0%', bottom: '50%', width: '25%' }" />
          <DialogContent class="dialog_chromaticContentClass" :style="{ top: '25%', left: '12%' }">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
            <DialogClose class="dialog_closeClass">
              close
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>

    <div>
      <h1>Uncontrolled with reordered parts</h1>
      <h2>Closed</h2>
      <DialogRoot>
        <DialogPortal>
          <DialogOverlay class="dialog_overlayClass" />
          <DialogContent class="dialog_chromaticContentClass">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
            <DialogClose class="dialog_closeClass">
              close
            </DialogClose>
          </DialogContent>
        </DialogPortal>
        <DialogTrigger class="dialog_triggerClass">
          open
        </DialogTrigger>
      </DialogRoot>

      <h2>Open</h2>
      <DialogRoot default-open>
        <DialogPortal>
          <DialogOverlay class="dialog_overlayClass" :style="{ left: '25%', bottom: '50%', width: '25%' }" />
          <DialogContent class="dialog_chromaticContentClass" :style="{ top: '25%', left: '37%' }">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
            <DialogClose class="dialog_closeClass">
              close
            </DialogClose>
          </DialogContent>
        </DialogPortal>
        <DialogTrigger class="dialog_triggerClass">
          open
        </DialogTrigger>
      </DialogRoot>
    </div>

    <div>
      <h1>Controlled</h1>
      <h2>Closed</h2>
      <DialogRoot :open="false">
        <DialogTrigger class="dialog_triggerClass">
          open
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay class="dialog_overlayClass" />
          <DialogContent class="dialog_chromaticContentClass">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
            <DialogClose class="dialog_closeClass">
              close
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>

      <h2>Open</h2>
      <!-- <Dialog open>
        <DialogPortal>
          <DialogTrigger class="dialog_triggerClass">
            open
          </DialogTrigger>
          <DialogOverlay class="dialog_overlayClass" :style="{ left: '50%', bottom: '50%', width: '25%' }" />
          <DialogContent class="dialog_chromaticContentClass" :style="{ top: '25%', left: '62%' }">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
            <DialogClose class="dialog_closeClass">
              close
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog> -->
    </div>

    <div>
      <h1>Controlled with reordered parts</h1>
      <h2>Closed</h2>
      <DialogRoot :open="false">
        <DialogPortal>
          <DialogOverlay class="dialog_overlayClass" />
          <DialogContent class="dialog_chromaticContentClass">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
            <DialogClose class="dialog_closeClass">
              close
            </DialogClose>
          </DialogContent>
        </DialogPortal>
        <DialogTrigger class="dialog_triggerClass">
          open
        </DialogTrigger>
      </DialogRoot>

      <h2>Open</h2>
      <!-- <Dialog open>
        <DialogPortal>
          <DialogOverlay class="dialog_overlayClass" :style="{ left: '75%', bottom: '50%', width: '25%' }" />
          <DialogContent class="dialog_chromaticContentClass" :style="{ top: '25%', left: '88%' }">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
            <DialogClose class="dialog_closeClass">
              close
            </DialogClose>
          </DialogContent>
        </DialogPortal>
        <DialogTrigger class="dialog_triggerClass">
          open
        </DialogTrigger>
      </Dialog> -->
    </div>

    <div
      :style="{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        height: '50vh',
      }"
    >
      <!-- <div>
        <h1>Forced mount</h1>
        <Dialog>
          <DialogTrigger class="dialog_triggerClass">
            open
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay
              class="dialog_overlayClass"
              :style=" {
                top: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }"
              force-mount
            />
            <DialogContent class="dialog_chromaticContentClass" :style="{ left: '25%', top: '75%' }" force-mount>
              <DialogTitle>Title</DialogTitle>
              <DialogDescription>Description</DialogDescription>
              <DialogClose class="dialog_closeClass">
                close
              </DialogClose>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div> -->

      <div>
        <h1>State attributes</h1>
        <h2>Closed</h2>
        <DialogRoot>
          <DialogTrigger class="dialog_triggerAttrClass">
            open
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay class="dialog_overlayAttrClass" />
            <DialogContent class="dialog_contentAttrClass">
              <DialogTitle>Title</DialogTitle>
              <DialogDescription>Description</DialogDescription>
              <DialogClose class="dialog_closeAttrClass">
                close
              </DialogClose>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>

        <h2>Open</h2>
        <DialogRoot default-open>
          <DialogTrigger class="dialog_triggerAttrClass">
            open
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay class="dialog_overlayAttrClass" :style="{ left: '50%', top: '50%' }" />
            <DialogContent class="dialog_contentAttrClass" :style="{ left: '75%', top: '75%' }">
              <DialogTitle>Title</DialogTitle>
              <DialogDescription>Description</DialogDescription>
              <DialogClose class="dialog_closeAttrClass">
                close
              </DialogClose>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
      </div>
    </div>
  </div>
</template>
