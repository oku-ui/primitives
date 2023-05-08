import type { Meta, StoryObj } from '@storybook/vue3'

import type { IAspectRatioProps } from './AspectRatioDemo.vue'
import OkuAspectRatioComponent from './AspectRatioDemo.vue'

interface StoryProps extends IAspectRatioProps {
}

const meta = {
  title: 'Components/AspectRatio',
  component: OkuAspectRatioComponent,
  tags: ['autodocs'],
  args: {
    ratio: 0.5,
    template: '#1',
    imageurl: 'https://images.unsplash.com/photo-1682923875240-3ef0a52a9e7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
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
    imageurl: 'https://images.unsplash.com/photo-1682923875240-3ef0a52a9e7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    allShow: true,
  },
  render: (args: any) => ({
    components: { OkuAspectRatioComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuAspectRatioComponent v-bind="args" />
    `,
  }),
}
