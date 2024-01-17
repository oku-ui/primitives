import type { Meta, StoryObj } from '@storybook/vue3'

import type { ISwitchProps } from './SwitchDemo.vue'
import OkuSwitch from './SwitchDemo.vue'

interface StoryProps extends ISwitchProps { }

const meta = {
  title: 'Components/Switch',
  component: OkuSwitch,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuSwitch> & {
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
    components: { OkuSwitch },
    setup() {
      return { args }
    },
    template: `
      <OkuSwitch v-bind="args" />
    `,
  }),
}

export const Controlled: Story = {
  args: {
    template: 'Controlled',
  },
  render: args => ({
    components: { OkuSwitch },
    setup() {
      return { args }
    },
    template: `
      <OkuSwitch v-bind="args" />
    `,
  }),
}

export const WithinForm: Story = {
  args: {
    template: 'WithinForm',
  },
  render: args => ({
    components: { OkuSwitch },
    setup() {
      return { args }
    },
    template: `
      <OkuSwitch v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'Chromatic',
  },
  render: args => ({
    components: { OkuSwitch },
    setup() {
      return { args }
    },
    template: `
      <OkuSwitch v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false },
  },
}
