import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuToolbarProps } from './ToolbarDemo.vue'
import ToolbarDemo from './ToolbarDemo.vue'

interface StoryProps extends OkuToolbarProps {
}

const meta = {
  title: 'Components/Toolbar',
  component: ToolbarDemo,
  args: {
    template: 'Styled',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolbarDemo> & {
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
    components: { ToolbarDemo },
    setup() {
      return { args }
    },
    template: `
      <ToolbarDemo v-bind="args" />
    `,
  }),
}
