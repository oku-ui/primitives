import type { Meta, StoryObj } from '@storybook/vue3'
import type { IDismissableLayerProps } from './DismissableLayer.vue'
import OkuDismissableLayerComponent from './DismissableLayer.vue'

interface StoryProps extends IDismissableLayerProps {}

const meta = {
  title: 'Utilities/DismissableLayer',
  component: OkuDismissableLayerComponent,
  args: {
    template: '#1',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OkuDismissableLayerComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Basic: Story = {
  args: {
    template: '#1',
    // allShow: true,
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
    template: '#2',
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
    template: '#3',
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
    template: '#4',
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
    template: '#5',
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
