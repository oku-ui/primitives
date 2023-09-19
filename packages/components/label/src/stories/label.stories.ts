import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuLabelProps } from './LabelDemo.vue'
import OkuLabelComponent from './LabelDemo.vue'

interface StoryProps extends OkuLabelProps {
}

const meta = {
  title: 'Components/Label',
  component: OkuLabelComponent,
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

} satisfies Meta<typeof OkuLabelComponent> & {
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
    components: { OkuLabelComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuLabelComponent v-bind="args" />
    `,
  }),
}

export const WithControl: Story = {
  args: {
    label: 'Label',
    template: '#2',
  },
  render: (args: any) => ({
    components: { OkuLabelComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuLabelComponent v-bind="args" />
    `,
  }),
}
