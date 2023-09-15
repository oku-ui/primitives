import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuPopoverProps } from './PopoverDemo.vue'
import PopoverDemo from './PopoverDemo.vue'

interface StoryProps extends OkuPopoverProps {
}

const meta = {
  title: 'Components/Popover',
  component: PopoverDemo,
  args: {
    template: 'Styled',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
} satisfies Meta<typeof PopoverDemo> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    template: 'Styled',
  },
  render: (args: any) => ({
    components: { PopoverDemo },
    setup() {
      return { args }
    },
    template: `
      <PopoverDemo v-bind="args" />
    `,
  }),
}

export const Boundary: Story = {
  args: {
    template: 'Boundary',
  },
  render: (args: any) => ({
    components: { PopoverDemo },
    setup() {
      return { args }
    },
    template: `
      <PopoverDemo v-bind="args" />
    `,
  }),
}
