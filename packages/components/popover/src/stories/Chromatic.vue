<!-- export const Chromatic = () => (
<div style={{ padding: 200, paddingBottom: 500 }}>
    <h1>Uncontrolled</h1>
    <h2>Closed</h2>
    <Popover.Root>
      <Popover.Trigger className={triggerClass()}>open</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={contentClass()} sideOffset={5}>
          <Popover.Close className={closeClass()}>close</Popover.Close>
          <Popover.Arrow className={arrowClass()} width={20} height={10} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

    <h2>Open</h2>
    <Popover.Root defaultOpen>
      <Popover.Trigger className={triggerClass()}>open</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={contentClass()}
          sideOffset={5}
          onFocusOutside={(event) => event.preventDefault()}
        >
          <Popover.Close className={closeClass()}>close</Popover.Close>
          <Popover.Arrow className={arrowClass()} width={20} height={10} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

    <h2 style={{ marginTop: 100 }}>Open with reordered parts</h2>
    <Popover.Root defaultOpen>
      <Popover.Portal>
        <Popover.Content
          className={contentClass()}
          sideOffset={5}
          onFocusOutside={(event) => event.preventDefault()}
        >
          <Popover.Close className={closeClass()}>close</Popover.Close>
          <Popover.Arrow className={arrowClass()} width={20} height={10} />
        </Popover.Content>
      </Popover.Portal>
      <Popover.Trigger className={triggerClass()}>open</Popover.Trigger>
    </Popover.Root>

    <h1 style={{ marginTop: 100 }}>Controlled</h1>
    <h2>Closed</h2>
    <Popover.Root open={false}>
      <Popover.Trigger className={triggerClass()}>open</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={contentClass()} sideOffset={5}>
          <Popover.Close className={closeClass()}>close</Popover.Close>
          <Popover.Arrow className={arrowClass()} width={20} height={10} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

    <h2>Open</h2>
    <Popover.Root open>
      <Popover.Trigger className={triggerClass()}>open</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={contentClass()} sideOffset={5}>
          <Popover.Close className={closeClass()}>close</Popover.Close>
          <Popover.Arrow className={arrowClass()} width={20} height={10} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

    <h2 style={{ marginTop: 100 }}>Open with reordered parts</h2>
    <Popover.Root open>
      <Popover.Content className={contentClass()} sideOffset={5}>
        <Popover.Close className={closeClass()}>close</Popover.Close>
        <Popover.Arrow className={arrowClass()} width={20} height={10} />
      </Popover.Content>
      <Popover.Trigger className={triggerClass()}>open</Popover.Trigger>
    </Popover.Root>

    <h1 style={{ marginTop: 100 }}>Force mounted content</h1>
    <Popover.Root>
      <Popover.Trigger className={triggerClass()}>open</Popover.Trigger>
      <Popover.Portal forceMount>
        <Popover.Content className={contentClass()} sideOffset={5}>
          <Popover.Close className={closeClass()}>close</Popover.Close>
          <Popover.Arrow className={arrowClass()} width={20} height={10} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

    <h1 style={{ marginTop: 100 }}>Anchor</h1>
    <h2>Controlled</h2>
    <Popover.Root open>
      <Popover.Anchor style={{ padding: 20, background: 'gainsboro' }}>
        <Popover.Trigger className={triggerClass()}>open</Popover.Trigger>
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content className={contentClass()}>
          <Popover.Close className={closeClass()}>close</Popover.Close>
          <Popover.Arrow className={arrowClass()} width={20} height={10} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

    <h2>Uncontrolled</h2>
    <Popover.Root defaultOpen>
      <Popover.Anchor style={{ padding: 20, background: 'gainsboro' }}>
        <Popover.Trigger className={triggerClass()}>open</Popover.Trigger>
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          className={contentClass()}
          onFocusOutside={(event) => event.preventDefault()}
        >
          <Popover.Close className={closeClass()}>close</Popover.Close>
          <Popover.Arrow className={arrowClass()} width={20} height={10} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

    <h1 style={{ marginTop: 100 }}>Positioning</h1>
    <h2>No collisions</h2>
    <h3>Side & Align</h3>
    <div className={gridClass()}>
      {SIDES.map((side) =>
        ALIGN_OPTIONS.map((align) => (
          <Popover.Root key={`${side}-${align}`} open>
            <Popover.Trigger className={chromaticTriggerClass()} />
            <Popover.Portal>
              <Popover.Content
                className={chromaticContentClass()}
                side={side}
                align={align}
                avoidCollisions={false}
              >
                <p style={{ textAlign: 'center' }}>
                  {side}
                  <br />
                  {align}
                </p>
                <Popover.Arrow className={chromaticArrowClass()} width={20} height={10} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        ))
      )}
    </div>

<h3>Side offset</h3>
<h4>Positive</h4>
<div className={gridClass()}>
      {SIDES.map((side) =>
        ALIGN_OPTIONS.map((align) => (
          <Popover.Root key={`${side}-${align}`} open>
            <Popover.Trigger className={chromaticTriggerClass()} />
            <Popover.Portal>
              <Popover.Content
                className={chromaticContentClass()}
                side={side}
                sideOffset={5}
                align={align}
                avoidCollisions={false}
              >
                <p style={{ textAlign: 'center' }}>
                  {side}
                  <br />
                  {align}
                </p>
                <Popover.Arrow className={chromaticArrowClass()} width={20} height={10} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        ))
      )}
    </div>
<h4>Negative</h4>
<div className={gridClass()}>
      {SIDES.map((side) =>
        ALIGN_OPTIONS.map((align) => (
          <Popover.Root key={`${side}-${align}`} open>
            <Popover.Trigger className={chromaticTriggerClass()} />
            <Popover.Portal>
              <Popover.Content
                className={chromaticContentClass()}
                side={side}
                sideOffset={-10}
                align={align}
                avoidCollisions={false}
              >
                <p style={{ textAlign: 'center' }}>
                  {side}
                  <br />
                  {align}
                </p>
                <Popover.Arrow className={chromaticArrowClass()} width={20} height={10} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        ))
      )}
    </div>

<h3>Align offset</h3>
<h4>Positive</h4>
<div className={gridClass()}>
      {SIDES.map((side) =>
        ALIGN_OPTIONS.map((align) => (
          <Popover.Root key={`${side}-${align}`} open>
            <Popover.Trigger className={chromaticTriggerClass()} />
            <Popover.Portal>
              <Popover.Content
                className={chromaticContentClass()}
                side={side}
                align={align}
                alignOffset={20}
                avoidCollisions={false}
              >
                <p style={{ textAlign: 'center' }}>
                  {side}
                  <br />
                  {align}
                </p>
                <Popover.Arrow className={chromaticArrowClass()} width={20} height={10} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        ))
      )}
    </div>
<h4>Negative</h4>
<div className={gridClass()}>
      {SIDES.map((side) =>
        ALIGN_OPTIONS.map((align) => (
          <Popover.Root key={`${side}-${align}`} open>
            <Popover.Trigger className={chromaticTriggerClass()} />
            <Popover.Portal>
              <Popover.Content
                className={chromaticContentClass()}
                side={side}
                align={align}
                alignOffset={-10}
                avoidCollisions={false}
              >
                <p style={{ textAlign: 'center' }}>
                  {side}
                  <br />
                  {align}
                </p>
                <Popover.Arrow className={chromaticArrowClass()} width={20} height={10} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        ))
      )}
    </div>

<h2>Collisions</h2>
<p>See instances on the periphery of the page.</p>
    {SIDES.map((side) =>
      ALIGN_OPTIONS.map((align) => (
<Popover.Root key={`${side}-${align}`} open>
          <Popover.Trigger
            className={chromaticTriggerClass()}
            style={{
              position: 'absolute',
              [side]: 10,
              ...((side === 'right' || side === 'left') &&
                (align === 'start'
                  ? { bottom: 10 }
                  : align === 'center'
                  ? { top: 'calc(50% - 15px)' }
                  : { top: 10 })),
              ...((side === 'top' || side === 'bottom') &&
                (align === 'start'
                  ? { right: 10 }
                  : align === 'center'
                  ? { left: 'calc(50% - 15px)' }
                  : { left: 10 })),
            }}
          />
          <Popover.Portal>
            <Popover.Content className={chromaticContentClass()} side={side} align={align}>
              <p style={{ textAlign: 'center' }}>
                {side}
                <br />
                {align}
              </p>
              <Popover.Arrow className={chromaticArrowClass()} width={20} height={10} />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      ))
    )}

<h2>Relative parent (non-portalled)</h2>
<div style={{ position: 'relative' }}>
      <Popover.Root open>
        <Popover.Trigger asChild>
          <button className={triggerClass()}>open</button>
        </Popover.Trigger>
        <Popover.Content className={contentClass()} sideOffset={5}>
          <Popover.Close className={closeClass()}>close</Popover.Close>
          <Popover.Arrow className={arrowClass()} width={20} height={10} offset={10} />
        </Popover.Content>
      </Popover.Root>
    </div>

<h1 style={{ marginTop: 100 }}>With slotted trigger</h1>
<Popover.Root open>
      <Popover.Trigger asChild>
        <button className={triggerClass()}>open</button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={contentClass()} sideOffset={5}>
          <Popover.Close className={closeClass()}>close</Popover.Close>
          <Popover.Arrow className={arrowClass()} width={20} height={10} offset={10} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

<h1 style={{ marginTop: 100 }}>State attributes</h1>
<h2>Closed</h2>
<Popover.Root open={false}>
      <Popover.Trigger className={triggerAttrClass()}>open</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={contentAttrClass()} sideOffset={5} avoidCollisions={false}>
          <Popover.Close className={closeAttrClass()}>close</Popover.Close>
          <Popover.Arrow className={arrowAttrClass()} width={20} height={10} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

<h2>Open</h2>
<Popover.Root open>
      <Popover.Trigger className={triggerAttrClass()}>open</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={contentAttrClass()}
          side="right"
          sideOffset={5}
          avoidCollisions={false}
        >
          <Popover.Close className={closeAttrClass()}>close</Popover.Close>
          <Popover.Arrow className={arrowAttrClass()} width={20} height={10} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  </div>
); -->

