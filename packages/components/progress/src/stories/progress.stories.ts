import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuProgressProps } from './ProgressDemo.vue'
import OkuProgressComponent from './ProgressDemo.vue'

interface StoryProps extends OkuProgressProps {
}

const meta = {
  title: 'Components/Progress',
  tags: ['autodocs'],
  args: {},
  component: OkuProgressComponent,
} satisfies Meta<typeof OkuProgressComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    template: '#1',
    allshow: false,
  },
  render: (args: any) => ({
    components: { OkuProgressComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuProgressComponent v-bind="args" />
    `,
  }),
}
export const Chromatic: Story = {
  args: {
    template: '#2',
    allshow: false,
  },
  render: (args: any) => ({
    components: { OkuProgressComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuProgressComponent v-bind="args" />
    `,
  }),
}
