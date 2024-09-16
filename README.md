> [!NOTE]
> This repository is a fork of [OkuUI](https://github.com/oku-ui/primitives) and serves as a staging area for migrating Vue components to Single File Components (SFC). All contributions and changes will be merged back into the original repository upon completion.

---

<a href="https://oku-ui.com">
  <img alt="Oku UI hero image" src="https://github.com/oku-ui/primitives/blob/main/.github/assets/primitives-cover.png?raw=true"
</a>

---

# Oku Primitives

**An open-source UI component library for building high-quality, accessible design systems and web apps.**

Oku Primitives is a low-level UI component library with a focus on accessibility, customization and developer experience. You can use these components either as the base layer of your design system or adopt them incrementally.

Website: [Oku Website](https://oku-ui.com)

Docs: [Nuxt playground](https://vue-primitives-docs.netlify.app/)

Storybook: [Storybook](https://vue-primitives.netlify.app)

## Install

```sh
pnpm i @perigee/vue-primitives
```

---

### Main differences from [RadixVue](https://github.com/radix-vue/radix-vue)

1) I use [let](https://github.com/perigee-ui/vue-primitives/blob/7c341db59fdfdb0cc88dfa6614d6c390b6856780/packages/vue-primitives/src/hover-card/HoverCardRoot.vue#L22) variables or [useRef](https://github.com/perigee-ui/vue-primitives/blob/7c341db59fdfdb0cc88dfa6614d6c390b6856780/packages/vue-primitives/src/hooks/useRef.ts#L18) where React uses useRef. Radix-vue [creates unnecessary reactive ref](https://github.com/radix-vue/radix-vue/blob/3f0f965fcf6fc3901e4fbbedf9a68dcb7d706f3f/packages/radix-vue/src/HoverCard/HoverCardRoot.vue#L64) variables in all places, which is completely unnecessary.

2) I use the [composeEventHandlers hook](https://github.com/radix-ui/primitives/blob/660060a765634e9cc7bf4513f41e8dabc9824d74/packages/core/primitive/src/primitive.tsx#L1). This hook allows canceling events through preventDefault. Unfortunately, in Vue, [handlers received from the parent component end up at the end of the array and are called last](https://github.com/vuejs/core-vapor/blob/30583b9ee1c696d3cb836f0bfd969793e57e849d/packages/runtime-core/src/vnode.ts#L886) (I might have misunderstood the code, there may be inaccuracies).

3) I use attribute inheritance instead of redefining them in each component, [generating unnecessary code](https://github.com/radix-vue/radix-vue/blob/3f0f965fcf6fc3901e4fbbedf9a68dcb7d706f3f/packages/radix-vue/src/shared/useForwardProps.ts#L16). Moreover, it seems that Volar now[ has typing for attrs](https://github.com/vuejs/language-tools/pull/4103). This approach may change if it turns out to be inconvenient to use.

4) I do not use their [useForwardExpose](https://github.com/radix-vue/radix-vue/blob/3f0f965fcf6fc3901e4fbbedf9a68dcb7d706f3f/packages/radix-vue/src/shared/useForwardExpose.ts#L21). A hook that replaces the original expose object to pass props outside. Why, if access to them is [already available](https://vuejs.org/api/component-instance.html#props).

5) I do not use [asChild for implementing primitives](https://github.com/radix-vue/radix-vue/blob/3f0f965fcf6fc3901e4fbbedf9a68dcb7d706f3f/packages/radix-vue/src/Menu/MenuContentImpl.vue#L274). Instead, I wrap the component's [content in a hook and use it](https://github.com/perigee-ui/vue-primitives/blob/a991db71fbecf364cd0b8479b294606236b104b4/packages/vue-primitives/src/dialog/DialogContentModal.vue#L65). I thought it was a bit cumbersome to use so many empty wrapper components when they can be eliminated. For example, the FocusScope wrapper is 3 components: FocusScope -> Primitive -> Slot. If there are 3 such wrappers, it is already a tree of 9+ components.
This is currently a test implementation.

6) I think it's unlikely. In the distant future, there is a thought to abandon components and leave only hooks that return props. For example, like in [Zag](https://zagjs.com/components/react/accordion) and [Melt](https://melt-ui.com/docs/introduction). If the Vapor mod comes out in our lifetime, this method will allow us to get rid of `component is` and [modification of children](https://github.com/radix-vue/radix-vue/blob/3f0f965fcf6fc3901e4fbbedf9a68dcb7d706f3f/packages/radix-vue/src/Primitive/Slot.ts#L12) for asChild.

7) Different implementation of [Collection](https://github.com/perigee-ui/vue-primitives/blob/7c341db59fdfdb0cc88dfa6614d6c390b6856780/packages/vue-primitives/src/collection/Collection.ts#L29) without Map, VDom. [Radix vue](https://github.com/radix-vue/radix-vue/blob/3f0f965fcf6fc3901e4fbbedf9a68dcb7d706f3f/packages/radix-vue/src/Collection/Collection.ts#L59)

8) Presence is just a [hook for me](https://github.com/perigee-ui/vue-primitives/blob/7c341db59fdfdb0cc88dfa6614d6c390b6856780/packages/vue-primitives/src/presence/usePresence.ts#L8). The same approach was found in [Solid's Kobalte](https://github.com/corvudev/corvu/blob/main/packages/solid-presence/src/presence.ts). In radix-vue, it is the reason for the absence of content on the first render in components like [Accordion](https://github.com/radix-vue/radix-vue/issues/978).

9) Availability of component context export for access in user code. It seems that this was promised to be added in Radix v2. I am not following.

10) No [empty wrappers that do nothing](https://github.com/radix-vue/radix-vue/blob/3f0f965fcf6fc3901e4fbbedf9a68dcb7d706f3f/packages/radix-vue/src/AlertDialog/AlertDialogTrigger.vue).

11) An easier way to get the current element [without `computed`](https://github.com/perigee-ui/vue-primitives/blob/7c341db59fdfdb0cc88dfa6614d6c390b6856780/packages/vue-primitives/src/hooks/useForwardElement.ts#L4). [Radix-vue](https://github.com/radix-vue/radix-vue/blob/3f0f965fcf6fc3901e4fbbedf9a68dcb7d706f3f/packages/radix-vue/src/shared/useForwardExpose.ts#L9C9-L9C23)

# TODO

## Components

Enter the component you want most in the components, leave the emojis and follow.

**Developers can work on unclaimed components**.

| Component                                                                                       | Status |
| ----------------------------------------------------------------------------------------------- | ------ |
| [Accordion](https://vue-primitives.netlify.app/?path=/story/components-accordion--single)       | ✓      |
| [AlertDialog](https://vue-primitives.netlify.app/?path=/story/components-alertdialog--styled)   | ✓      |
| [AspectRatio](https://vue-primitives.netlify.app/?path=/story/components-aspectratio--styled)   | ✓      |
| [Avatar](https://vue-primitives.netlify.app/?path=/story/components-avatar--styled)             | ✓      |
| [Checkbox](https://vue-primitives.netlify.app/?path=/story/components-checkbox--styled)         | ✓      |
| [Collapsible](https://vue-primitives.netlify.app/?path=/story/components-collapsible--styled)   | ✓      |
| [Context Menu](https://vue-primitives.netlify.app/?path=/story/components-contextmenu--styled)  | ✓      |
| [Dialog](https://vue-primitives.netlify.app/?path=/story/components-dialog--styled)             | ✓      |
| [DropdownMenu](https://vue-primitives.netlify.app/?path=/story/components-dropdownmenu--styled) | ✓      |
| Form                                                                                            | ✖️      |
| [HoverCard](https://vue-primitives.netlify.app/?path=/story/components-hovercard--chromatic)    | ✓      |
| [Label](https://vue-primitives.netlify.app/?path=/story/components-label--styled)               | ✓      |
| [Menubar](https://vue-primitives.netlify.app/?path=/story/components-menubar--styled)           | ✓      |
| NavigationMenu                                                                                  | 🚧      |
| [Popover](https://vue-primitives.netlify.app/?path=/story/components-popover--styled)           | ✓      |
| [Progress](https://vue-primitives.netlify.app/?path=/story/components-progress--styled)         | ✓      |
| [RadioGroup](https://vue-primitives.netlify.app/?path=/story/components-radiogroup--styled)     | ✓      |
| [ScrollArea](https://vue-primitives.netlify.app/?path=/story/components-scrollarea--basic)      | ✓      |
| Select                                                                                          | 🚧      |
| [Separator](https://vue-primitives.netlify.app/?path=/story/components-separator--styled)       | ✓      |
| [Slider](https://vue-primitives.netlify.app/?path=/story/components-slider--styled)             | ✓      |
| [Switch](https://vue-primitives.netlify.app/?path=/story/components-switch--styled)             | ✓      |
| [Tabs](https://vue-primitives.netlify.app/?path=/story/components-tabs--styled)                 | ✓      |
| [Toast](https://vue-primitives.netlify.app/?path=/story/components-toast--styled)               | ✓      |
| [ToggleGroup](https://vue-primitives.netlify.app/?path=/story/components-togglegroup--single)   | ✓      |
| [Toggle](https://vue-primitives.netlify.app/?path=/story/components-toggle--styled)             | ✓      |
| [Toolbar](https://vue-primitives.netlify.app/?path=/story/components-toolbar--styled)           | ✓      |
| [Tooltip](https://vue-primitives.netlify.app/?path=/story/components-tooltip--styled)           | ✓      |

## Utilites

| Utilites                                                                                              | Status |
| ----------------------------------------------------------------------------------------------------- | ------ |
| [Collection](https://vue-primitives.netlify.app/?path=/story/utilities-rovingfocusgroup--basic)       | ✓      |
| [DismissableLayer](https://vue-primitives.netlify.app/?path=/story/utilities-dismissablelayer--basic) | ✓      |
| [FocusScope](https://vue-primitives.netlify.app/?path=/story/utilities-focusscope--basic)             | ✓      |
| [Menu](https://vue-primitives.netlify.app/?path=/story/utilities-menu--styled)                        | ✓      |
| [Popper](https://vue-primitives.netlify.app/?path=/story/utilities-popper--styled)                    | ✓      |
| [Portal](https://vue-primitives.netlify.app/?path=/story/utilities-portal--base)                      | ✓      |
| [Presence](https://vue-primitives.netlify.app/?path=/story/utilities-presence--basic)                 | ✓      |
| Primitives                                                                                            | ✓      |
| [RovingFocusGroup](https://vue-primitives.netlify.app/?path=/story/utilities-rovingfocusgroup--basic) | ✓      |
| Slot                                                                                                  | ✓      |
| [VisuallyHidden](https://vue-primitives.netlify.app/?path=/story/utilities-visuallyhidden--basic)     | ✓      |
