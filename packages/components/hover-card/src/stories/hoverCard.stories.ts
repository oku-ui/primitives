import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuHoverCardProps } from './HoverCardDemo.vue'
import HoverCardDemo from './HoverCardDemo.vue'

interface StoryProps extends OkuHoverCardProps {
}

const meta = {
  title: 'Components/HoverCard',
  component: HoverCardDemo,
  args: {
    template: 'basic',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCardDemo> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Basic: Story = {
  args: {
    template: 'basic',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}

export const ContainTextSelection: Story = {
  args: {
    template: 'ContainTextSelection',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}

export const AsyncUpdate: Story = {
  args: {
    template: 'AsyncUpdate',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}

export const CustomDurations: Story = {
  args: {
    template: 'CustomDurations',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}

export const Controlled: Story = {
  args: {
    template: 'Controlled',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}

export const Layerable: Story = {
  args: {
    template: 'Layerable',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}

export const Animated: Story = {
  args: {
    template: 'Animated',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}

export const ForcedMount: Story = {
  args: {
    template: 'ForcedMount',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}

export const Nested: Story = {
  args: {
    template: 'Nested',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}

export const NonPortal: Story = {
  args: {
    template: 'NonPortal',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}

export const WithSlottedTrigger: Story = {
  args: {
    template: 'WithSlottedTrigger',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}

export const WithSlottedContent: Story = {
  args: {
    template: 'WithSlottedContent',
  },
  render: (args: any) => ({
    components: { HoverCardDemo },
    setup() {
      return { args }
    },
    template: `
      <HoverCardDemo v-bind="args" />
    `,
  }),
}
