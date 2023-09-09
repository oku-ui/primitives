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
  <OkuHoverCard>
    <OkuHoverCardTrigger href="/" class="triggerClass">
      trigger level 1
    </OkuHoverCardTrigger>

    <OkuHoverCardPortal>
      <OkuHoverCardContent
        class="contentClass"
        :side-offset="5"
        :style="{ backgroundColor: 'crimson' }"
      >
        <OkuHoverCard>
          <OkuHoverCardTrigger href="/" class="triggerClass">
            trigger level 2
          </OkuHoverCardTrigger>
          <OkuHoverCardPortal>
            <OkuHoverCardContent
              class="contentClass"
              side="top"
              align="center"
              :side-offset="5"
              :style="{ backgroundColor: 'green' }"
            >
              <OkuHoverCardArrow
                class="arrowClass"
                width="20px"
                height="10px"
                :offset="20"
                :style="{ fill: 'green' }"
              />
              <OkuHoverCard>
                <OkuHoverCardTrigger href="/" class="triggerClass">
                  trigger level 3
                </OkuHoverCardTrigger>
                <OkuHoverCardPortal>
                  <OkuHoverCardContent
                    class="contentClass"
                    side="bottom"
                    align="start"
                    :side-offset="5"
                    :style="{ backgroundColor: 'purple' }"
                  >
                    <OkuHoverCardArrow
                      class="arrowClass"
                      width="20px"
                      height="10px"
                      :offset="20"
                      :style="{ fill: 'purple' }"
                    />
                    level 3
                  </OkuHoverCardContent>
                </OkuHoverCardPortal>
              </OkuHoverCard>
            </OkuHoverCardContent>
          </OkuHoverCardPortal>
        </OkuHoverCard>

        <OkuHoverCardArrow
          class="arrowClass"
          width="20px"
          height="10px"
          :offset="20"
          :style="{ fill: 'crimson' }"
        />
      </OkuHoverCardContent>
    </OkuHoverCardPortal>
  </OkuHoverCard>
</template>
