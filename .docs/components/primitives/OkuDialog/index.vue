<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <OkuDialog>
    <OkuDialogTrigger as-child>
      <button class="bg-white dark:bg-blackOA-900 dark:text-white text-blackOA-900 shadow-grayOA-200 dark:shadow-blackOA-900 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black dark:focus:shadow-grayOA-300 focus:outline-none">
        Edit profile
      </button>
    </OkuDialogTrigger>
    <OkuDialogPortal>
      <OkuDialogOverlay class="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
      <OkuDialogContent class="bg-white dark:bg-blackOA-900 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px]  p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <OkuDialogTitle class="text-blackOA-900 dark:text-white m-0 text-[17px] font-medium">
          Edit profile
        </OkuDialogTitle>
        <OkuDialogDescription class="text-blackOA-600 dark:text-grayOA-300 dark:text mt-[10px] mb-5 text-[15px] leading-normal">
          Make changes to your profile here. Click save when you're done.
        </OkuDialogDescription>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text-blackOA-900 dark:text-grayOA-200 w-[90px] text-right text-[15px]" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            class="text-blackOA-900 dark:text-grayOA-200 dark:bg-blackOA-900 dark:shadow-blackOA-600 shadow-grayOA-300 focus:shadow-blackOA-900 dark:focus:shadow-grayOA-100 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            defaultValue="Emir Uluçay"
          >
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text-blackOA-900 dark:text-grayOA-200 w-[90px] text-right text-[15px]" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            class="text-blackOA-900 dark:text-grayOA-200 dark:bg-blackOA-900 dark:shadow-blackOA-600 shadow-grayOA-300 focus:shadow-blackOA-900 dark:focus:shadow-grayOA-100 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            defaultValue="@astrodokki"
          >
        </fieldset>
        <div class="mt-[25px] flex justify-end">
          <OkuDialogClose as-child>
            <button class="bg-green-100 dark:bg-green-700/20 dark:text-green-500 text-green-800 hover:bg-green-200 dark:hover:bg-green-600/20 focus:shadow-green-500 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Save changes
            </button>
          </OkuDialogClose>
        </div>
        <OkuDialogClose as-child>
          <button
            class="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <i class="i-ph-x" />
          </button>
        </OkuDialogClose>
      </OkuDialogContent>
    </OkuDialogPortal>
  </OkuDialog>
</template>
