import type { Meta, StoryObj } from '@storybook/vue3'

import type { IAvatarPropsProps } from './AvatarDemo.vue'
import AvatarDemoComponent from './AvatarDemo.vue'

interface StoryProps extends IAvatarPropsProps {
}

const meta = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  args: {
    template: '#1',
  },
} satisfies Meta<typeof AvatarDemoComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    template: '#1',
    allshow: true,
  },
  render: (args: any) => ({
    components: { AvatarDemoComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarDemoComponent v-bind="args" />
    `,
  }),
}

export const Template1: Story = {
  args: {
    template: '#3',
  },
  render: (args: any) => ({
    components: { AvatarDemoComponent },
    setup() {
      return { args }
    },
    template: `
      <AvatarDemoComponent v-bind="args" />
    `,
  }),
}
