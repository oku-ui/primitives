import type { Meta, StoryObj } from '@storybook/vue3'

import type { IToggleProps } from './ToggleDemo.vue'
import OkuToggle from './ToggleDemo.vue'

interface StoryProps extends IToggleProps { }

const meta = {
  title: 'Components/Toggle',
  component: OkuToggle,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuToggle> & {
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
  render: args => ({
    components: { OkuToggle },
    setup() {
      return { args }
    },
    template: `
      <OkuToggle v-bind="args" />
    `,
  }),
}

export const Controlled: Story = {
  args: {
    template: 'Controlled',
  },
  render: args => ({
    components: { OkuToggle },
    setup() {
      return { args }
    },
    template: `
      <OkuToggle v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'Chromatic',
  },
  render: args => ({
    components: { OkuToggle },
    setup() {
      return { args }
    },
    template: `
      <OkuToggle v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false },
  },
}
