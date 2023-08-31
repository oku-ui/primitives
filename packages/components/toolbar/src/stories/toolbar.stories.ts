import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuLabelProps } from './ToolbarDemo.vue'
import OkuToolbarComponent from './ToolbarDemo.vue'

interface StoryProps extends OkuLabelProps {
}

const meta = {
  title: 'Components/Toolbar',
  component: OkuToolbarComponent,
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
} satisfies Meta<typeof OkuToolbarComponent> & {
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
    components: { OkuToolbarComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuToolbarComponent v-bind="args" />
    `,
  }),
}

export const WithControl: Story = {
  args: {
    label: 'Label',
    template: '#2',
  },
  render: (args: any) => ({
    components: { OkuToolbarComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuToolbarComponent v-bind="args" />
    `,
  }),
}
