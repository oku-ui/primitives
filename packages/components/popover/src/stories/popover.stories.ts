import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuPopoverProps } from './PopoverDemo.vue'
import PopoverDemo from './PopoverDemo.vue'

interface StoryProps extends OkuPopoverProps {
}

const meta = {
  title: 'Components/Popover',
  component: PopoverDemo,
  args: {
    template: 'Styled',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
} satisfies Meta<typeof PopoverDemo> & {
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
    components: { PopoverDemo },
    setup() {
      return { args }
    },
    template: `
      <PopoverDemo v-bind="args" />
    `,
  }),
}

export const Boundary: Story = {
  args: {
    template: 'Boundary',
  },
  render: (args: any) => ({
    components: { PopoverDemo },
    setup() {
      return { args }
    },
    template: `
      <PopoverDemo v-bind="args" />
    `,
  }),
}

export const Modality: Story = {
  args: {
    template: 'Modality',
  },
  render: (args: any) => ({
    components: { PopoverDemo },
    setup() {
      return { args }
    },
    template: `
      <PopoverDemo v-bind="args" />
    `,
  }),
}

export const Controlled: Story = {
  args: {
    template: 'Controlled',
  },
  render: (args: any) => ({
    components: { PopoverDemo },
    setup() {
      return { args }
    },
    template: `
      <PopoverDemo v-bind="args" />
    `,
  }),
}

export const VControlled: Story = {
  args: {
    template: 'VControlled',
  },
  render: (args: any) => ({
    components: { PopoverDemo },
    setup() {
      return { args }
    },
    template: `
      <PopoverDemo v-bind="args" />
    `,
  }),
}

export const Animated: Story = {
  args: {
    template: 'Animated',
  },
  render: (args: any) => ({
    components: { PopoverDemo },
    setup() {
      return { args }
    },
    template: `
      <PopoverDemo v-bind="args" />
    `,
  }),
}

export const ForcedMount: Story = {
  args: {
    template: 'ForcedMount',
  },
  render: (args: any) => ({
    components: { PopoverDemo },
    setup() {
      return { args }
    },
    template: `
      <PopoverDemo v-bind="args" />
    `,
  }),
}

export const Nested: Story = {
  args: {
    template: 'Nested',
  },
  render: (args: any) => ({
    components: { PopoverDemo },
    setup() {
      return { args }
    },
    template: `
      <PopoverDemo v-bind="args" />
    `,
  }),
}
