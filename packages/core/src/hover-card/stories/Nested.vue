<script setup lang="ts">
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div :style="{ }">
    <div>
      <HoverCardRoot>
        <HoverCardTrigger href="/" class="hoverCard_triggerClass">
          trigger level 1
        </HoverCardTrigger>

        <HoverCardPortal>
          <HoverCardContent
            class="hoverCard_contentClass"
            :side-offset="5"
            :style="{ backgroundColor: 'crimson' }"
          >
            <HoverCardRoot>
              <HoverCardTrigger href="/" class="hoverCard_triggerClass">
                trigger level 2
              </HoverCardTrigger>
              <!-- <HoverCardPortal> -->
              <HoverCardContent
                class="hoverCard_contentClass"
                side="top"
                align="center"
                :side-offset="5"
                :style="{ backgroundColor: 'green' }"
              >
                <HoverCardArrow
                  class="hoverCard_arrowClass"
                  :width="20"
                  :height="10"
                  :offset="20"
                  :style="{ fill: 'green' }"
                />
                <HoverCardRoot>
                  <HoverCardTrigger href="/" class="hoverCard_triggerClass">
                    trigger level 3
                  </HoverCardTrigger>
                  <!-- <HoverCardPortal> -->
                  <HoverCardContent
                    class="hoverCard_contentClass"
                    side="bottom"
                    align="start"
                    :side-offset="5"
                    :style="{ backgroundColor: 'purple' }"
                  >
                    <HoverCardArrow
                      class="hoverCard_arrowClass"
                      :width="20"
                      :height="10"
                      :offset="20"
                      :style="{ fill: 'purple' }"
                    />
                    level 3
                  </HoverCardContent>
                  <!-- </HoverCardPortal> -->
                </HoverCardRoot>
              </HoverCardContent>
              <!-- </HoverCardPortal> -->
            </HoverCardRoot>

            <HoverCardArrow
              class="hoverCard_arrowClass"
              :width="20"
              :height="10"
              :offset="20"
              :style="{ fill: 'crimson' }"
            />
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCardRoot>
    </div>

    <p>TODO: Nested (floating/ui)</p>
  </div>
</template>
