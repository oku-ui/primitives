<script setup lang="ts">
import {
  OkuTabs,
  OkuTabsContent,
  OkuTabsList,
  OkuTabsTrigger,
} from '@oku-ui/tabs'
</script>

<template>
  <OkuTabs
    class="flex flex-col w-[300px] shadow-[0_2px_10px] shadow-blackA4"
    default-value="tab1"
  >
    <OkuTabsList class="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
      <OkuTabsTrigger
        class="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
        value="tab1"
      >
        Account
      </OkuTabsTrigger>
      <OkuTabsTrigger
        class="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
        value="tab2"
      >
        Password
      </OkuTabsTrigger>
    </OkuTabsList>
    <OkuTabsContent
      class="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="tab1"
    >
      <p class="mb-5 text-mauve11 text-[15px] leading-normal">
        Make changes to your account here. Click save when you're done.
      </p>
      <fieldset class="mb-[15px] w-full flex flex-col justify-start">
        <label class="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
          default-value="Pedro Duarte"
        >
      </fieldset>
      <fieldset class="mb-[15px] w-full flex flex-col justify-start">
        <label class="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
          default-value="@peduarte"
        >
      </fieldset>
      <div class="flex justify-end mt-5">
        <button class="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default">
          Save changes
        </button>
      </div>
    </OkuTabsContent>
    <OkuTabsContent
      class="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="tab2"
    >
      <p class="mb-5 text-mauve11 text-[15px] leading-normal">
        Change your password here. After saving, you'll be logged out.
      </p>
      <fieldset class="mb-[15px] w-full flex flex-col justify-start">
        <label
          class="text-[13px] leading-none mb-2.5 text-violet12 block"
          htmlFor="currentPassword"
        >
          Current password
        </label>
        <input
          id="currentPassword"
          class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
          type="password"
        >
      </fieldset>
      <fieldset class="mb-[15px] w-full flex flex-col justify-start">
        <label
          class="text-[13px] leading-none mb-2.5 text-violet12 block"
          htmlFor="newPassword"
        >
          New password
        </label>
        <input
          id="newPassword"
          class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
          type="password"
        >
      </fieldset>
      <fieldset class="mb-[15px] w-full flex flex-col justify-start">
        <label
          class="text-[13px] leading-none mb-2.5 text-violet12 block"
          htmlFor="confirmPassword"
        >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          class="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
          type="password"
        >
      </fieldset>
      <div class="flex justify-end mt-5">
        <button class="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default">
          Change password
        </button>
      </div>
    </OkuTabsContent>
  </OkuTabs>
</template>
