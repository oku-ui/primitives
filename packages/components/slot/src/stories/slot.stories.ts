import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuLabelProps } from './SlotDemo.vue'
import OkuSlotComponent from './SlotDemo.vue'

interface StoryProps extends OkuLabelProps {
}

const meta = {
  title: 'Utilities/Slot',
  component: OkuSlotComponent,
  args: {
    template: '#1',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OkuSlotComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const WithoutSlottable: Story = {
  args: {
    template: '#1',
  },
  render: (args: any) => ({
    components: { OkuSlotComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuSlotComponent v-bind="args" />
    `,
  }),
}

export const WithSlottable: Story = {
  args: {
    template: '#2',
  },
  render: (args: any) => ({
    components: { OkuSlotComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuSlotComponent v-bind="args" />
    `,
  }),
}
