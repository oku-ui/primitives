<script setup lang="ts">
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { createApp, onBeforeUnmount, ref } from 'vue'
import { OkuFocusScope } from '@oku-ui/focus-scope'
import DummyDialog from './DummyDialog.vue'
import DummyPopover from './DummyPopover.vue'
import DismissableBox from './DismissableBox.vue'

export interface IDismissableLayerProps {
  template?:
  | '#1'
  | '#2'
  | '#3'
  | '#4'
  | '#5'
  | '#6'
  | '#7'
  | '#8'
  | '#9'
  | '#10'
  allshow?: boolean
}

defineProps<IDismissableLayerProps>()

const openButtonRef = ref<HTMLButtonElement | null>(null)
const changeColorButtonRef = ref<HTMLButtonElement | null>(null)

const color = ref('royalblue')
const open = ref(false)
const dismissOnEscape = ref(false)
const dismissOnPointerDownOutside = ref(false)
const dismissOnFocusOutside = ref(false)
const disabledOutsidePointerEvents = ref(false)

function toggleOpen() {
  open.value = !open.value
}

function onEscapeKeyDown(event: Event): void {
  console.warn(event, 'aa')
  if (dismissOnEscape.value === false)
    event.preventDefault()
}

function onPointerDownOutside(event: Event): void {
  if (
    dismissOnPointerDownOutside.value === false
    || event.target === openButtonRef.value
  )
    event.preventDefault()
}

function onFocusOutside(event: Event): void {
  if (dismissOnFocusOutside.value === false)
    event.preventDefault()
}

function closeLayer() {
  open.value = false
}

function handleMouseDown() {
  // eslint-disable-next-line no-alert
  alert('hey!')
}

function clicked() {
  // eslint-disable-next-line no-alert
  alert('clicked!')
}

function setColor() {
  color.value = color.value === 'royalblue' ? 'tomato' : 'royalblue'
}

function handlePopupClick() {
  const popupWindow = window.open(
    undefined,
    undefined,
    'width=300,height=300,top=100,left=100',
  )

  if (!popupWindow) {
    console.error(
      'Failed to open popup window, check your popup blocker settings',
    )
    return
  }

  const containerNode = popupWindow.document.createElement('div')
  popupWindow.document.body.append(containerNode)

  const app = createApp(DismissableBox)
  app.mount(containerNode)

  onBeforeUnmount(() => containerNode.remove())
}
</script>

