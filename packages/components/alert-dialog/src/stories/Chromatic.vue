<script setup lang="ts">
import {
  OkuAlertDialog, OkuAlertDialogAction, OkuAlertDialogCancel, OkuAlertDialogContent, OkuAlertDialogDescription, OkuAlertDialogOverlay, OkuAlertDialogPortal,
  OkuAlertDialogTitle, OkuAlertDialogTrigger,
} from '@oku-ui/alert-dialog'
</script>

<template>
  <div
    :style="{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
      height: '100vh',
    }"
  >
    <div>
      <h1>Uncontrolled</h1>
      <h2>Closed</h2>
      <OkuAlertDialog>
        <OkuAlertDialogTrigger class="alert-dialog-trigger">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="alert-dialog-overlay" />
          <OkuAlertDialogContent class="alert-dialog-chromaticContent">
            <OkuAlertDialogTitle class="alert-dialog-title">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert-dialog-description">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert-dialog-action">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert-dialog-cancel">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog default-open>
        <OkuAlertDialogTrigger class="alert-dialog-trigger">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay
            class="alert-dialog-overlay"
            :style="{ left: '0px', bottom: '50%', width: '25%' }"
          />
          <OkuAlertDialogContent
            class="alert-dialog-chromaticContent"
            :style="{ top: '25%', left: '12%' }"
          >
            <OkuAlertDialogTitle class="alert-dialog-title">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert-dialog-description">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert-dialog-action">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert-dialog-cancel">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>
    </div>

    <div>
      <h1>Uncontrolled with reordered parts</h1>
      <h2>Closed</h2>
      <OkuAlertDialog>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="alert-dialog-overlay" />
          <OkuAlertDialogContent class="alert-dialog-chromaticContent">
            <OkuAlertDialogTitle class="alert-dialog-title">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert-dialog-description">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert-dialog-action">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert-dialog-cancel">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
        <OkuAlertDialogTrigger class="alert-dialog-trigger">
          delete everything
        </OkuAlertDialogTrigger>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog default-open>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay
            class="alert-dialog-overlay"
            :style="{ left: '25%', bottom: '50%', width: '25%' }"
          />
          <OkuAlertDialogContent
            class="alert-dialog-chromaticContent"
            :style="{ top: '25%', left: '37%' }"
          >
            <OkuAlertDialogTitle class="alert-dialog-title">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert-dialog-description">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert-dialog-action">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert-dialog-cancel">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>
    </div>

    <div>
      <h1>Controlled</h1>
      <h2>Closed</h2>
      <OkuAlertDialog :open="false">
        <OkuAlertDialogTrigger class="alert-dialog-trigger">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="alert-dialog-overlay" />
          <OkuAlertDialogContent class="alert-dialog-chromaticContent">
            <OkuAlertDialogTitle class="alert-dialog-title">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert-dialog-description">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert-dialog-action">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert-dialog-cancel">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog open>
        <OkuAlertDialogTrigger class="alert-dialog-trigger">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay
            class="alert-dialog-overlay"
            :style="{ left: '50%', bottom: '50%', width: '25%' }"
          />
          <OkuAlertDialogContent
            class="alert-dialog-chromaticContent"
            :style="{ top: '25%', left: '62%' }"
          >
            <OkuAlertDialogTitle class="alert-dialog-title">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert-dialog-description">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert-dialog-action">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert-dialog-cancel">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>
    </div>

    <div>
      <h1>Controlled with reordered parts</h1>
      <h2>Closed</h2>
      <OkuAlertDialog :open="false">
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="alert-dialog-overlay" />
          <OkuAlertDialogContent class="alert-dialog-chromaticContent">
            <OkuAlertDialogTitle class="alert-dialog-title">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert-dialog-description">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert-dialog-action">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert-dialog-cancel">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
        <OkuAlertDialogTrigger class="alert-dialog-trigger">
          delete everything
        </OkuAlertDialogTrigger>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog open>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay
            class="alert-dialog-overlay"
            :style="{ left: '75%', bottom: '50%', width: '25%' }"
          />
          <OkuAlertDialogContent
            class="alert-dialog-chromaticContent"
            :style="{ top: '25%', left: '88%' }"
          >
            <OkuAlertDialogTitle class="alert-dialog-title">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert-dialog-description">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert-dialog-action">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert-dialog-cancel">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>
    </div>

    <div>
      <h1>State attributes</h1>
      <h2>Closed</h2>

      <OkuAlertDialog :open="false">
        <OkuAlertDialogTrigger class="alert-dialog-triggerAttr">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="alert-dialog-overlayAttr" />
          <OkuAlertDialogContent class="alert-dialog-contentAttr">
            <OkuAlertDialogTitle class="alert-dialog-titleAttr">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert-dialog-descriptionAttr">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert-dialog-actionAttr">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert-dialog-cancelAttr">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog open>
        <OkuAlertDialogTrigger class="alert-dialog-triggerAttr">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="alert-dialog-overlayAttr" :style="{ top: '50%' }" />
          <OkuAlertDialogContent class="alert-dialog-contentAttr" :style="{ top: '75%' }">
            <OkuAlertDialogTitle class="alert-dialog-titleAttr">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert-dialog-descriptionAttr">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert-dialog-actionAttr">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert-dialog-cancelAttr">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>
    </div>
  </div>
</template>
