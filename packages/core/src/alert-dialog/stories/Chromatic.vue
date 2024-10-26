<script setup lang="ts">
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogRoot, AlertDialogTitle, AlertDialogTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div
    :style="{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
      height: '600px',
    }"
  >
    <div>
      <h1>Uncontrolled</h1>
      <h2>Closed</h2>
      <AlertDialogRoot>
        <AlertDialogTrigger class="alertDialog_triggerClass">
          delete everything
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogOverlay class="alertDialog_overlayClass" />
          <AlertDialogContent class="alertDialog_chromaticContentClass">
            <AlertDialogTitle class="alertDialog_titleClass">
              Title
            </AlertDialogTitle>
            <AlertDialogDescription class="alertDialog_descriptionClass">
              Description
            </AlertDialogDescription>
            <AlertDialogAction class="alertDialog_actionClass">
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel class="alertDialog_cancelClass">
              Cancel
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>

      <h2>Open</h2>
      <AlertDialogRoot default-open>
        <AlertDialogTrigger class="alertDialog_triggerClass">
          delete everything
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogOverlay
            class="alertDialog_overlayClass"
            :style="{ left: 0, bottom: '50%', width: '25%' }"
          />
          <AlertDialogContent
            class="alertDialog_chromaticContentClass"
            :style="{ top: '25%', left: '12%' }"
          >
            <AlertDialogTitle class="alertDialog_titleClass">
              Title
            </AlertDialogTitle>
            <AlertDialogDescription class="alertDialog_descriptionClass">
              Description
            </AlertDialogDescription>
            <AlertDialogAction class="alertDialog_actionClass">
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel class="alertDialog_cancelClass">
              Cancel
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>
    </div>

    <div>
      <h1>Uncontrolled with reordered parts</h1>
      <h2>Closed</h2>
      <AlertDialogRoot>
        <AlertDialogPortal>
          <AlertDialogOverlay class="alertDialog_overlayClass" />
          <AlertDialogContent class="alertDialog_chromaticContentClass">
            <AlertDialogTitle class="alertDialog_titleClass">
              Title
            </AlertDialogTitle>
            <AlertDialogDescription class="alertDialog_descriptionClass">
              Description
            </AlertDialogDescription>
            <AlertDialogAction class="alertDialog_actionClass">
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel class="alertDialog_cancelClass">
              Cancel
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialogPortal>
        <AlertDialogTrigger class="alertDialog_triggerClass">
          delete everything
        </AlertDialogTrigger>
      </AlertDialogRoot>

      <h2>Open</h2>
      <AlertDialogRoot default-open>
        <AlertDialogPortal>
          <AlertDialogOverlay
            class="alertDialog_overlayClass"
            :style="{ left: '25%', bottom: '50%', width: '25%' }"
          />
          <AlertDialogContent
            class="alertDialog_chromaticContentClass"
            :style="{ top: '25%', left: '37%' }"
          >
            <AlertDialogTitle class="alertDialog_titleClass">
              Title
            </AlertDialogTitle>
            <AlertDialogDescription class="alertDialog_descriptionClass">
              Description
            </AlertDialogDescription>
            <AlertDialogAction class="alertDialog_actionClass">
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel class="alertDialog_cancelClass">
              Cancel
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialogPortal>
        <AlertDialogTrigger class="alertDialog_triggerClass">
          delete everything
        </AlertDialogTrigger>
      </AlertDialogRoot>
    </div>

    <div>
      <h1>Controlled</h1>
      <h2>Closed</h2>
      <AlertDialogRoot :open="false">
        <AlertDialogTrigger class="alertDialog_triggerClass">
          delete everything
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogOverlay class="alertDialog_overlayClass" />
          <AlertDialogContent class="alertDialog_chromaticContentClass">
            <AlertDialogTitle class="alertDialog_titleClass">
              Title
            </AlertDialogTitle>
            <AlertDialogDescription class="alertDialog_descriptionClass">
              Description
            </AlertDialogDescription>
            <AlertDialogAction class="alertDialog_actionClass">
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel class="alertDialog_cancelClass">
              Cancel
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>

      <h2>Open</h2>
      <!-- <AlertDialogRoot open>
        <AlertDialogTrigger class="alertDialog_triggerClass">
          delete everything
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogOverlay
            class="alertDialog_overlayClass"
            :style="{ left: '50%', bottom: '50%', width: '25%' }"
          />
          <AlertDialogContent
            class="alertDialog_chromaticContentClass"
            :style="{ top: '25%', left: '62%' }"
          >
            <AlertDialogTitle class="alertDialog_titleClass">
              Title
            </AlertDialogTitle>
            <AlertDialogDescription class="alertDialog_descriptionClass">
              Description
            </AlertDialogDescription>
            <AlertDialogAction class="alertDialog_actionClass">
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel class="alertDialog_cancelClass">
              Cancel
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot> -->
    </div>

    <div>
      <h1>Controlled with reordered parts</h1>
      <h2>Closed</h2>
      <AlertDialogRoot :open="false">
        <AlertDialogPortal>
          <AlertDialogOverlay class="alertDialog_overlayClass" />
          <AlertDialogContent class="alertDialog_chromaticContentClass">
            <AlertDialogTitle class="alertDialog_titleClass">
              Title
            </AlertDialogTitle>
            <AlertDialogDescription class="alertDialog_descriptionClass">
              Description
            </AlertDialogDescription>
            <AlertDialogAction class="alertDialog_actionClass">
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel class="alertDialog_cancelClass">
              Cancel
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialogPortal>
        <AlertDialogTrigger class="alertDialog_triggerClass">
          delete everything
        </AlertDialogTrigger>
      </AlertDialogRoot>

      <h2>Open</h2>
      <!-- <AlertDialogRoot open>
        <AlertDialogPortal>
          <AlertDialogOverlay
            class="alertDialog_overlayClass"
            :style="{ left: '75%', bottom: '50%', width: '25%' }"
          />
          <AlertDialogContent
            class="alertDialog_chromaticContentClass"
            :style="{ top: '25%', left: '88%' }"
          >
            <AlertDialogTitle class="alertDialog_titleClass">
              Title
            </AlertDialogTitle>
            <AlertDialogDescription class="alertDialog_descriptionClass">
              Description
            </AlertDialogDescription>
            <AlertDialogAction class="alertDialog_actionClass">
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel class="alertDialog_cancelClass">
              Cancel
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialogPortal>
        <AlertDialogTrigger class="alertDialog_triggerClass">
          delete everything
        </AlertDialogTrigger>
      </AlertDialogRoot> -->
    </div>

    <div>
      <h1>State attributes</h1>
      <h2>Closed</h2>
      <AlertDialogRoot>
        <AlertDialogTrigger class="alertDialog_triggerAttrClass">
          delete everything
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogOverlay class="alertDialog_overlayAttrClass" />
          <AlertDialogContent class="alertDialog_contentAttrClass">
            <AlertDialogTitle class="alertDialog_titleAttrClass">
              Title
            </AlertDialogTitle>
            <AlertDialogDescription class="alertDialog_descriptionAttrClass">
              Description
            </AlertDialogDescription>
            <AlertDialogAction class="alertDialog_actionAttrClass">
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel class="alertDialog_cancelAttrClass">
              Cancel
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>

      <h2>Open</h2>
      <AlertDialogRoot default-open>
        <AlertDialogTrigger class="alertDialog_triggerAttrClass">
          delete everything
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogOverlay class="alertDialog_overlayAttrClass" :style="{ top: '50%' }" />
          <AlertDialogContent class="alertDialog_contentAttrClass" :style="{ top: '75%' }">
            <AlertDialogTitle class="alertDialog_titleAttrClass">
              Title
            </AlertDialogTitle>
            <AlertDialogDescription class="alertDialog_descriptionAttrClass">
              Description
            </AlertDialogDescription>
            <AlertDialogAction class="alertDialog_actionAttrClass">
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel class="alertDialog_cancelAttrClass">
              Cancel
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>
    </div>
  </div>
</template>
