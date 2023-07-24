import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuAnnounceProps } from './AnnounceDemo.vue'

import OkuAnnounceComponent from './AnnounceDemo.vue'

interface StoryProps extends OkuAnnounceProps {
}

const meta = {
  title: 'Utilities/Announce',
  component: OkuAnnounceComponent,
  args: {
    template: '#1',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OkuAnnounceComponent> & {
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
    components: { OkuAnnounceComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuAnnounceComponent v-bind="args" />
    `,
  }),
}

export const StatusChange: Story = {
  args: {
    template: '#2',
  },
  render: (args: any) => ({
    components: { OkuAnnounceComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuAnnounceComponent v-bind="args" />
    `,
  }),
}
