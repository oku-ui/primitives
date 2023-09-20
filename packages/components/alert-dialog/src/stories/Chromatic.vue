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
        <OkuAlertDialogTrigger class="alert_dialog_triggerClass">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="alert_dialog_overlayClass" />
          <OkuAlertDialogContent class="alert_dialog_chromaticContentClass">
            <OkuAlertDialogTitle class="alert_dialog_titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert_dialog_descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert_dialog_actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert_dialog_cancelClass">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog default-open>
        <OkuAlertDialogTrigger class="alert_dialog_triggerClass">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay
            class="alert_dialog_overlayClass"
            :style="{ left: '0px', bottom: '50%', width: '25%' }"
          />
          <OkuAlertDialogContent
            class="alert_dialog_chromaticContentClass"
            :style="{ top: '25%', left: '12%' }"
          >
            <OkuAlertDialogTitle class="alert_dialog_titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert_dialog_descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert_dialog_actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert_dialog_cancelClass">
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
          <OkuAlertDialogOverlay class="alert_dialog_overlayClass" />
          <OkuAlertDialogContent class="alert_dialog_chromaticContentClass">
            <OkuAlertDialogTitle class="alert_dialog_titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert_dialog_descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert_dialog_actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert_dialog_cancelClass">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
        <OkuAlertDialogTrigger class="alert_dialog_triggerClass">
          delete everything
        </OkuAlertDialogTrigger>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog default-open>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay
            class="alert_dialog_overlayClass"
            :style="{ left: '25%', bottom: '50%', width: '25%' }"
          />
          <OkuAlertDialogContent
            class="alert_dialog_chromaticContentClass"
            :style="{ top: '25%', left: '37%' }"
          >
            <OkuAlertDialogTitle class="alert_dialog_titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert_dialog_descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert_dialog_actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert_dialog_cancelClass">
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
        <OkuAlertDialogTrigger class="alert_dialog_triggerClass">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="alert_dialog_overlayClass" />
          <OkuAlertDialogContent class="alert_dialog_chromaticContentClass">
            <OkuAlertDialogTitle class="alert_dialog_titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert_dialog_descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert_dialog_actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert_dialog_cancelClass">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog open>
        <OkuAlertDialogTrigger class="alert_dialog_triggerClass">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay
            class="alert_dialog_overlayClass"
            :style="{ left: '50%', bottom: '50%', width: '25%' }"
          />
          <OkuAlertDialogContent
            class="alert_dialog_chromaticContentClass"
            :style="{ top: '25%', left: '62%' }"
          >
            <OkuAlertDialogTitle class="alert_dialog_titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert_dialog_descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert_dialog_actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert_dialog_cancelClass">
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
          <OkuAlertDialogOverlay class="alert_dialog_overlayClass" />
          <OkuAlertDialogContent class="alert_dialog_chromaticContentClass">
            <OkuAlertDialogTitle class="alert_dialog_titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert_dialog_descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert_dialog_actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert_dialog_cancelClass">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
        <OkuAlertDialogTrigger class="alert_dialog_triggerClass">
          delete everything
        </OkuAlertDialogTrigger>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog open>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay
            class="alert_dialog_overlayClass"
            :style="{ left: '75%', bottom: '50%', width: '25%' }"
          />
          <OkuAlertDialogContent
            class="alert_dialog_chromaticContentClass"
            :style="{ top: '25%', left: '88%' }"
          >
            <OkuAlertDialogTitle class="alert_dialog_titleClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert_dialog_descriptionClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert_dialog_actionClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert_dialog_cancelClass">
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
        <OkuAlertDialogTrigger class="alert_dialog_triggerAttrClass">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="alert_dialog_overlayAttrClass" />
          <OkuAlertDialogContent class="alert_dialog_contentAttrClass">
            <OkuAlertDialogTitle class="alert_dialog_titleAttrClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert_dialog_descriptionAttrClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert_dialog_actionAttrClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert_dialog_cancelAttrClass">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>

      <h2>Open</h2>
      <OkuAlertDialog open>
        <OkuAlertDialogTrigger class="alert_dialog_triggerAttrClass">
          delete everything
        </OkuAlertDialogTrigger>
        <OkuAlertDialogPortal>
          <OkuAlertDialogOverlay class="alert_dialog_overlayAttrClass" :style="{ top: '50%' }" />
          <OkuAlertDialogContent class="alert_dialog_contentAttrClass" :style="{ top: '75%' }">
            <OkuAlertDialogTitle class="alert_dialog_titleAttrClass">
              Title
            </OkuAlertDialogTitle>
            <OkuAlertDialogDescription class="alert_dialog_descriptionAttrClass">
              Description
            </OkuAlertDialogDescription>
            <OkuAlertDialogAction class="alert_dialog_actionAttrClass">
              Confirm
            </OkuAlertDialogAction>
            <OkuAlertDialogCancel class="alert_dialog_cancelAttrClass">
              Cancel
            </OkuAlertDialogCancel>
          </OkuAlertDialogContent>
        </OkuAlertDialogPortal>
      </OkuAlertDialog>
    </div>
  </div>
</template>