<template>
  <div>
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <div style="font-family: sans-serif; text-align: center">
        <h1 class="text-3xl text-center font-semibold mb-2">
          DismissableLayer
        </h1>

        <div
          style="display: inline-block; text-align: left; margin-bottom: 20px"
        >
          <label class="block">
            <input v-model="dismissOnEscape" type="checkbox"> Dismiss on
            escape?
          </label>

          <label class="block">
            <input v-model="dismissOnPointerDownOutside" type="checkbox">
            Dismiss on pointer down outside?
          </label>

          <label class="block">
            <input v-model="dismissOnFocusOutside" type="checkbox"> Dismiss on
            focus outside?
          </label>

          <hr>

          <label class="block">
            <input v-model="disabledOutsidePointerEvents" type="checkbox">
            Disable outside pointer events?
          </label>
        </div>

        <div style="margin-bottom: 20px">
          <button ref="openButtonRef" @click="toggleOpen">
            {{ open ? "Close" : "Open" }} layer
          </button>
        </div>

        <div v-if="open">
          <OkuDismissableLayer
            :disable-outside-pointer-events="disabledOutsidePointerEvents"
            class="inline-flex justify-center items-center align-middle w-[400px] h-[300px] bg-black rounded-xl mb-5"
            :style="{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              verticalAlign: 'middle',
              width: '400px',
              height: '300px',
              backgroundColor: 'black',
              borderRadius: '10px',
              marginBottom: '20px',
            }"
            @escape-key-down="onEscapeKeyDown"
            @pointerdown-outside="onPointerDownOutside"
            @focusout-side="onFocusOutside"
            @dismiss="closeLayer"
          >
            <input type="text">
          </OkuDismissableLayer>
        </div>

        <div style="margin-bottom: 20px">
          <input type="text" defaultValue="hello" style="margin-right: 20px">
          <button @mousedown="handleMouseDown">
            hey!
          </button>
        </div>
      </div>
    </div>

    <div v-if="template === '#2' || allshow" class="flex flex-col">
      <DismissableBox />
    </div>

    <div v-if="template === '#3' || allshow" class="flex flex-col">
      <div class="text-center font-sans">
        <h1 class="text-3xl font-bold mb-2">
          DismissableLayer + FocusScope
        </h1>
        <div class="mb-10">
          <button ref="openButtonRef" type="button" @click="toggleOpen">
            {{ open ? "Close" : "Open" }} layer
          </button>
        </div>

        <template v-if="open">
          <OkuDismissableLayer
            as-child
            disable-outside-pointer-events
            @pointerdown-outside="onPointerDownOutside"
            @dismiss="closeLayer"
          >
            <OkuFocusScope
              trapped
              :style="{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                verticalAlign: 'middle',
                width: '400px',
                height: '300px',
                background: 'black',
                borderRadius: '10px',
                marginBottom: '20px',
              }"
            >
              <input type="text">
            </OkuFocusScope>
          </OkuDismissableLayer>
        </template>

        <div style="margin-bottom: 20px">
          <input type="text" defaultValue="hello" style="margin-right: 20px">
          <button @mousedown="handleMouseDown">
            hey!
          </button>
        </div>
      </div>
    </div>

    <div v-if="template === '#4'" class="flex flex-col h-[300vh]">
      <h1 class="text-3xl font-bold mb-2">
        Dialog (fully modal example)
      </h1>
      <ul :style="{ 'dismissable-layer-list-style': 'none', 'padding': 0, 'margin-bottom': 30 }">
        <li>✅ focus should move inside `Dialog` when mounted</li>
        <li>✅ focus should be trapped inside `Dialog`</li>
        <li>✅ scrolling outside `Dialog` should be disabled</li>
        <li>✅ should be able to dismiss `Dialog` on pressing escape</li>
        <li :style="{ 'margin-left': 30 }">
          ✅ focus should return to the open button
        </li>
        <li>
          ✅ interacting outside `Dialog` should be disabled (clicking the
          "alert me" button shouldn't do anything)
        </li>
        <li>➕</li>
        <li>✅ should be able to dismiss `Dialog` when interacting outside</li>
        <li :style="{ 'margin-left': 30 }">
          ✅ focus should return to the open button
        </li>
      </ul>

      <div :style="{ display: 'flex', gap: 10 }">
        <DummyDialog open-label="Open Dialog" close-label="Close Dialog" />

        <input type="text" defaultValue="some input">
        <button type="button" @click="clicked">
          Alert me
        </button>
      </div>
    </div>

    <div v-if="template === '#5'" class="flex flex-col">
      <h1 class="text-3xl font-bold mb-2">
        Popover (fully modal example)
      </h1>
      <ul :style="{ listStyle: 'none', padding: 0, marginBottom: 30 }">
        <li>✅ focus should move inside `Popover` when mounted</li>
        <li>✅ focus should be trapped inside `Popover`</li>
        <li>✅ scrolling outside `Popover` should be disabled</li>
        <li>✅ should be able to dismiss `Popover` on pressing escape</li>
        <li :style="{ marginLeft: '30px' }">
          ✅ focus should return to the open button
        </li>
        <li>
          ✅ interacting outside `Popover` should be disabled (clicking the
          "alert me" button shouldn't do anything)
        </li>
        <li>➕</li>
        <li>✅ should be able to dismiss `Popover` when interacting outside</li>
        <li :style="{ marginLeft: '30px' }">
          ✅ focus should return to the open button
        </li>
      </ul>

      <div class="flex gap-10 mt-5">
        <DummyPopover
          open-label="Open Popover"
          close-label="Close Popover"
          disable-outside-pointer-events
          prevent-scroll
        />
        <input type="text" defaultValue="some input">

        <button type="button" @click="clicked">
          Alert me
        </button>
      </div>
    </div>

    <div v-if="template === '#6'" class="flex flex-col">
      <h1 class="text-3xl font-bold mb-2">
        Popover (semi-modal example)
      </h1>

      <ul class="dismissable-layer-list">
        <li>✅ focus should move inside `Popover` when mounted</li>
        <li>✅ focus should be trapped inside `Popover`</li>
        <li>✅ scrolling outside `Popover` should be allowed</li>
        <li>✅ should be able to dismiss `Popover` on pressing escape</li>
        <li :style="{ marginLeft: '30px' }">
          ✅ focus should return to the open button
        </li>
        <li>
          ✅ interacting outside `Popover` should be allowed (clicking the
          "alert me" button should trigger)
        </li>
        <li>➕</li>
        <li>
          ✅ should be able to dismiss `Popover` when interacting outside{' '}
          <span class="font-semibold">unless specified (ie. change color button)</span>
        </li>
        <li :style="{ marginLeft: '30px' }">
          ✅ focus should <span class="font-semibold">NOT</span> return to the
          open button when unmounted, natural focus should occur
        </li>
      </ul>

      <div class="flex gap-10 mt-5">
        <DummyPopover
          :color="color"
          open-label="Open Popover"
          close-label="Close Popover"
          @pointerdown-outside="
            (event) => {
              if (event.target === changeColorButtonRef) {
                event.preventDefault();
              }
            }
          "
        />
        <input type="text" defaultValue="some input">

        <button type="button" @click="clicked">
          Alert me
        </button>

        <button ref="changeColorButtonRef" type="button" @click="setColor">
          Change color
        </button>
      </div>
    </div>

    <div v-if="template === '#7'" class="flex flex-col">
      <h1 class="text-3xl font-bold mb-2">
        Popover (non modal example)
      </h1>

      <ul class="dismissable-layer-list">
        <li>✅ focus should move inside `Popover` when mounted</li>
        <li>
          ✅ focus should <span class="font-semibold">NOT</span> be trapped
          inside `Popover`
        </li>
        <li>✅ scrolling outside `Popover` should be allowed</li>
        <li>✅ should be able to dismiss `Popover` on pressing escape</li>
        <li :style="{ marginLeft: '30px' }">
          ✅ focus should return to the open button
        </li>
        <li>
          ✅ interacting outside `Popover` should be allowed (clicking the
          "alert me" button should trigger)
        </li>
        <li>➕</li>
        <li>✅ should be able to dismiss `Popover` when clicking outside</li>
        <li :style="{ marginLeft: '30px' }">
          ✅ focus should <span class="font-semibold">NOT</span> return to the
          open button when unmounted, natural focus should occur
        </li>
        <li>✅ should be able to dismiss `Popover` when focus leaves it</li>
        <li :style="{ marginLeft: '30px' }">
          ❓ focus should move to next tabbable element after open button
          <div class="font-semibold">
            <span :style="{ marginLeft: '20px' }">notes:</span>
            <ul>
              <li>
                I have left this one out for now as I am still unsure in which
                case it should do this
              </li>
              <li>
                for the moment, focus will be returned to the open button when
                `FocusScope` unmounts
              </li>
              <li>
                Need to do some more thinking, in the meantime, I think this
                behavior is ok
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <div class="flex gap-10 mt-5">
        <DummyPopover
          open-label="Open Popover"
          close-label="Close Popover"
          :trapped="false"
        />
        <input type="text" defaultValue="some input">
        <button type="button" @click="clicked">
          Alert me
        </button>
      </div>
    </div>

    <div v-if="template === '#8'" class="flex flex-col">
      <h1 class="text-3xl font-bold mb-2">
        Popover (semi-modal) in Dialog (fully modal)
      </h1>

      <ul class="dismissable-layer-list">
        <li>
          ✅ dismissing `Popover` by pressing escape should{' '}
          <span class="font-semibold">NOT</span> dismiss `Dialog`
        </li>
        <li>
          ✅ dismissing `Popover` by clicking outside should also dismiss
          `Dialog`
        </li>
      </ul>

      <div class="flex gap-10 mt-5">
        <DummyDialog open-label="Open Dialog" close-label="Close Dialog">
          <DummyPopover open-label="Open Popover" close-label="Close Popover" />
        </DummyDialog>
        <input type="text" defaultValue="some input">
        <button type="button" @click="clicked">
          Alert me
        </button>
      </div>
    </div>

    <div v-if="template === '#9'" class="flex flex-col">
      <h1 class="text-3xl font-bold mb-2">
        Popover (nested example)
      </h1>
      <ul class="dismissable-layer-list">
        <li>
          ✅ dismissing a `Popover` by pressing escape should only dismiss that
          given `Popover`, not its parents
        </li>
        <li>
          ✅ interacting outside the blue `Popover` should only dismiss itself
          and not its parents
        </li>
        <li>
          ✅ interacting outside the red `Popover` should dismiss itself and the
          black one
        </li>
        <li>✅ unless the click wasn't outside the black one</li>
        <li>
          ✅ when the blue `Popover` is open, there should be
          <span class="font-semibold">NO</span> text cursor above the red or
          black inputs
        </li>
        <li>
          ✅ when the red `Popover` is open, there should be a text cursor above
          the black input but not the one on the page behind
        </li>
      </ul>

      <div class="flex gap-10 mt-5">
        <DummyPopover
          disable-outside-pointer-events
          @interact-outside="
            () => {
              console.log('interact outside black');
            }
          "
        >
          <DummyPopover
            color="tomato"
            open-label="Open red"
            close-label="Close red"
            @interact-outside="
              () => {
                console.log('interact outside red');
              }
            "
          >
            <DummyPopover
              color="royalblue"
              open-label="Open blue"
              close-label="Close blue"
              disable-outside-pointer-events
              @interact-outside="
                () => {
                  console.log('interact outside blue');
                }
              "
            />
          </DummyPopover>
        </DummyPopover>

        <input type="text" defaultValue="some input">
        <button type="button" @click="clicked">
          Alert me
        </button>
      </div>
    </div>

    <div v-if="template === '#10'" class="flex flex-col">
      <div class="text-center">
        <button @click="handlePopupClick">
          Open Popup
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.dismissable-layer-list {
  dismissable-layer-list-style: "none";
  padding: 0px;
  margin-bottom: 30px;
}
</style>
