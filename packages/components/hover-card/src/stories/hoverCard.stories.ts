import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuHoverCardProps } from './HoverCardDemo.vue'
import HoverCardDemo from './HoverCardDemo.vue'

interface StoryProps extends OkuHoverCardProps {
}

const meta = {
  title: 'Components/HoverCard',
  component: HoverCardDemo,
  args: {
    template: 'basic',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCardDemo> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Basic: Story = {
  args: {
    template: 'basic',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}
