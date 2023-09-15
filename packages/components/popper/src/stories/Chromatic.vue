<script setup lang="ts">
import {
  OkuPopper,
  OkuPopperAnchor,
  OkuPopperArrow,
  OkuPopperContent,
} from '@oku-ui/popper'
import { ref } from 'vue'
import { OkuPortal } from '@oku-ui/portal'

const scrollContainer1 = ref<HTMLDivElement | null>(null)
const scrollContainer2 = ref<HTMLDivElement | null>(null)
</script>

<template>
  <div
    :style="{
      paddingBottom: '500px',
    }"
  >
    <header
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '150px',

        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,

        backgroundColor: 'grey',
        border: '1px solid black',

      }"
    >
      <h1>In fixed header</h1>
      <OkuPopper>
        <OkuPopperAnchor class="anchorClass small">
          1
        </OkuPopperAnchor>
        <OkuPopperContent class="contentClass small" :side-offset="5">
          <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
          1
        </OkuPopperContent>
      </OkuPopper>

      <OkuPopper>
        <OkuPopperAnchor class="anchorClass small">
          2
        </OkuPopperAnchor>
        <OkuPortal>
          <OkuPopperContent class="contentClass small" :side-offset="5">
            <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
            2 (portalled)
          </OkuPopperContent>
        </OkuPortal>
      </OkuPopper>
    </header>

    <div
      :style="{
        marginTop: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '150px',
        border: '1px solid black',
      }"
    >
      <h1>In normal page flow</h1>
      <OkuPopper>
        <OkuPopperAnchor class="anchorClass small">
          3
        </OkuPopperAnchor>
        <OkuPopperContent class="contentClass small" :side-offset="5">
          <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
          3
        </OkuPopperContent>
      </OkuPopper>

      <OkuPopper>
        <OkuPopperAnchor class="anchorClass small">
          4
        </OkuPopperAnchor>
        <OkuPortal>
          <OkuPopperContent class="contentClass small" :side-offset="5">
            <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
            4 (portalled)
          </OkuPopperContent>
        </OkuPortal>
      </OkuPopper>
    </div>

    <div
      :style="{
        position: 'relative',
        marginTop: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '150px',
        border: '1px solid black',
      }"
    >
      <h1>In relative parent</h1>
      <OkuPopper>
        <OkuPopperAnchor class="anchorClass small">
          5
        </OkuPopperAnchor>
        <OkuPopperContent class="contentClass small" :side-offset="5">
          <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
          5
        </OkuPopperContent>
      </OkuPopper>

      <OkuPopper>
        <OkuPopperAnchor class="anchorClass small">
          6
        </OkuPopperAnchor>
        <OkuPortal>
          <OkuPopperContent class="contentClass small" :side-offset="5">
            <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
            6 (portalled)
          </OkuPopperContent>
        </OkuPortal>
      </OkuPopper>
    </div>

    <div
      :style="{
        marginTop: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '150px',
        border: '1px solid black',
        transform: 'translate3d(100px, 0, 0)',
      }"
    >
      <h1>In translated parent</h1>
      <OkuPopper>
        <OkuPopperAnchor class="anchorClass small">
          7
        </OkuPopperAnchor>
        <OkuPopperContent class="contentClass small" :side-offset="5">
          <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
          7
        </OkuPopperContent>
      </OkuPopper>

      <OkuPopper>
        <OkuPopperAnchor class="anchorClass small">
          8
        </OkuPopperAnchor>
        <OkuPortal>
          <OkuPopperContent class="contentClass small" :side-offset="5">
            <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
            8 (portalled)
          </OkuPopperContent>
        </OkuPortal>
      </OkuPopper>
    </div>

    <div
      :style="{
        display: 'flex',
        gap: '100px',
      }"
    >
      <div>
        <h1>In scrolling container</h1>
        <div
          ref="scrollContainer1"
          :style="{
            width: '400px',
            height: '600px',
            overflow: 'auto',
            border: '1px solid black',
          }"
        >
          <div
            :style="{
              height: '2000px',
            }"
          >
            <div
              v-for="(_, i) in 10"
              :key="i"
              :style="{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '150px',
                paddingBottom: '100px',
              }"
            >
              <OkuPopper>
                <OkuPopperAnchor class="anchorClass small">
                  9.{{ i + 1 }}
                </OkuPopperAnchor>
                <OkuPopperContent
                  class="contentClass small"
                  :side-offset="5"
                  hide-when-detached
                  :collision-boundary="scrollContainer1"
                >
                  <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
                  9.{{ i + 1 }}
                </OkuPopperContent>
              </OkuPopper>

              <OkuPopper>
                <OkuPopperAnchor class="anchorClass small">
                  10.{{ i + 1 }}
                </OkuPopperAnchor>
                <OkuPortal>
                  <OkuPopperContent
                    class="contentClass small"
                    :side-offset="5"
                    hide-when-detached
                    :collision-boundary="scrollContainer1"
                  >
                    <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
                    10.{{ i + 1 }} (portalled)
                  </OkuPopperContent>
                </OkuPortal>
              </OkuPopper>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1>With position sticky</h1>
        <div
          ref="scrollContainer2"
          :style="{
            width: '400px',
            height: '600px',
            overflow: 'auto',
            border: '1px solid black',
          }"
        >
          <div
            :style="{
              height: '2000px',
            }"
          >
            <div
              v-for="(_, i) in 10"
              :key="i"
              :style="{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '150px',
                paddingBottom: '100px',
                position: 'sticky',
                top: 0,
              }"
            >
              <OkuPopper>
                <OkuPopperAnchor class="anchorClass small">
                  9.{{ i + 1 }}
                </OkuPopperAnchor>
                <OkuPopperContent
                  class="contentClass small"
                  :side-offset="5"
                  hide-when-detached
                  :collision-boundary="scrollContainer2"
                >
                  <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
                  9.{{ i + 1 }}
                </OkuPopperContent>
              </OkuPopper>

              <OkuPopper>
                <OkuPopperAnchor class="anchorClass small">
                  10.{{ i + 1 }}
                </OkuPopperAnchor>
                <OkuPortal>
                  <OkuPopperContent
                    class="contentClass small"
                    :side-offset="5"
                    hide-when-detached
                    :collision-boundary="scrollContainer2"
                  >
                    <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
                    10.{{ i + 1 }} (portalled)
                  </OkuPopperContent>
                </OkuPortal>
              </OkuPopper>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      :style="{
        marginTop: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '150px',
        border: '1px solid black',
      }"
    >
      <h1>Logical &quot;start&quot; alignment (LTR)</h1>
      <OkuPopper>
        <OkuPopperAnchor class="anchorClass small">
          11
        </OkuPopperAnchor>
        <OkuPopperContent class="contentClass small" :side-offset="5" align="start">
          <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
          11
        </OkuPopperContent>
      </OkuPopper>

      <OkuPopper>
        <OkuPopperAnchor class="anchorClass small">
          12
        </OkuPopperAnchor>
        <OkuPortal>
          <OkuPopperContent class="contentClass small" :side-offset="5" align="start">
            <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
            12 (portalled)
          </OkuPopperContent>
        </OkuPortal>
      </OkuPopper>
    </div>

    <div
      :style="{
        marginTop: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '150px',
        border: '1px solid black',
      }"
    >
      <h1>Logical &quot;start&quot; alignment (RTL)</h1>
      <OkuPopper>
        <OkuPopperAnchor class="anchorClass small">
          13
        </OkuPopperAnchor>
        <OkuPopperContent class="contentClass small" :side-offset="5" align="start" dir="rtl">
          <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
          13
        </OkuPopperContent>
      </OkuPopper>

      <OkuPopper>
        <OkuPopperAnchor class="anchorClass small">
          14
        </OkuPopperAnchor>
        <OkuPortal>
          <OkuPopperContent class="contentClass small" :side-offset="5" align="start" dir="rtl">
            <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
            14 (portalled)
          </OkuPopperContent>
        </OkuPortal>
      </OkuPopper>
    </div>
  </div>
</template>
