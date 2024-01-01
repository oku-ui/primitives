import type { Meta, StoryObj } from '@storybook/vue3'

import type { ICollapsibleProps } from './CollapsibleDemo.vue'
import OkuCollapsible from './CollapsibleDemo.vue'

interface StoryProps extends ICollapsibleProps { }

const meta = {
  title: 'Components/Collapsible',
  component: OkuCollapsible,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuCollapsible> & {
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
    components: { OkuCollapsible },
    setup() {
      return { args }
    },
    template: `
      <OkuCollapsible v-bind="args" />
    `,
  }),
}

export const Controlled: Story = {
  args: {
    template: 'Controlled',
  },
  render: (args: any) => ({
    components: { OkuCollapsible },
    setup() {
      return { args }
    },
    template: `
      <OkuCollapsible v-bind="args" />
    `,
  }),
}

export const Animated: Story = {
  args: {
    template: 'Animated',
  },
  render: (args: any) => ({
    components: { OkuCollapsible },
    setup() {
      return { args }
    },
    template: `
      <OkuCollapsible v-bind="args" />
    `,
  }),
}

export const AnimatedHorizontal: Story = {
  args: {
    template: 'AnimatedHorizontal',
  },
  render: (args: any) => ({
    components: { OkuCollapsible },
    setup() {
      return { args }
    },
    template: `
      <OkuCollapsible v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'Chromatic',
  },
  render: (args: any) => ({
    components: { OkuCollapsible },
    setup() {
      return { args }
    },
    template: `
      <OkuCollapsible v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false },
  },
}
