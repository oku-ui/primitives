import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuLabelProps } from './SlotDemo.vue'
import OkuSlotComponent from './SlotDemo.vue'

interface StoryProps extends OkuLabelProps {
}

const meta = {
  title: 'Components/Label',
  component: OkuSlotComponent,
  args: {
    label: 'Label',
    template: '#1',
  },
  argTypes: {
    label: {
      control: 'text',
    },
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

export const Styled: Story = {
  args: {
    label: 'Label',
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

export const WithControl: Story = {
  args: {
    label: 'Label',
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
