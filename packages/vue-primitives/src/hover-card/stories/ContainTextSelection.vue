<script setup lang="ts">
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div
    :style="{
      padding: '50px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    }"
  >
    TODO: floating/ui three
    <div :style="{ display: 'flex', gap: '30px' }">
      <HoverCardRoot>
        <HoverCardTrigger href="/" class="hoverCard_triggerClass">
          single
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent class="hoverCard_animatedContentClass" :side-offset="5">
            <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
            <div :style="{ maxWidth: '400px' }">
              Text selections will be contained within the content. While a selection is active
              the content will not dismiss unless the selection is cleared or an outside
              interaction is performed.
            </div>
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCardRoot>

      <HoverCardRoot>
        <HoverCardTrigger href="/" class="hoverCard_triggerClass">
          nested
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent class="hoverCard_animatedContentClass" :side-offset="5">
            <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
            <div :style="{ maxWidth: '400px' }">
              Text selections will be contained within the content. While a selection is active
              the content will not dismiss unless the selection is cleared or an outside
              interaction is performed.
            </div>

            <HoverCardRoot>
              <HoverCardTrigger href="/" class="hoverCard_triggerClass">
                nested trigger
              </HoverCardTrigger>
              <!-- <HoverCardPortal> -->
              <HoverCardContent
                class="hoverCard_animatedContentClass"
                :side-offset="5"
                :style="{ backgroundColor: 'crimson' }"
              >
                <HoverCardArrow
                  class="hoverCard_arrowClass"
                  :width="20"
                  :height="10"
                  :style="{ fill: 'crimson' }"
                />
                <div :style="{ maxWidth: '400px' }">
                  Text selections will be contained within the content. While a selection is
                  active the content will not dismiss unless the selection is cleared or an
                  outside interaction is performed.
                </div>

                <HoverCardRoot>
                  <HoverCardTrigger href="/" class="hoverCard_triggerClass">
                    nested trigger
                  </HoverCardTrigger>
                  <!-- <HoverCardPortal> -->
                  <HoverCardContent
                    class="hoverCard_animatedContentClass"
                    :side-offset="5"
                    :style="{ backgroundColor: 'green' }"
                  >
                    <HoverCardArrow
                      class="hoverCard_arrowClass"
                      :width="20"
                      :height="10"
                      :style="{ fill: 'green' }"
                    />
                    <div :style="{ maxWidth: '400px' }">
                      Text selections will be contained within the content. While a selection
                      is active the content will not dismiss unless the selection is cleared
                      or an outside interaction is performed.
                    </div>
                  </HoverCardContent>
                  <!-- </HoverCardPortal> -->
                </HoverCardRoot>
              </HoverCardContent>
              <!-- </HoverCardPortal> -->
            </HoverCardRoot>
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCardRoot>
    </div>
    <div :style="{ maxWidth: '800px' }">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat mattis malesuada.
        Fusce elementum vulputate aliquet. Integer fringilla porta eros. Ut ultricies mattis nisi.
        Sed et tempor massa. Sed non arcu ut velit scelerisque bibendum tempor sed mi. In non
        consequat sapien. Donec sollicitudin eget tellus ut venenatis. Donec posuere sem ante, nec
        iaculis arcu varius sit amet. Praesent non tortor quam. Curabitur dapibus justo a commodo
        ornare.
      </p>
      <p>
        Suspendisse eleifend consequat iaculis. Nunc bibendum velit felis, nec vulputate purus
        egestas quis. Integer mauris dui, pulvinar non metus id, tristique dignissim elit. Vivamus
        massa tellus, porttitor id lorem non, molestie aliquam dolor. Pellentesque erat quam,
        pellentesque non metus id, tempus sagittis massa.
      </p>
      <p>
        Sed at elementum sem, non venenatis leo. Ut vulputate consectetur finibus. Sed nunc
        lectus, accumsan in nisl et, vehicula pretium nisi. Vivamus vestibulum ante quis urna
        consequat, ultrices condimentum sem commodo. Pellentesque eget orci laoreet, feugiat purus
        sed, maximus nisi. Suspendisse commodo venenatis facilisis.
      </p>
    </div>
  </div>
</template>
