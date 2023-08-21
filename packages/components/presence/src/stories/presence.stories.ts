import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuPresenceProps } from './PresenceDemo.vue'
import OkuPresenceComponent from './PresenceDemo.vue'

interface StoryProps extends OkuPresenceProps {
}

const meta = {
  title: 'Utilities/Presence',
  component: OkuPresenceComponent,
  args: {
    template: '#1',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OkuPresenceComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Basic: Story = {
  args: {
    template: '#1',
  },
  render: (args: any) => ({
    components: { OkuPresenceComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuPresenceComponent v-bind="args" />
    `,
  }),
}

// TODO: Visibility cannot trigger animation
export const WithAnimation: Story = {
  args: {
    template: '#2',
  },
  render: (args: any) => ({
    components: { OkuPresenceComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuPresenceComponent v-bind="args" />
    `,
  }),
}
