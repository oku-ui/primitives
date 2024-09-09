<script setup lang="ts">
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from '../index.ts'
import './styles.css'

const SIDE_OPTIONS = ['top', 'right', 'bottom', 'left']
const ALIGN_OPTIONS = ['start', 'center', 'end']

const SIDES = SIDE_OPTIONS.filter(side => side !== 'bottom').concat(['bottom'])
</script>

<template>
  <div :style="{ padding: '200px', paddingBottom: '500px' }">
    <h1>Uncontrolled</h1>
    <h2>Closed</h2>
    <HoverCardRoot>
      <HoverCardTrigger class="hoverCard_triggerClass">
        open
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
          <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
          Some content
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>

    <h2>Open</h2>
    <HoverCardRoot default-open>
      <HoverCardTrigger class="hoverCard_triggerClass">
        open
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
          <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
          Some content
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>

    <h2 :style="{ marginTop: '60px' }">
      Open with reordered parts
    </h2>
    <HoverCardRoot default-open>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
          Some content
          <HoverCardArrow class="hoverCard_arrowClass" offset="{10}" />
        </HoverCardContent>
      </HoverCardPortal>
      <HoverCardTrigger class="hoverCard_triggerClass">
        open
      </HoverCardTrigger>
    </HoverCardRoot>

    <h1 :style="{ marginTop: '100px' }">
      Controlled
    </h1>
    <h2>Closed</h2>
    <HoverCardRoot :open="false">
      <HoverCardTrigger class="hoverCard_triggerClass">
        open
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
          <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
          Some content
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>

    <h2>Open</h2>
    <HoverCardRoot open>
      <HoverCardTrigger class="hoverCard_triggerClass">
        open
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
          <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
          Some content
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>

    <h2 :style="{ marginTop: '60px' }">
      Open with reordered parts
    </h2>
    <HoverCardRoot open>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
          Some content
          <HoverCardArrow class="hoverCard_arrowClass" offset="{10}" />
        </HoverCardContent>
      </HoverCardPortal>
      <HoverCardTrigger class="hoverCard_triggerClass">
        open
      </HoverCardTrigger>
    </HoverCardRoot>

    <h1 :style="{ marginTop: '100px' }">
      Force mounted content
    </h1>
    <HoverCardRoot>
      <HoverCardTrigger class="hoverCard_triggerClass">
        open
      </HoverCardTrigger>
      <HoverCardPortal force-mount>
        <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
          <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
          Some content
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>

    <h1 :style="{ marginTop: '100px' }">
      Positioning
    </h1>
    <h2>No collisions</h2>
    <h3>Side & Align</h3>
    <div class="hoverCard_gridClass">
      <template v-for="side in SIDES" :key="side">
        <HoverCardRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
          <HoverCardTrigger class="hoverCard_chromaticTriggerClass" />
          <HoverCardPortal>
            <HoverCardContent
              class="hoverCard_chromaticContentClass"
              :side="side"
              :align="align"
              :avoid-collisions="false"
            >
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <HoverCardArrow class="hoverCard_chromaticArrowClass" :width="20" :height="10" />
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCardRoot>
      </template>
    </div>

    <h3>Side offset</h3>
    <h4>Positive</h4>
    <div class="hoverCard_gridClass">
      <template v-for="side in SIDES" :key="side">
        <HoverCardRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
          <HoverCardTrigger class="hoverCard_chromaticTriggerClass" />
          <HoverCardPortal>
            <HoverCardContent
              class="hoverCard_chromaticContentClass"
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
              <HoverCardArrow class="hoverCard_chromaticArrowClass" :width="20" :height="10" />
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCardRoot>
      </template>
    </div>
    <h4>Negative</h4>
    <div class="hoverCard_gridClass">
      <template v-for="side in SIDES" :key="side">
        <HoverCardRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
          <HoverCardTrigger class="hoverCard_chromaticTriggerClass" />
          <HoverCardPortal>
            <HoverCardContent
              class="hoverCard_chromaticContentClass"
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
              <HoverCardArrow class="hoverCard_chromaticArrowClass" :width="20" :height="10" />
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCardRoot>
      </template>
    </div>

    <h3>Align offset</h3>
    <h4>Positive</h4>
    <div class="hoverCard_gridClass">
      <template v-for="side in SIDES" :key="side">
        <HoverCardRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
          <HoverCardTrigger class="hoverCard_chromaticTriggerClass" />
          <HoverCardPortal>
            <HoverCardContent
              class="hoverCard_chromaticContentClass"
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
              <HoverCardArrow class="hoverCard_chromaticArrowClass" :width="20" :height="10" />
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCardRoot>
      </template>
    </div>
    <h4>Negative</h4>
    <div class="hoverCard_gridClass">
      <template v-for="side in SIDES" :key="side">
        <HoverCardRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
          <HoverCardTrigger class="hoverCard_chromaticTriggerClass" />
          <HoverCardPortal>
            <HoverCardContent
              class="hoverCard_chromaticContentClass"
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
              <HoverCardArrow class="hoverCard_chromaticArrowClass" :width="20" :height="10" />
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCardRoot>
      </template>
    </div>

    <h2>Collisions</h2>
    <p>See instances on the periphery of the page.</p>
    <template v-for="side in SIDES" :key="side">
      <HoverCardRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
        <HoverCardTrigger
          class="hoverCard_chromaticTriggerClass"
          :style="{
            position: 'absolute',
            [side]: '10px',
            ...((side === 'right' || side === 'left')
              && (align === 'start'
                ? { bottom: '10px' }
                : align === 'center'
                  ? { top: 'calc(50% - 15px)' }
                  : { top: '10px' })),
            ...((side === 'top' || side === 'bottom')
              && (align === 'start'
                ? { right: '10px' }
                : align === 'center'
                  ? { left: 'calc(50% - 15px)' }
                  : { left: '10px' })),
          }"
        />
        <HoverCardPortal>
          <HoverCardContent class="hoverCard_chromaticContentClass" :side="side" :align="align">
            <p :style="{ textAlign: 'center' }">
              {{ side }}
              <br>
              {{ align }}
            </p>
            <HoverCardArrow class="hoverCard_chromaticArrowClass" :width="20" :height="10" />
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCardRoot>
    </template>

    <h2>Relative parent (non-portalled)</h2>
    <div :style="{ position: 'relative' }">
      <HoverCardRoot open>
        <HoverCardTrigger href="/" class="hoverCard_triggerClass">
          trigger
        </HoverCardTrigger>
        <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
          <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
          Some content
        </HoverCardContent>
      </HoverCardRoot>
    </div>

    <h1 :style="{ marginTop: '100px' }">
      With slotted trigger
    </h1>
    <HoverCardRoot open>
      <HoverCardTrigger as="template">
        <button class="hoverCard_triggerClass">
          open
        </button>
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
          <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" offset="{10}" />
          Some content
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>

    <h1 :style="{ marginTop: '100px' }">
      State attributes
    </h1>
    <h2>Closed</h2>
    <HoverCardRoot :open="false">
      <HoverCardTrigger class="hoverCard_arrowAttrClass">
        open
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentAttrClass" :side-offset="5" :avoid-collisions="false">
          <HoverCardArrow class="hoverCard_arrowAttrClass" :width="20" :height="10" />
          Some content
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>

    <h2>Open</h2>
    <HoverCardRoot open>
      <HoverCardTrigger class="hoverCard_arrowAttrClass">
        open
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent
          class="hoverCard_contentAttrClass"
          side="right"
          :side-offset="5"
          :avoid-collisions="false"
        >
          <HoverCardArrow class="hoverCard_arrowAttrClass" :width="20" :height="10" />
          Some content
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>
  </div>
</template>
