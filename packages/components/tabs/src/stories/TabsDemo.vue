<script setup lang="ts">
import {
  OkuTabs,
  OkuTabsContent,
  OkuTabsList,
  OkuTabsTrigger,
} from '@oku-ui/tabs'

export interface ITabsProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

defineProps<ITabsProps>()
</script>

<template>
  <div v-if="template === '#1' || allshow">
    <h1>Horizontal (automatic activation)</h1>
    <OkuTabs default-value="tab1" class="tabs-rootClass">
      <OkuTabsList aria-label="tabs example" class="tabs-listClass">
        <OkuTabsTrigger value="tab1" class="tabs-triggerClass">
          Tab 1
        </OkuTabsTrigger>
        <OkuTabsTrigger value="tab2" disabled class="tabs-triggerClass">
          Tab 2
        </OkuTabsTrigger>
        <OkuTabsTrigger value="tab3" class="tabs-triggerClass">
          Tab 3
        </OkuTabsTrigger>
      </OkuTabsList>
      <OkuTabsContent value="tab1" class="tabs-contentClass">
        Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
        integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
        pellentesque volutpat dictum ipsum.
      </OkuTabsContent>
      <OkuTabsContent value="tab2" class="tabs-contentClass">
        You'll never find me!
      </OkuTabsContent>
      <OkuTabsContent value="tab3" class="tabs-contentClass">
        Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
        quam tempus pretium.
      </OkuTabsContent>
    </OkuTabs>
  </div>
  <div v-if="template === '#3' || allshow">
    <OkuTabs
      activation-mode="automatic"
      dir="ltr"
      default-value="tab1"
      orientation="horizontal"
      class="flex flex-col w-[300px] shadow-[0_2px_10px] shadow-black/10"
    >
      <OkuTabsList
        class="shrink-0 flex border-b border-red-500"
        aria-label="Manage your account"
        :loop="false"
      >
        <OkuTabsTrigger
          class="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-red-500 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="tab1"
        >
          Account
        </OkuTabsTrigger>
        <OkuTabsTrigger
          class="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-red-500 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="tab2"
        >
          Password
        </OkuTabsTrigger>
      </OkuTabsList>
      <OkuTabsContent
        class="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab1"
      >
        <p class="mb-5 text-red-500 text-[15px] leading-normal">
          Make changes to your account here. Click save when you're done.
        </p>
        <form>
          <fieldset class="mb-[15px] w-full flex flex-col justify-start">
            <label
              class="text-[13px] leading-none mb-2.5 text-violet12 block"
              for="name"
            >
              Name
            </label>
            <input
              id="name"
              class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              value="Ejiro Asiuwhu"
            >
          </fieldset>
          <fieldset class="mb-[15px] w-full flex flex-col justify-start">
            <label
              class="text-[13px] leading-none mb-2.5 text-violet12 block"
              for="username"
            >
              Username
            </label>
            <input
              id="username"
              class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              value="@ejirocodes"
            >
          </fieldset>
        </form>
        <div class="flex justify-end mt-5">
          <button
            class="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green-400 text-green-900 hover:bg-green focus:shadow-[0_0_0_2px] focus:shadow-green-700 outline-none cursor-default"
          >
            Save changes
          </button>
        </div>
      </OkuTabsContent>
      <OkuTabsContent
        class="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab2"
      >
        <p class="mb-5 text-red-500 text-[15px] leading-normal">
          Change your password here. After saving, you'll be logged out.
        </p>
        <form>
          <fieldset class="mb-[15px] w-full flex flex-col justify-start">
            <label
              class="text-[13px] leading-none mb-2.5 text-violet12 block"
              for="currentPassword"
            >
              Current password
            </label>
            <input
              id="currentPassword"
              class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              type="password"
              autocomplete="current-password"
            >
          </fieldset>
          <fieldset class="mb-[15px] w-full flex flex-col justify-start">
            <label
              class="text-[13px] leading-none mb-2.5 text-violet12 block"
              for="newPassword"
            >
              New password
            </label>
            <input
              id="newPassword"
              class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              type="password"
              autocomplete="new-password"
            >
          </fieldset>
          <fieldset class="mb-[15px] w-full flex flex-col justify-start">
            <label
              class="text-[13px] leading-none mb-2.5 text-violet12 block"
              for="confirmPassword"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              type="password"
              autocomplete="new-password"
            >
          </fieldset>
          <div class="flex justify-end mt-5">
            <button
              class="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green-400 text-green-900 hover:bg-green-500 focus:shadow-[0_0_0_2px] focus:shadow-green-700 outline-none cursor-default"
            >
              Change password
            </button>
          </div>
        </form>
      </OkuTabsContent>
    </OkuTabs>
  </div>
</template>

<style>
/* Rasgele Veriler */
:root {
  --border-color: #eee;
  --gray300: #ccc;
}

/* Root Class */
.tabs-rootClass {
  display: flex;
  border: 1px solid #eee;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  max-width: 20rem;

  &[data-orientation="horizontal"] {
    flex-direction: column;
  }
}

/* List Class */
.tabs-listClass {
  flex-shrink: 0;
  display: flex;
  background-color: #eee;

  &[data-orientation="vertical"] {
    flex-direction: column;
  }
}

/* Trigger Class */
.tabs-triggerClass {

  all: unset;
  flex-shrink: 0;
  padding: 0.4em 0.6em;
  font-weight: 500;
  line-height: 1;
  user-select: none;

  &[data-orientation="horizontal"] {
    border-top: 4px solid transparent;
    border-bottom: 4px solid var(--border-color, transparent);
  }

  &[data-orientation="vertical"] {
    padding: 0.6em;
    border-right: 4px solid var(--border-color, transparent);
  }

  &[data-disabled] {
    color: var(--gray300);
  }

  &[data-state="active"] {
    --border-color: #b3cd7c;
  }

  &:focus {
    --border-color: #111;
    outline: 1px solid var(--border-color);

    &[data-state="active"] {
      --border-color: #ff0000;
    }
  }
}

/* Content Class */
.tabs-contentClass {
  flex-grow: 1;
  padding: 1em;
  font-weight: 300;
  font-size: 0.85em;
  line-height: 1.65;

  &[data-orientation="horizontal"] {
    border-top: none;
  }

  &[data-orientation="vertical"] {
    border-left: none;
  }

  &[data-state="active"] {
    animation: tabs-show 400ms ease;
  }
}

/* Keyframes */
@keyframes tabs-show {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

/* Attribute Classes */
.tabs-attrClass {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &:disabled {
    opacity: 0.5;
  }

  &[data-disabled] {
    border-style: dashed;
  }

  &[data-state="inactive"] {
    border-color: red;
  }

  &[data-state="active"] {
    border-color: green;
  }
}
</style>
