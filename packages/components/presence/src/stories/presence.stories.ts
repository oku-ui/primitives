import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuLabelProps } from './PresenceDemo.vue'
import OkuPresenceComponent from './PresenceDemo.vue'

interface StoryProps extends OkuLabelProps {
}

const meta = {
  title: 'Utilities/Presence',
  component: OkuPresenceComponent,
  args: {
    label: 'Label',
    template: '#1',
  },
  argTypes: {
    label: {
      control: 'text',
    },
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

export const Styled: Story = {
  args: {
    label: 'Label',
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

export const Transition: Story = {
  args: {
    label: 'Label',
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

export const WithDeferredMountAnimation: Story = {
  args: {
    label: 'Label',
    template: '#3',
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
