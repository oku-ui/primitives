<script setup lang="ts">
import {
  OkuTooltip,
  OkuTooltipArrow,
  OkuTooltipContent,
  OkuTooltipPortal,
  OkuTooltipProvider,
  OkuTooltipTrigger,
} from '@oku-ui/tooltip'

// const open = ref(true)
</script>

<!-- export const CustomDurations = () => (
<Tooltip.Provider>
    <h1>Delay duration</h1>
    <h2>Default (700ms)</h2>

    <div style={{ display: 'flex', gap: 50 }}>
      <Tooltip.Root>
        <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={contentClass()} sideOffset={5}>
            Nicely done!
            <Tooltip.Arrow className={arrowClass()} offset={10} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={contentClass()} sideOffset={5}>
            Nicely done!
            <Tooltip.Arrow className={arrowClass()} offset={10} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={contentClass()} sideOffset={5}>
            Nicely done!
            <Tooltip.Arrow className={arrowClass()} offset={10} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </div>

    <h2>Custom (0ms = instant open)</h2>
    <div style={{ display: 'flex', gap: 50 }}>
      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClass()} sideOffset={5}>
              Nicely done!
              <Tooltip.Arrow className={arrowClass()} offset={10} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClass()} sideOffset={5}>
              Nicely done!
              <Tooltip.Arrow className={arrowClass()} offset={10} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClass()} sideOffset={5}>
              Nicely done!
              <Tooltip.Arrow className={arrowClass()} offset={10} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>

<h2>Custom (2s)</h2>
<div style={{ display: 'flex', gap: 50 }}>
      <Tooltip.Provider delayDuration={2000}>
        <Tooltip.Root>
          <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClass()} sideOffset={5}>
              Nicely done!
              <Tooltip.Arrow className={arrowClass()} offset={10} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClass()} sideOffset={5}>
              Nicely done!
              <Tooltip.Arrow className={arrowClass()} offset={10} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClass()} sideOffset={5}>
              Nicely done!
              <Tooltip.Arrow className={arrowClass()} offset={10} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>

<h1>Skip delay duration</h1>
<h2>Default (300ms to move from one to another tooltip)</h2>
<div style={{ display: 'flex', gap: 50 }}>
      <Tooltip.Root>
        <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={contentClass()} sideOffset={5}>
            Nicely done!
            <Tooltip.Arrow className={arrowClass()} offset={10} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={contentClass()} sideOffset={5}>
            Nicely done!
            <Tooltip.Arrow className={arrowClass()} offset={10} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={contentClass()} sideOffset={5}>
            Nicely done!
            <Tooltip.Arrow className={arrowClass()} offset={10} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </div>

<h2>Custom (0ms to move from one to another tooltip = never skip)</h2>
<div style={{ display: 'flex', gap: 50 }}>
      <Tooltip.Provider skipDelayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClass()} sideOffset={5}>
              Nicely done!
              <Tooltip.Arrow className={arrowClass()} offset={10} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClass()} sideOffset={5}>
              Nicely done!
              <Tooltip.Arrow className={arrowClass()} offset={10} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClass()} sideOffset={5}>
              Nicely done!
              <Tooltip.Arrow className={arrowClass()} offset={10} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>

<h2>Custom (5s to move from one to another tooltip)</h2>
<div style={{ display: 'flex', gap: 50 }}>
      <Tooltip.Provider skipDelayDuration={5000}>
        <Tooltip.Root>
          <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClass()} sideOffset={5}>
              Nicely done!
              <Tooltip.Arrow className={arrowClass()} offset={10} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClass()} sideOffset={5}>
              Nicely done!
              <Tooltip.Arrow className={arrowClass()} offset={10} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger className={triggerClass()}>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClass()} sideOffset={5}>
              Nicely done!
              <Tooltip.Arrow className={arrowClass()} offset={10} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  </Tooltip.Provider>
); -->

<template>
  <!-- <OkuTooltipProvider>
    <OkuTooltip v-model="open">
      <OkuTooltipTrigger class="triggerClass">
        I'm controlled, look I'm {{ open ? 'open' : 'closed' }}
      </OkuTooltipTrigger>
      <OkuTooltipPortal>
        <OkuTooltipContent class="contentClass" :side-offset="5">
          Nicely done!
          <OkuTooltipArrow class="arrowClass" :offset="10" />
        </OkuTooltipContent>
      </OkuTooltipPortal>
    </OkuTooltip>
  </OkuTooltipProvider> -->

  <OkuTooltipProvider>
    <h1 class="text-2xl">
      Delay duration
    </h1>
    <h2 class="text-xl">
      Default (700ms)
    </h2>

    <div
      style="{
      display: flex;
      gap: 50px;
    }"
    >
      <OkuTooltip>
        <OkuTooltipTrigger class="triggerClass">
          Hover me
        </OkuTooltipTrigger>
        <OkuTooltipPortal>
          <OkuTooltipContent class="contentClass" :side-offset="5">
            Nicely done!
            <OkuTooltipArrow class="arrowClass" :offset="10" />
          </OkuTooltipContent>
        </OkuTooltipPortal>
      </OkuTooltip>
      <OkuTooltip>
        <OkuTooltipTrigger class="triggerClass">
          Hover me
        </OkuTooltipTrigger>
        <OkuTooltipPortal>
          <OkuTooltipContent class="contentClass" :side-offset="5">
            Nicely done!
            <OkuTooltipArrow class="arrowClass" :offset="10" />
          </OkuTooltipContent>
        </OkuTooltipPortal>
      </OkuTooltip>
      <OkuTooltip>
        <OkuTooltipTrigger class="triggerClass">
          Hover me
        </OkuTooltipTrigger>
        <OkuTooltipPortal>
          <OkuTooltipContent class="contentClass" :side-offset="5">
            Nicely done!
            <OkuTooltipArrow class="arrowClass" :offset="10" />
          </OkuTooltipContent>
        </OkuTooltipPortal>
      </OkuTooltip>
    </div>
  </OkuTooltipProvider>
</template>

<style lang="postcss">
.positionButtonClass {
  margin: 5px;
  border: 1px solid black;
  background: transparent;
}

.contentClass {
  transform-origin: var(--radix-tooltip-content-transform-origin);
  /* ensures content isn't selectable */
  /* this is just a detterent to people putting interactive content inside a `Tooltip.Root` */
  user-select: none;
  background-color: black;
  color: white;
  font-size: 12px;
  border-radius: 5px;
  padding: 10px;
  max-width: 300px;
}

.arrowClass {
  fill: black;
}

@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.animatedContentClass {
  & [data-state='delayed-open'] {
    animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  & [data-state='instant-open'] {
    animation: fadeIn 0.2s ease-out;
  }

  & [data-state='closed'] {
    animation: fadeOut 0.2s ease-out;
  }
}

.gridClass {
  display: inline-grid;
  grid-template-columns: repeat(3, 50px);
  column-gap: 150px;
  row-gap: 100px;
  padding: 100px;
  border: 1px solid black;
}

.chromaticTriggerClass {
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background-color: tomato;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.chromaticContentClass {
  box-sizing: border-box;
  display: grid;
  place-content: center;
  width: 60px;
  height: 60px;
  background-color: royalblue;
  color: white;
  font-size: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.chromaticArrowClass {
  fill: black;
}

button {
  @apply inline-flex items-center mx-4 justify-center px-4 py-2 bg-blue-500;
}
</style>
