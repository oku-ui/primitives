import type { Meta, StoryObj } from '@storybook/vue3'
import type { IDismissableLayerProps } from './DismissableLayerDemo.vue'
import OkuDismissableLayerComponent from './DismissableLayerDemo.vue'

interface StoryProps extends IDismissableLayerProps {}

const meta = {
  title: 'Utilities/DismissableLayer',
  component: OkuDismissableLayerComponent,

  args: {
    template: 'Basic',
  },

} satisfies Meta<typeof OkuDismissableLayerComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Basic: Story = {
  args: {
    template: 'Basic',
  },
  render: (args: any) => ({
    components: { OkuDismissableLayerComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDismissableLayerComponent v-bind="args" />
    `,
  }),
}

export const Nested: Story = {
  args: {
    template: 'Nested',
  },
  render: (args: any) => ({
    components: { OkuDismissableLayerComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDismissableLayerComponent v-bind="args" />
    `,
  }),
}

export const WithFocusScope: Story = {
  args: {
    template: 'WithFocusScope',
  },
  render: (args: any) => ({
    components: { OkuDismissableLayerComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDismissableLayerComponent v-bind="args" />
    `,
  }),
}

export const DialogExample: Story = {
  args: {
    template: 'DialogExample',
  },
  render: (args: any) => ({
    components: { OkuDismissableLayerComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDismissableLayerComponent v-bind="args" />
    `,
  }),
}

export const PopoverFullyModal: Story = {
  args: {
    template: 'PopoverFullyModal',
  },

  render: (args: any) => ({
    components: { OkuDismissableLayerComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDismissableLayerComponent v-bind="args" />
    `,
  }),
}

export const PopoverSemiModal: Story = {
  args: {
    template: 'PopoverSemiModal',
  },
  render: (args: any) => ({
    components: { OkuDismissableLayerComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDismissableLayerComponent v-bind="args" />
    `,
  }),
}

export const PopoverNonModal: Story = {
  args: {
    template: 'PopoverNonModal',
  },
  render: (args: any) => ({
    components: { OkuDismissableLayerComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDismissableLayerComponent v-bind="args" />
    `,
  }),
}

export const PopoverInDialog: Story = {
  args: {
    template: 'PopoverInDialog',
  },
  render: (args: any) => ({
    components: { OkuDismissableLayerComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDismissableLayerComponent v-bind="args" />
    `,
  }),
}

export const PopoverNested: Story = {
  args: {
    template: 'PopoverNested',
  },
  render: (args: any) => ({
    components: { OkuDismissableLayerComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDismissableLayerComponent v-bind="args" />
    `,
  }),
}

export const InPopupWindow: Story = {
  args: {
    template: 'InPopupWindow',
  },
  render: (args: any) => ({
    components: { OkuDismissableLayerComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDismissableLayerComponent v-bind="args" />
    `,
  }),
}
