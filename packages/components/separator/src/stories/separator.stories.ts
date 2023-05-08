import type { Meta, StoryObj } from '@storybook/vue3'

import OkuSeparatorComponent from './SeparatorDemo.vue'
import type { ISeparatorProps } from './SeparatorDemo.vue'

interface StoryProps extends ISeparatorProps {
}

const meta = {
  title: 'Components/Separator',
  component: OkuSeparatorComponent,
  args: {
    template: '#1',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OkuSeparatorComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Primary: Story = {
  args: {
  },
  render: (args: any) => ({
    components: { OkuSeparatorComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuSeparatorComponent v-bind="args" />
    `,
  }),
}
