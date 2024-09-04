<script setup lang="ts">
import './styles.css'
import { PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from '../index.ts'
import { ALIGN_OPTIONS, SIDE_OPTIONS } from '../../popper/PopperContent.ts'

const SIDES = SIDE_OPTIONS.filter(side => side !== 'bottom').concat(['bottom'] as any)

function preventDefault(event: Event) {
  event.preventDefault()
}
</script>

<template>
  <div :style="{ padding: '200px', paddingBottom: '500px' }">
    <h1>Uncontrolled</h1>
    <h2>Closed</h2>

    <PopoverRoot>
      <PopoverTrigger class="popover_triggerClass">
        open
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent class="popover_contentClass" :side-offset="5">
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <h2>Open</h2>
    <PopoverRoot default-open>
      <PopoverTrigger class="popover_triggerClass">
        open
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          class="popover_contentClass"
          :side-offset="5"
          @focus-outside="preventDefault"
        >
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <h2 :style="{ marginTop: 100 }">
      Open with reordered parts
    </h2>
    <PopoverRoot default-open>
      <PopoverPortal>
        <PopoverContent
          class="popover_contentClass"
          :side-offset="5"
          @focus-outside="preventDefault"
        >
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>

      <PopoverTrigger class="popover_triggerClass">
        open
      </PopoverTrigger>
    </PopoverRoot>

    <h1 :style="{ marginTop: 100 }">
      Controlled
    </h1>
    <h2>Closed</h2>
    <PopoverRoot :open="false">
      <PopoverTrigger class="popover_triggerClass">
        open
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          class="popover_contentClass"
          :side-offset="5"
        >
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <h2>Open</h2>
    <PopoverRoot open>
      <PopoverTrigger class="popover_triggerClass">
        open
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          class="popover_contentClass"
          :side-offset="5"
        >
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <h2 :style="{ marginTop: '100px' }">
      Open with reordered parts
    </h2>
    <PopoverRoot open>
      <PopoverPortal>
        <PopoverContent
          class="popover_contentClass"
          :side-offset="5"
        >
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
      <PopoverTrigger class="popover_triggerClass">
        open
      </PopoverTrigger>
    </PopoverRoot>

    <h2 :style="{ marginTop: '100px' }">
      Force mounted content
    </h2>
    <PopoverRoot>
      <PopoverTrigger class="popover_triggerClass">
        open
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          class="popover_contentClass"
          :side-offset="5"
          force-mount
        >
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <h1 :style="{ marginTop: '100px' }">
      Anchor
    </h1>
    <h2>Controlled</h2>
    <PopoverRoot open>
      <PopoverAnchor :style="{ padding: '20px', background: 'gainsboro' }">
        <PopoverTrigger class="popover_triggerClass">
          open
        </PopoverTrigger>
      </PopoverAnchor>

      <PopoverPortal>
        <PopoverContent
          class="popover_contentClass"
          :side-offset="5"
        >
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <h2>Uncontrolled</h2>
    <PopoverRoot default-open>
      <PopoverAnchor :style="{ padding: '20px', background: 'gainsboro' }">
        <PopoverTrigger class="popover_triggerClass">
          open
        </PopoverTrigger>
      </PopoverAnchor>

      <PopoverPortal>
        <PopoverContent
          class="popover_contentClass"
          :side-offset="5"
          @focus-outside="preventDefault"
        >
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <h1 :style="{ marginTop: '100px' }">
      Positioning
    </h1>
    <h2>No collisions</h2>
    <h3>Side & Align</h3>

    <div class="popover_gridClass">
      <template v-for="side in SIDES">
        <PopoverRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
          <PopoverTrigger class="popover_chromaticTriggerClass" />

          <PopoverPortal>
            <PopoverContent
              class="popover_chromaticContentClass"
              :side="side"
              :align="align"
              :avoid-collisions="false"
            >
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <PopoverArrow class="popover_chromaticArrowClass" :width="20" :height="10" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      </template>
    </div>

    <h3>Side offset</h3>
    <h4>Positive</h4>

    <div class="popover_gridClass">
      <template v-for="side in SIDES">
        <PopoverRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
          <PopoverTrigger class="popover_chromaticTriggerClass" />

          <PopoverPortal>
            <PopoverContent
              class="popover_chromaticContentClass"
              :side="side"
              :side-offset="5"
              :align="align"
              :avoid-collisions="false"
            >
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <PopoverArrow class="popover_chromaticArrowClass" :width="20" :height="10" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      </template>
    </div>

    <h4>Negative</h4>
    <div class="popover_gridClass">
      <template v-for="side in SIDES">
        <PopoverRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
          <PopoverTrigger class="popover_chromaticTriggerClass" />

          <PopoverPortal>
            <PopoverContent
              class="popover_chromaticContentClass"
              :side="side"
              :side-offset="-10"
              :align="align"
              :avoid-collisions="false"
            >
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <PopoverArrow class="popover_chromaticArrowClass" :width="20" :height="10" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      </template>
    </div>

    <h3>Align offset</h3>
    <h4>Positive</h4>
    <div class="popover_gridClass">
      <template v-for="side in SIDES">
        <PopoverRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
          <PopoverTrigger class="popover_chromaticTriggerClass" />

          <PopoverPortal>
            <PopoverContent
              class="popover_chromaticContentClass"
              :side="side"
              :align="align"
              :align-offset="20"
              :avoid-collisions="false"
            >
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <PopoverArrow class="popover_chromaticArrowClass" :width="20" :height="10" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      </template>
    </div>

    <h4>Negative</h4>
    <div class="popover_gridClass">
      <template v-for="side in SIDES">
        <PopoverRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
          <PopoverTrigger class="popover_chromaticTriggerClass" />

          <PopoverPortal>
            <PopoverContent
              class="popover_chromaticContentClass"
              :side="side"
              :align="align"
              :align-offset="-10"
              :avoid-collisions="false"
            >
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <PopoverArrow class="popover_chromaticArrowClass" :width="20" :height="10" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      </template>
    </div>

    <h2>Collisions</h2>
    <p>See instances on the periphery of the page.</p>
    <template v-for="side in SIDES">
      <PopoverRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
        <PopoverTrigger
          class="popover_chromaticTriggerClass"
          :style="{
            position: 'absolute',
            [side]: '10px',
            ...((side === 'right' || side === 'left')
              && (align === 'start'
                ? { bottom: '10px' }
                : align === 'center'
                  ? { top: 'calc(50% - 15px)' }
                  : { top: '10px' })),
            ...((side === 'top' || side === 'bottom' as any)
              && (align === 'start'
                ? { right: '10px' }
                : align === 'center'
                  ? { left: 'calc(50% - 15px)' }
                  : { left: '10px' })),
          }"
        />

        <PopoverPortal>
          <PopoverContent
            class="popover_chromaticContentClass"
            :side="side"
            :align="align"
          >
            <p :style="{ textAlign: 'center' }">
              {{ side }}
              <br>
              {{ align }}
            </p>
            <PopoverArrow class="popover_chromaticArrowClass" :width="20" :height="10" />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </template>

    <h2>Relative parent (non-portalled)</h2>
    <div :style="{ position: 'relative' }">
      <PopoverRoot open>
        <PopoverTrigger as="template">
          <button class="popover_triggerClass">
            open
          </button>
        </PopoverTrigger>

        <PopoverContent class="popover_contentClass" :side-offset="5">
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" :offset="10" />
        </PopoverContent>
      </PopoverRoot>
    </div>

    <h1 :style="{ marginTop: '100px' }">
      With slotted trigger
    </h1>
    <PopoverRoot open>
      <PopoverTrigger as="template">
        <button class="popover_triggerClass">
          open
        </button>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent class="popover_contentClass" :side-offset="5">
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" :offset="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <h1 :style="{ marginTop: '100px' }">
      State attributes
    </h1>
    <h2>Closed</h2>
    <PopoverRoot :open="false">
      <PopoverTrigger class="popover_triggerAttrClass">
        open
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent class="popover_contentAttrClass" :side-offset="5" :avoid-collisions="false">
          <PopoverClose class="popover_closeAttrClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowAttrClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <h2>Open</h2>
    <PopoverRoot open>
      <PopoverTrigger class="popover_triggerAttrClass">
        open
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          class="popover_contentAttrClass"
          side="right"
          :side-offset="5"
          :avoid-collisions="false"
        >
          <PopoverClose class="popover_closeAttrClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowAttrClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
