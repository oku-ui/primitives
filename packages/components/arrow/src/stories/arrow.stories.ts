import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuArrowProps } from './ArrowDemo.vue'
import OkuArrowComponent from './ArrowDemo.vue'

interface StoryProps extends OkuArrowProps {
}

const meta = {
  title: 'Utilities/Arrow',
  component: OkuArrowComponent,
  args: {
    template: '#1',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OkuArrowComponent> & {
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
    components: { OkuArrowComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuArrowComponent v-bind="args" />
    `,
  }),
}

export const CustomSize: Story = {
  args: {
    template: '#2',
  },
  render: (args: any) => ({
    components: { OkuArrowComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuArrowComponent v-bind="args" />
    `,
  }),
}

export const CustomArrow: Story = {
  args: {
    template: '#3',
  },
  render: (args: any) => ({
    components: { OkuArrowComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuArrowComponent v-bind="args" />
    `,
  }),
}
