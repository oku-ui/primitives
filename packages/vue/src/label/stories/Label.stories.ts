import type { Meta, StoryObj } from '@storybook/vue3'

import type { ILabelProps } from './LabelDemo.vue'
import OkuLabel from './LabelDemo.vue'

interface StoryProps extends ILabelProps { }

const meta = {
  title: 'Components/Label',
  component: OkuLabel,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuLabel> & {
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
    components: { OkuLabel },
    setup() {
      return { args }
    },
    template: `
      <OkuLabel v-bind="args" />
    `,
  }),
}

export const WithControl: Story = {
  args: {
    template: 'WithControl',
  },
  render: (args: any) => ({
    components: { OkuLabel },
    setup() {
      return { args }
    },
    template: `
      <OkuLabel v-bind="args" />
    `,
  }),
}
