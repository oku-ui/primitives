<script setup lang="ts">
import { OkuTabs, OkuTabsContent, OkuTabsList, OkuTabsTrigger } from '@oku-ui/tabs'
</script>

<template>
  <div class="flex items-center justify-center">
    <OkuTabs
      class="flex flex-col w-[300px] shadow-[0_2px_10px] shadow-grayOA-200 dark:shadow-blackOA-900"
      default-value="tab1"
    >
      <OkuTabsList class="shrink-0 flex border-b border-grayOA-500" aria-label="Manage your account">
        <OkuTabsTrigger
          class="bg-white dark:bg-grayOA-950 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-grayOA-700 dark:text-grayOA-200 select-none first:rounded-tl-md last:rounded-tr-md hover:text-oku-500 dark:hover:text-oku-400 data-[state=active]:text-oku-500 dark:data-[state=active]:text-oku-400 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="tab1"
        >
          Account
        </OkuTabsTrigger>
        <OkuTabsTrigger
          class="bg-white dark:bg-grayOA-950 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-grayOA-700 dark:text-grayOA-200 select-none first:rounded-tl-md last:rounded-tr-md hover:text-oku-500 dark:hover:text-oku-400 data-[state=active]:text-oku-500 dark:data-[state=active]:text-oku-400 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="tab2"
        >
          Password
        </OkuTabsTrigger>
      </OkuTabsList>
      <OkuTabsContent
        class="grow p-5 bg-white dark:bg-grayOA-950 rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab1"
      >
        <p class="mb-5 text-grayOA-700 dark:text-grayOA-300 text-[15px] leading-normal">
          Make changes to your account here. Click save when you're done.
        </p>
        <fieldset class="mb-[15px] w-full flex flex-col justify-start">
          <label class="text-[13px] leading-none mb-2.5 text-grayOA-800 dark:text-grayOA-200 block" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            class="grow dark:bg-grayOA-950 shrink-0 rounded px-2.5 text-[15px] leading-none text-grayOA-800 dark:text-grayOA-200 shadow-[0_0_0_1px] shadow-grayOA-300 dark:shadow-grayOA-600 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-grayOA-700 outline-none"
            defaultValue="Pedro Duarte"
          >
        </fieldset>
        <fieldset class="mb-[15px] w-full flex flex-col justify-start">
          <label class="text-[13px] leading-none mb-2.5 text-grayOA-800 dark:text-grayOA-200 block" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            class="grow dark:bg-grayOA-950 shrink-0 rounded px-2.5 text-[15px] leading-none text-grayOA-800 dark:text-grayOA-200 shadow-[0_0_0_1px] shadow-grayOA-300 dark:shadow-grayOA-600 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-grayOA-700 outline-none"
            defaultValue="@peduarte"
          >
        </fieldset>
        <div class="flex justify-end mt-5">
          <button class="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] transition bg-green-100 text-green-900 hover:bg-green-200 focus:shadow-[0_0_0_2px] focus:shadow-green-500 outline-none cursor-default dark:bg-green-700/20 dark:text-green-500">
            Save changes
          </button>
        </div>
      </OkuTabsContent>
      <OkuTabsContent
        class="grow p-5 bg-white dark:bg-grayOA-950 rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab2"
      >
        <p class="mb-5 text-grayOA-700 dark:text-grayOA-300 text-[15px] leading-normal">
          Change your password here. After saving, you'll be logged out.
        </p>
        <fieldset class="mb-[15px] w-full flex flex-col justify-start">
          <label
            class="text-[13px] leading-none mb-2.5 text-grayOA-800 dark:text-grayOA-200 block"
            htmlFor="currentPassword"
          >
            Current password
          </label>
          <input
            id="currentPassword"
            class="grow dark:bg-grayOA-950 shrink-0 rounded px-2.5 text-[15px] leading-none text-grayOA-800 dark:text-grayOA-200 shadow-[0_0_0_1px] shadow-grayOA-300 dark:shadow-grayOA-600 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-grayOA-700 outline-none"
            type="password"
          >
        </fieldset>
        <fieldset class="mb-[15px] w-full flex flex-col justify-start">
          <label
            class="text-[13px] leading-none mb-2.5 text-grayOA-800 dark:text-grayOA-200 block"
            htmlFor="newPassword"
          >
            New password
          </label>
          <input
            id="newPassword"
            class="grow dark:bg-grayOA-950 shrink-0 rounded px-2.5 text-[15px] leading-none text-grayOA-800 dark:text-grayOA-200 shadow-[0_0_0_1px] shadow-grayOA-300 dark:shadow-grayOA-600 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-grayOA-700 outline-none"
            type="password"
          >
        </fieldset>
        <fieldset class="mb-[15px] w-full flex flex-col justify-start">
          <label
            class="text-[13px] leading-none mb-2.5 text-grayOA-800 dark:text-grayOA-200 block"
            htmlFor="confirmPassword"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            class="grow dark:bg-grayOA-950 shrink-0 rounded px-2.5 text-[15px] leading-none text-grayOA-800 dark:text-grayOA-200 shadow-[0_0_0_1px] shadow-grayOA-300 dark:shadow-grayOA-600 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-grayOA-700 outline-none"
            type="password"
          >
        </fieldset>
        <div class="flex justify-end mt-5">
          <button class="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] transition bg-green-100 text-green-900 hover:bg-green-200 focus:shadow-[0_0_0_2px] focus:shadow-green-500 outline-none cursor-default dark:bg-green-700/20 dark:text-green-500">
            Change password
          </button>
        </div>
      </OkuTabsContent>
    </OkuTabs>
  </div>
</template>
