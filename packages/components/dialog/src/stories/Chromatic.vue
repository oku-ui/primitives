<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <div>
    <div
      style="
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      height: 50vh;"
    >
      <div>
        <h1>Uncontrolled</h1>
        <h2>Closed</h2>
        <OkuDialog>
          <OkuDialogTrigger class="dialog_triggerClass">
            open
          </OkuDialogTrigger>
          <OkuDialogPortal>
            <OkuDialogOverlay class="dialog_overlayClass" />
            <OkuDialogContent class="dialog_chromaticContentClass">
              <OkuDialogTitle>
                Title
              </OkuDialogTitle>
              <OkuDialogDescription>
                Description
              </OkuDialogDescription>
              <OkuDialogClose class="dialog_closeClass">
                close
              </OkuDialogClose>
            </OkuDialogContent>
          </OkuDialogPortal>
        </OkuDialog>

        <h2>Open</h2>
        <OkuDialog :default-open="true">
          <OkuDialogTrigger class="dialog_triggerClass">
            open
          </OkuDialogTrigger>
          <OkuDialogPortal>
            <OkuDialogOverlay
              class="dialog_overlayClass" style=" left: 0; bottom: 50%; width: 25%
            ;"
            />
            <OkuDialogContent class="dialog_chromaticContentClass" style="top: 25%; left:12%;">
              <OkuDialogTitle>
                Title
              </OkuDialogTitle>
              <OkuDialogDescription>
                Description
              </OkuDialogDescription>
              <OkuDialogClose class="dialog_closeClass">
                close
              </OkuDialogClose>
            </OkuDialogContent>
          </OkuDialogPortal>
        </OkuDialog>
      </div>
      <div>
        <h1>Uncontrolled with reordered parts</h1>
        <h2>Closed</h2>
        <OkuDialog>
          <OkuDialogPortal>
            <OkuDialogOverlay class="dialog_overlayClass" />
            <OkuDialogContent class="dialog_chromaticContentClass">
              <OkuDialogTitle>
                Title
              </OkuDialogTitle>
              <OkuDialogDescription>
                Description
              </OkuDialogDescription>
              <OkuDialogClose class="dialog_closeClass">
                close
              </OkuDialogClose>
            </OkuDialogContent>
          </OkuDialogPortal>
          <OkuDialogTrigger class="dialog_triggerClass">
            open
          </OkuDialogTrigger>
        </OkuDialog>

        <h2>Open</h2>
        <OkuDialog :default-open="true">
          <OkuDialogPortal>
            <OkuDialogOverlay
              class="dialog_overlayClass" style=" left: 25%; bottom: 50%; width: 25%
            ;"
            />
            <OkuDialogContent class="dialog_chromaticContentClass" style="top: 25%; left:37%;">
              <OkuDialogTitle>
                Title
              </OkuDialogTitle>
              <OkuDialogDescription>
                Description
              </OkuDialogDescription>
              <OkuDialogClose class="dialog_closeClass">
                close
              </OkuDialogClose>
            </OkuDialogContent>
          </OkuDialogPortal>
          <OkuDialogTrigger class="dialog_triggerClass">
            open
          </OkuDialogTrigger>
        </OkuDialog>
      </div>
      <div>
        <h1>Controlled</h1>
        <h2>Closed</h2>
        <OkuDialog :open="false">
          <OkuDialogTrigger class="dialog_triggerClass">
            open
          </OkuDialogTrigger>
          <OkuDialogPortal>
            <OkuDialogOverlay class="dialog_overlayClass" />
            <OkuDialogContent class="dialog_chromaticContentClass">
              <OkuDialogTitle>
                Title
              </OkuDialogTitle>
              <OkuDialogDescription>
                Description
              </OkuDialogDescription>
              <OkuDialogClose class="dialog_closeClass">
                close
              </OkuDialogClose>
            </OkuDialogContent>
          </OkuDialogPortal>
        </OkuDialog>

        <h2>Open</h2>
        <OkuDialog :open="true">
          <OkuDialogTrigger class="dialog_triggerClass">
            open
          </OkuDialogTrigger>
          <OkuDialogPortal>
            <OkuDialogOverlay
              class="dialog_overlayClass" style=" left: 50%; bottom: 50%; width: 25%
            ;"
            />
            <OkuDialogContent class="dialog_chromaticContentClass" style="top: 25%; left:62%;">
              <OkuDialogTitle>
                Title
              </OkuDialogTitle>
              <OkuDialogDescription>
                Description
              </OkuDialogDescription>
              <OkuDialogClose class="dialog_closeClass">
                close
              </OkuDialogClose>
            </OkuDialogContent>
          </OkuDialogPortal>
        </OkuDialog>
      </div>
      <div>
        <h1>Controlled with reordered parts</h1>
        <h2>Closed</h2>
        <OkuDialog :open="false">
          <OkuDialogPortal>
            <OkuDialogOverlay class="dialog_overlayClass" />
            <OkuDialogContent class="dialog_chromaticContentClass">
              <OkuDialogTitle>
                Title
              </OkuDialogTitle>
              <OkuDialogDescription>
                Description
              </OkuDialogDescription>
              <OkuDialogClose class="dialog_closeClass">
                close
              </OkuDialogClose>
            </OkuDialogContent>
          </OkuDialogPortal>
          <OkuDialogTrigger class="dialog_triggerClass">
            open
          </OkuDialogTrigger>
        </OkuDialog>

        <h2>Open</h2>
        <OkuDialog :open="true">
          <OkuDialogPortal>
            <OkuDialogOverlay
              class="dialog_overlayClass" style=" left: 75%; bottom: 50%; width: 25%
            ;"
            />
            <OkuDialogContent class="dialog_chromaticContentClass" style="top: 25%; left:88%;">
              <OkuDialogTitle>
                Title
              </OkuDialogTitle>
              <OkuDialogDescription>
                Description
              </OkuDialogDescription>
              <OkuDialogClose class="dialog_closeClass">
                close
              </OkuDialogClose>
            </OkuDialogContent>
          </OkuDialogPortal>
          <OkuDialogTrigger class="dialog_triggerClass">
            open
          </OkuDialogTrigger>
        </OkuDialog>
      </div>
    </div>
    <div
      style="
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        height: 50vh;"
    >
      <div>
        <h1>Forced mount</h1>
        <OkuDialog>
          <OkuDialogTrigger class="dialog_triggerClass">
            open
          </OkuDialogTrigger>
          <OkuDialogPortal :force-mount="true">
            <OkuDialogOverlay
              class="dialog_overlayClass" style="
                top: 50%;
                background-color: rgba(0, 0, 0, 0.3);
              "
            />
            <OkuDialogContent
              class="dialog_chromaticContentClass"
              style="left: 25%; top: 75%;"
            >
              <OkuDialogTitle>
                Title
              </OkuDialogTitle>
              <OkuDialogDescription>
                Description
              </OkuDialogDescription>
              <OkuDialogClose class="dialog_closeClass">
                close
              </OkuDialogClose>
            </OkuDialogContent>
          </OkuDialogPortal>
        </OkuDialog>
      </div>
      <div>
        <h1>State attributes</h1>
        <h2>Closed</h2>
        <OkuDialog>
          <OkuDialogTrigger class="dialog_triggerAttrClass">
            open
          </OkuDialogTrigger>
          <OkuDialogPortal>
            <OkuDialogOverlay
              class="dialog_overlayAttrClass"
            />
            <OkuDialogContent
              class="dialog_contentAttrClass"
            >
              <OkuDialogTitle>
                Title
              </OkuDialogTitle>
              <OkuDialogDescription>
                Description
              </OkuDialogDescription>
              <OkuDialogClose class="dialog_closeAttrClass">
                close
              </OkuDialogClose>
            </OkuDialogContent>
          </OkuDialogPortal>
        </OkuDialog>

        <h2>Open</h2>
        <OkuDialog :default-open="true">
          <OkuDialogTrigger class="dialog_triggerAttrClass">
            open
          </OkuDialogTrigger>
          <OkuDialogPortal>
            <OkuDialogOverlay
              class="dialog_overlayAttrClass" style="left: 50%;top: 50%;"
            />
            <OkuDialogContent
              class="dialog_contentAttrClass" style="left: 75%;top: 75%;"
            >
              <OkuDialogTitle>
                Title
              </OkuDialogTitle>
              <OkuDialogDescription>
                Description
              </OkuDialogDescription>
              <OkuDialogClose class="dialog_closeAttrClass">
                close
              </OkuDialogClose>
            </OkuDialogContent>
          </OkuDialogPortal>
        </OkuDialog>
      </div>
      />
    </div>
  </div>
</template>