<script setup lang="ts">
import {
  OkuPopover,
  OkuPopoverAnchor,
  OkuPopoverArrow,
  OkuPopoverClose,
  OkuPopoverContent,
  OkuPopoverPortal,
  OkuPopoverTrigger,

} from '@oku-ui/popover'
import { ALIGN_OPTIONS, SIDE_OPTIONS } from '@oku-ui/popper'

const SIDES = SIDE_OPTIONS.filter(side => side !== 'bottom').concat(['bottom'])
</script>

<template>
  <!-- <div
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200vh',
    }"
  >
    <OkuPopover>
      <OkuPopoverTrigger class="popover-trigger">
        open
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent class="popover-content" :side-offset="5">
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>
  </div> -->

  <div style="padding: 200px; padding-bottom: 500px">
    <h1>Uncontrolled</h1>
    <h2>Closed</h2>
    <OkuPopover>
      <OkuPopoverTrigger class="popover-trigger">
        open
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent class="popover-content" :side-offset="5">
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>

    <h2>Open</h2>
    <OkuPopover default-open>
      <OkuPopoverTrigger class="popover-trigger">
        open
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent
          class="popover-content"
          :side-offset="5"
          @focusout-side="() => console.log('focusoutside')"
        >
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>

    <h2 style="margin-top: 100px">
      Open with reordered parts
    </h2>
    <OkuPopover default-open>
      <OkuPopoverPortal>
        <OkuPopoverContent
          class="popover-content"
          :side-offset="5"
          @focusout-side="() => console.log('focusoutside')"
        >
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
      <OkuPopoverTrigger class="popover-trigger">
        open
      </OkuPopoverTrigger>
    </OkuPopover>

    <h1 style="margin-top: 100px">
      Controlled
    </h1>
    <h2>Closed</h2>
    <OkuPopover :open="false">
      <OkuPopoverTrigger class="popover-trigger">
        open
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent class="popover-content" :side-offset="5">
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>

    <h2>Open</h2>
    <OkuPopover :open="true">
      <OkuPopoverTrigger class="popover-trigger">
        open
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent class="popover-content" :side-offset="5">
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>

    <h2 style="margin-top: 100px">
      Open with reordered parts
    </h2>
    <OkuPopover :open="true">
      <OkuPopoverPortal>
        <OkuPopoverContent class="popover-content" :side-offset="5">
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
      <OkuPopoverTrigger class="popover-trigger">
        open
      </OkuPopoverTrigger>
    </OkuPopover>

    <h1 style="margin-top: 100px">
      Force mounted content
    </h1>
    <OkuPopover>
      <OkuPopoverTrigger class="popover-trigger">
        open
      </OkuPopoverTrigger>
      <OkuPopoverPortal force-mount>
        <OkuPopoverContent class="popover-content" :side-offset="5">
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>

    <h1 style="margin-top: 100px">
      Anchor
    </h1>
    <h2>Controlled</h2>
    <OkuPopover :open="true">
      <OkuPopoverAnchor style="padding: 20px; background: gainsboro">
        <OkuPopoverTrigger class="popover-trigger">
          open
        </OkuPopoverTrigger>
      </OkuPopoverAnchor>
      <OkuPopoverPortal>
        <OkuPopoverContent class="popover-content">
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>

    <h2>Uncontrolled</h2>
    <OkuPopover default-open>
      <OkuPopoverAnchor style="padding: 20px; background: gainsboro">
        <OkuPopoverTrigger class="popover-trigger">
          open
        </OkuPopoverTrigger>
      </OkuPopoverAnchor>
      <OkuPopoverPortal>
        <OkuPopoverContent
          class="popover-content"
          @focusout-side="() => console.log('focusoutside')"
        >
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>

    <h1 style="margin-top: 100px">
      Positioning
    </h1>
    <h2>No collisions</h2>
    <h3>Side & Align</h3>
    <div class="popover-grid">
      <template v-for="side in SIDES">
        <template v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`">
          <OkuPopover :open="true">
            <OkuPopoverTrigger class="popover-chromatic-trigger" />
            <OkuPopoverPortal>
              <OkuPopoverContent
                class="popover-chromatic-content"
                :side="side"
                :align="align"
                :avoid-collisions="false"
              >
                <p style="text-align: center">
                  {{ side }}
                  <br>
                  {{ align }}
                </p>
                <OkuPopoverArrow class="popover-chromatic-arrow" :width="20" :height="10" />
              </OkuPopoverContent>
            </OkuPopoverPortal>
          </OkuPopover>
        </template>
      </template>
    </div>

    <h3>Side offset</h3>
    <h4>Positive</h4>
    <div class="popover-grid">
      <template v-for="side in SIDES">
        <template v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`">
          <OkuPopover :open="true">
            <OkuPopoverTrigger class="popover-chromatic-trigger" />
            <OkuPopoverPortal>
              <OkuPopoverContent
                class="popover-chromatic-content"
                :side="side"
                :side-offset="5"
                :align="align"
                :avoid-collisions="false"
              >
                <p style="text-align: center">
                  {{ side }}
                  <br>
                  {{ align }}
                </p>
                <OkuPopoverArrow class="popover-chromatic-arrow" :width="20" :height="10" />
              </OkuPopoverContent>
            </OkuPopoverPortal>
          </OkuPopover>
        </template>
      </template>
    </div>

    <h4>Negative</h4>
    <div class="popover-grid">
      <template v-for="side in SIDES">
        <template v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`">
          <OkuPopover :open="true">
            <OkuPopoverTrigger class="popover-chromatic-trigger" />
            <OkuPopoverPortal>
              <OkuPopoverContent
                class="popover-chromatic-content"
                :side="side"
                :side-offset="-10"
                :align="align"
                :avoid-collisions="false"
              >
                <p style="text-align: center">
                  {{ side }}
                  <br>
                  {{ align }}
                </p>
                <OkuPopoverArrow class="popover-chromatic-arrow" :width="20" :height="10" />
              </OkuPopoverContent>
            </OkuPopoverPortal>
          </OkuPopover>
        </template>
      </template>
    </div>

    <h3>Align offset</h3>
    <h4>Positive</h4>
    <div class="popover-grid">
      <template v-for="side in SIDES">
        <template v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`">
          <OkuPopover :open="true">
            <OkuPopoverTrigger class="popover-chromatic-trigger" />
            <OkuPopoverPortal>
              <OkuPopoverContent
                class="popover-chromatic-content"
                :side="side"
                :align="align"
                :align-offset="20"
                :avoid-collisions="false"
              >
                <p style="text-align: center">
                  {{ side }}
                  <br>
                  {{ align }}
                </p>
                <OkuPopoverArrow class="popover-chromatic-arrow" :width="20" :height="10" />
              </OkuPopoverContent>
            </OkuPopoverPortal>
          </OkuPopover>
        </template>
      </template>
    </div>

    <h4>Negative</h4>
    <div class="popover-grid">
      <template v-for="side in SIDES">
        <template v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`">
          <OkuPopover :open="true">
            <OkuPopoverTrigger class="popover-chromatic-trigger" />
            <OkuPopoverPortal>
              <OkuPopoverContent
                class="popover-chromatic-content"
                :side="side"
                :align="align"
                :align-offset="-10"
                :avoid-collisions="false"
              >
                <p style="text-align: center">
                  {{ side }}
                  <br>
                  {{ align }}
                </p>
                <OkuPopoverArrow class="popover-chromatic-arrow" :width="20" :height="10" />
              </OkuPopoverContent>
            </OkuPopoverPortal>
          </OkuPopover>
        </template>
      </template>
    </div>

    <h2>Collisions</h2>
    <p>See instances on the periphery of the page.</p>
    <template v-for="side in SIDES">
      <template v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`">
        <OkuPopover :open="true">
          <OkuPopoverTrigger
            class="popover-chromatic-trigger"
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
          <OkuPopoverPortal>
            <OkuPopoverContent
              class="popover-chromatic-content"
              :side="side"
              :align="align"
            >
              <p style="text-align: center">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <OkuPopoverArrow class="popover-chromatic-arrow" :width="20" :height="10" />
            </OkuPopoverContent>
          </OkuPopoverPortal>
        </OkuPopover>
      </template>
    </template>

    <h2>Relative parent (non-portalled)</h2>
    <div style="position: relative">
      <OkuPopover :open="true">
        <OkuPopoverTrigger as-child>
          <button class="popover-trigger">
            open
          </button>
        </OkuPopoverTrigger>
        <OkuPopoverContent class="popover-content" :side-offset="5">
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" offset="10" />
        </OkuPopoverContent>
      </OkuPopover>
    </div>

    <h1 style="margin-top: 100px">
      With slotted trigger
    </h1>

    <OkuPopover :open="true">
      <OkuPopoverTrigger as-child>
        <button class="popover-trigger">
          open
        </button>
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent class="popover-content" :side-offset="5">
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" offset="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>

    <h1 style="margin-top: 100px">
      State attributes
    </h1>
    <h2>Closed</h2>
    <OkuPopover :open="false">
      <OkuPopoverTrigger class="popover-trigger-attr">
        open
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent
          class="popover-content-attr"
          :side-offset="5"
          :avoid-collisions="false"
        >
          <OkuPopoverClose class="popover-close-attr">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow-attr" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>

    <h2>Open</h2>
    <OkuPopover :open="true">
      <OkuPopoverTrigger class="popover-trigger-attr">
        open
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent
          class="popover-content-attr"
          side="right"
          :side-offset="5"
          :avoid-collisions="false"
        >
          <OkuPopoverClose class="popover-close-attr">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow-attr" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>
  </div>
</template>
