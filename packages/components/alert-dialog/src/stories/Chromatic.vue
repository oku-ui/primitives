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
        <OkuAlertDialogTrigger class="triggerClass">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="overlayClass" />
          <OkuAlertDialogContent class="chromaticContentClass">
            <OkuAlertDialogTitle class="titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="cancelClass">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog default-open>
        <OkuAlertDialogTrigger class="triggerClass">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay
            class="overlayClass"
            :style="{ left: '0px', bottom: '50%', width: '25%' }"
          />
          <OkuAlertDialogContent
            class="chromaticContentClass"
            :style="{ top: '25%', left: '12%' }"
          >
            <OkuAlertDialogTitle class="titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="cancelClass">
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
          <OkuAlertDialogOverlay class="overlayClass" />
          <OkuAlertDialogContent class="chromaticContentClass">
            <OkuAlertDialogTitle class="titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="cancelClass">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
        <OkuAlertDialogTrigger class="triggerClass">
          delete everything
        </OkuAlertDialogTrigger>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog default-open>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay
            class="overlayClass"
            :style="{ left: '25%', bottom: '50%', width: '25%' }"
          />
          <OkuAlertDialogContent
            class="chromaticContentClass"
            :style="{ top: '25%', left: '37%' }"
          >
            <OkuAlertDialogTitle class="titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="cancelClass">
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
        <OkuAlertDialogTrigger class="triggerClass">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="overlayClass" />
          <OkuAlertDialogContent class="chromaticContentClass">
            <OkuAlertDialogTitle class="titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="cancelClass">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog open>
        <OkuAlertDialogTrigger class="triggerClass">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay
            class="overlayClass"
            :style="{ left: '50%', bottom: '50%', width: '25%' }"
          />
          <OkuAlertDialogContent
            class="chromaticContentClass"
            :style="{ top: '25%', left: '62%' }"
          >
            <OkuAlertDialogTitle class="titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="cancelClass">
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
          <OkuAlertDialogOverlay class="overlayClass" />
          <OkuAlertDialogContent class="chromaticContentClass">
            <OkuAlertDialogTitle class="titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="cancelClass">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
        <OkuAlertDialogTrigger class="triggerClass">
          delete everything
        </OkuAlertDialogTrigger>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog open>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay
            class="overlayClass"
            :style="{ left: '75%', bottom: '50%', width: '25%' }"
          />
          <OkuAlertDialogContent
            class="chromaticContentClass"
            :style="{ top: '25%', left: '88%' }"
          >
            <OkuAlertDialogTitle class="titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="cancelClass">
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
        <OkuAlertDialogTrigger class="triggerAttrClass">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="overlayAttrClass" />
          <OkuAlertDialogContent class="contentAttrClass">
            <OkuAlertDialogTitle class="titleAttrClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="descriptionAttrClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="actionAttrClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="cancelAttrClass">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog open>
        <OkuAlertDialogTrigger class="triggerAttrClass">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="overlayAttrClass" :style="{ top: '50%' }" />
          <OkuAlertDialogContent class="contentAttrClass" :style="{ top: '75%' }">
            <OkuAlertDialogTitle class="titleAttrClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="descriptionAttrClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="actionAttrClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="cancelAttrClass">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>
    </div>
  </div>
</template>
