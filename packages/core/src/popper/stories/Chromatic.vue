<script setup lang="ts">
import { shallowRef } from 'vue'
import { Portal } from '../../portal/index.ts'
import { PopperAnchor, PopperArrow, PopperContent, PopperRoot } from '../index.ts'
import './styles.css'

const scrollContainer1 = shallowRef<HTMLDivElement>()
const scrollContainer2 = shallowRef<HTMLDivElement>()
</script>

<template>
  <div :style="{ paddingBottom: '500px' }">
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
      <PopperRoot>
        <PopperAnchor class="popper_anchorClass small">
          1
        </PopperAnchor>
        <PopperContent class="popper_contentClass small" :side-offset="5">
          <PopperArrow class="popper_arrowClass" :width="10" :height="5" />1
        </PopperContent>
      </PopperRoot>

      <PopperRoot>
        <PopperAnchor class="popper_anchorClass small">
          2
        </PopperAnchor>
        <Portal>
          <PopperContent class="popper_contentClass small" :side-offset="5">
            <PopperArrow class="popper_arrowClass" :width="10" :height="5" />2 (portalled)
          </PopperContent>
        </Portal>
      </PopperRoot>
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
      <PopperRoot>
        <PopperAnchor class="popper_anchorClass small">
          3
        </PopperAnchor>
        <PopperContent class="popper_contentClass small" :side-offset="5">
          <PopperArrow class="popper_arrowClass" :width="10" :height="5" />3
        </PopperContent>
      </PopperRoot>

      <PopperRoot>
        <PopperAnchor class="popper_anchorClass small">
          4
        </PopperAnchor>
        <Portal>
          <PopperContent class="popper_contentClass small" :side-offset="5">
            <PopperArrow class="popper_arrowClass" :width="10" :height="5" />4 (portalled)
          </PopperContent>
        </Portal>
      </PopperRoot>
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
      <PopperRoot>
        <PopperAnchor class="popper_anchorClass small">
          5
        </PopperAnchor>
        <PopperContent class="popper_contentClass small" :side-offset="5">
          <PopperArrow class="popper_arrowClass" :width="10" :height="5" />5
        </PopperContent>
      </PopperRoot>

      <PopperRoot>
        <PopperAnchor class="popper_anchorClass small">
          6
        </PopperAnchor>
        <Portal>
          <PopperContent class="popper_contentClass small" :side-offset="5">
            <PopperArrow class="popper_arrowClass" :width="10" :height="5" />6 (portalled)
          </PopperContent>
        </Portal>
      </PopperRoot>
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
      <PopperRoot>
        <PopperAnchor class="popper_anchorClass small">
          7
        </PopperAnchor>
        <PopperContent class="popper_contentClass small" :side-offset="5">
          <PopperArrow class="popper_arrowClass" :width="10" :height="5" />7
        </PopperContent>
      </PopperRoot>

      <PopperRoot>
        <PopperAnchor class="popper_anchorClass small">
          8
        </PopperAnchor>
        <Portal>
          <PopperContent class="popper_contentClass small" :side-offset="5">
            <PopperArrow class="popper_arrowClass" :width="10" :height="5" />8 (portalled)
          </PopperContent>
        </Portal>
      </PopperRoot>
    </div>

    <div :style="{ display: 'flex', gap: '100px' }">
      <div>
        <h1>In scrolling container</h1>
        <div
          ref="scrollContainer1"
          :style="{ width: '400px', height: '600px', overflow: 'auto', border: '1px solid black' }"
        >
          <div :style="{ height: '2000px' }">
            <div
              v-for="i in 10"
              :key="i"
              :style="{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '150px',
                paddingBottom: '100px',
              }"
            >
              <PopperRoot>
                <PopperAnchor class="popper_anchorClass small">
                  9.{{ i + 1 }}
                </PopperAnchor>
                <PopperContent
                  class="popper_contentClass small"
                  :side-offset="5"
                  hide-when-detached
                  :collision-boundary="scrollContainer1"
                >
                  <PopperArrow class="popper_arrowClass" :width="10" :height="5" />
                  9.{{ i + 1 }}
                </PopperContent>
              </PopperRoot>

              <PopperRoot>
                <PopperAnchor class="popper_anchorClass small">
                  10.{{ i + 1 }}
                </PopperAnchor>
                <Portal>
                  <PopperContent
                    class="popper_contentClass small"
                    :side-offset="5"
                    hide-when-detached
                    :collision-boundary="scrollContainer1"
                  >
                    <PopperArrow class="popper_arrowClass" :width="10" :height="5" />
                    10.{{ i + 1 }} (portalled)
                  </PopperContent>
                </Portal>
              </PopperRoot>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1>With position sticky</h1>
        <div
          ref="scrollContainer2"
          :style="{ width: '400px', height: '600px', overflow: 'auto', border: '1px solid black' }"
        >
          <div :style="{ height: '2000px' }">
            <div
              v-for="i in 10"
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
              <PopperRoot>
                <PopperAnchor class="popper_anchorClass small">
                  9.{{ i + 1 }}
                </PopperAnchor>
                <PopperContent
                  class="popper_contentClass small"
                  :side-offset="5"
                  hide-when-detached
                  :collision-boundary="scrollContainer2"
                >
                  <PopperArrow class="popper_arrowClass" :width="10" :height="5" />
                  9.{{ i + 1 }}
                </PopperContent>
              </PopperRoot>

              <PopperRoot>
                <PopperAnchor class="popper_anchorClass small">
                  10.{{ i + 1 }}
                </PopperAnchor>
                <Portal>
                  <PopperContent
                    class="popper_contentClass small"
                    :side-offset="5"
                    hide-when-detached
                    :collision-boundary="scrollContainer2"
                  >
                    <PopperArrow class="popper_arrowClass" :width="10" :height="5" />
                    10.{{ i + 1 }} (portalled)
                  </PopperContent>
                </Portal>
              </PopperRoot>
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
      <h1>Logical "start" alignment (LTR)</h1>
      <PopperRoot>
        <PopperAnchor class="popper_anchorClass small">
          11
        </PopperAnchor>
        <PopperContent align="start" class="popper_contentClass small" :side-offset="5">
          <PopperArrow class="popper_arrowClass" :width="10" :height="5" />
          11
        </PopperContent>
      </PopperRoot>

      <PopperRoot>
        <PopperAnchor class="popper_anchorClass small">
          12
        </PopperAnchor>
        <Portal>
          <PopperContent
            align="start"
            class="popper_contentClass small"
            :side-offset="5"
          >
            <PopperArrow class="popper_arrowClass" :width="10" :height="5" />
            12 (portalled)
          </PopperContent>
        </Portal>
      </PopperRoot>
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
      <h1>Logical "start" alignment (RTL)</h1>
      <PopperRoot>
        <PopperAnchor class="popper_anchorClass small">
          13
        </PopperAnchor>
        <PopperContent
          align="start"
          class="popper_contentClass small"
          :side-offset="5"
          dir="rtl"
        >
          <PopperArrow class="popper_arrowClass" :width="10" :height="5" />
          13
        </PopperContent>
      </PopperRoot>

      <PopperRoot>
        <PopperAnchor class="popper_anchorClass small">
          14
        </PopperAnchor>
        <Portal>
          <PopperContent
            align="start"
            class="popper_contentClass small"
            :side-offset="5"
            dir="rtl"
          >
            <PopperArrow class="popper_arrowClass" :width="10" :height="5" />
            14 (portalled)
          </PopperContent>
        </Portal>
      </PopperRoot>
    </div>
  </div>
</template>
