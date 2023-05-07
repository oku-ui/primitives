import type { Meta, StoryObj } from '@storybook/vue3'

import type { IAspectRatioProps } from './AspectRatioDemo.vue'
import OkuAspectRatioComponent from './AspectRatioDemo.vue'

interface StoryProps extends IAspectRatioProps {
}

const meta = {
  title: 'Components/OkuAspectRatio',
  component: OkuAspectRatioComponent,
  tags: ['autodocs'],
  args: {
    ratio: 'Ratio',
    template: '#1',
  },
  argTypes: {
    ratio: { type: 'number', defaultValue: '1' },
  },
} satisfies Meta<typeof OkuAspectRatioComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    ratio: 1,
    template: '#1',
  },
  render: (args: any) => ({
    components: { OkuAspectRatioComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuLabelComponent v-bind="args" />
    `,
  }),
}
