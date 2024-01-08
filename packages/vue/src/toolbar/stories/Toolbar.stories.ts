import type { Meta, StoryObj } from '@storybook/vue3'

import type { IToolbarProps } from './ToolbarDemo.vue'
import OkuToolbar from './ToolbarDemo.vue'

interface StoryProps extends IToolbarProps { }

const meta = {
  title: 'Components/Toolbar',
  component: OkuToolbar,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuToolbar> & {
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
    components: { OkuToolbar },
    setup() {
      return { args }
    },
    template: `
      <OkuToolbar v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'Chromatic',
  },
  render: (args: any) => ({
    components: { OkuToolbar },
    setup() {
      return { args }
    },
    template: `
      <OkuToolbar v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false },
  },
}
