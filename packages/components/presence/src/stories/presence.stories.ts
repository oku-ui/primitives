import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuPresenceProps } from './PresenceDemo.vue'
import OkuPresenceComponent from './PresenceDemo.vue'

interface StoryProps extends OkuPresenceProps {
}

const meta = {
  title: 'Utilities/Presence',
  component: OkuPresenceComponent,
  args: {
    template: 'Basic',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },

} satisfies Meta<typeof OkuPresenceComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Basic: Story = {
  args: {
    template: 'Basic',
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

export const WithMountAnimation: Story = {
  args: {
    template: 'WithMountAnimation',
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

export const WithUnmountAnimation: Story = {
  args: {
    template: 'WithUnmountAnimation',
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

export const WithMultipleMountAnimations: Story = {
  args: {
    template: 'WithMultipleMountAnimations',
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

export const WithOpenAndCloseAnimation: Story = {
  args: {
    template: 'WithOpenAndCloseAnimation',
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

export const WithMultipleOpenAndCloseAnimations: Story = {
  args: {
    template: 'WithMultipleOpenAndCloseAnimations',
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
    template: 'WithDeferredMountAnimation',
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
