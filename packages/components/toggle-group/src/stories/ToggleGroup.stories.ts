import type { Meta, StoryObj } from '@storybook/vue3'

import type { IToggleGroupProps } from './ToggleGroupDemo.vue'
import OkuToggleGroup from './ToggleGroupDemo.vue'

interface StoryProps extends IToggleGroupProps { }

const meta = {
  title: 'Components/ToggleGroup',
  component: OkuToggleGroup,
  args: {
    template: 'Single',
  },
} satisfies Meta<typeof OkuToggleGroup> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Single: Story = {
  args: {
    template: 'Single',
  },
  render: (args: any) => ({
    components: { OkuToggleGroup },
    setup() {
      return { args }
    },
    template: `
      <OkuToggleGroup v-bind="args" />
    `,
  }),
}

export const Vertical: Story = {
  args: {
    template: 'Vertical',
  },
  render: (args: any) => ({
    components: { OkuToggleGroup },
    setup() {
      return { args }
    },
    template: `
      <OkuToggleGroup v-bind="args" />
    `,
  }),
}

export const Multiple: Story = {
  args: {
    template: 'Multiple',
  },
  render: (args: any) => ({
    components: { OkuToggleGroup },
    setup() {
      return { args }
    },
    template: `
      <OkuToggleGroup v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'Chromatic',
  },
  render: (args: any) => ({
    components: { OkuToggleGroup },
    setup() {
      return { args }
    },
    template: `
      <OkuToggleGroup v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false },
  },
}
