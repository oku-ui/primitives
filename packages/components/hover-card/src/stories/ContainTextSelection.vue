<script setup lang="ts">
import {
  OkuHoverCard,
  OkuHoverCardArrow,
  OkuHoverCardContent,
  OkuHoverCardPortal,
  OkuHoverCardTrigger,
} from '@oku-ui/hover-card'
</script>

<template>
  <div
    style="
      padding: 50px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    "
  >
    <div style="display: flex; gap: 30px;">
      <OkuHoverCard>
        <OkuHoverCardTrigger href="/" class="hover-card-trigger">
          single
        </OkuHoverCardTrigger>
        <OkuHoverCardPortal>
          <OkuHoverCardContent class="hover-card-animatedContent" :side-offset="5">
            <OkuHoverCardArrow class="hover-card-arrow" :width="20" :height="10" />
            <div style="max-width: 400px;">
              Text selections will be contained within the content. While a selection is active
              the content will not dismiss unless the selection is cleared or an outside
              interaction is performed.
            </div>
          </OkuHoverCardContent>
        </OkuHoverCardPortal>
      </OkuHoverCard>

      <OkuHoverCard>
        <OkuHoverCardTrigger href="/" class="hover-card-trigger">
          nested
        </OkuHoverCardTrigger>
        <OkuHoverCardPortal>
          <OkuHoverCardContent class="hover-card-animatedContent" :side-offset="5">
            <OkuHoverCardArrow class="hover-card-arrow" :width="20" :height="10" />
            <div style="max-width: 400px;">
              Text selections will be contained within the content. While a selection is active
              the content will not dismiss unless the selection is cleared or an outside
              interaction is performed.
            </div>

            <OkuHoverCard>
              <OkuHoverCardTrigger href="/" class="hover-card-trigger">
                nested trigger
              </OkuHoverCardTrigger>
              <OkuHoverCardPortal>
                <OkuHoverCardContent class="hover-card-animatedContent" :side-offset="5" style="background-color: crimson">
                  <OkuHoverCardArrow class="hover-card-arrow" :width="20" :height="10" style="fill: crimson" />
                  <div style="max-width: 400px;">
                    Text selections will be contained within the content. While a selection is
                    active the content will not dismiss unless the selection is cleared or an
                    outside interaction is performed.
                  </div>

                  <OkuHoverCard>
                    <OkuHoverCardTrigger href="/" class="hover-card-trigger">
                      nested trigger
                    </OkuHoverCardTrigger>
                    <OkuHoverCardPortal>
                      <OkuHoverCardContent class="hover-card-animatedContent" :side-offset="5" style="background-color: green">
                        <OkuHoverCardArrow class="hover-card-arrow" :width="20" :height="10" style="fill: green" />
                        <div style="max-width: 400px;">
                          Text selections will be contained within the content. While a selection
                          is active the content will not dismiss unless the selection is cleared
                          or an outside interaction is performed.
                        </div>
                      </OkuHoverCardContent>
                    </OkuHoverCardPortal>
                  </OkuHoverCard>
                </OkuHoverCardContent>
              </OkuHoverCardPortal>
            </OkuHoverCard>
          </OkuHoverCardContent>
        </OkuHoverCardPortal>
      </OkuHoverCard>
    </div>
    <div style="max-width: 800px;">
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
