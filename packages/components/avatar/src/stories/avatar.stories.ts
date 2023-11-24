import type { Meta, StoryObj } from '@storybook/vue3'

import type { IAvatarProps } from './AvatarDemo.vue'
import OkuAvatar from './AvatarDemo.vue'

interface StoryProps extends IAvatarProps { }

const meta = {
  title: 'Components/Avatar',
  component: OkuAvatar,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuAvatar> & {
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
    components: { OkuAvatar },
    setup() {
      return { args }
    },
    template: `
      <OkuAvatar v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'Chromatic',
  },
  render: (args: any) => ({
    components: { OkuAvatar },
    setup() {
      return { args }
    },
    template: `
      <OkuAvatar v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false, delay: 1000 },
  },
}
