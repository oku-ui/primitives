import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuPopoverProps } from './PopoverDemo.vue'
import OkuLabelComponent from './PopoverDemo.vue'

interface StoryProps extends OkuPopoverProps {
}

const meta = {
  title: 'Components/Popover',
  component: OkuLabelComponent,
  args: {
    template: '#1',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },

} satisfies Meta<typeof OkuLabelComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    template: '#1',
  },
  render: (args: any) => ({
    components: { OkuLabelComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuLabelComponent v-bind="args" />
    `,
  }),
}

export const WithControl: Story = {
  args: {
    template: '#2',
  },
  render: (args: any) => ({
    components: { OkuLabelComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuLabelComponent v-bind="args" />
    `,
  }),
}
