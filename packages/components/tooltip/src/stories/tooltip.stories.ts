import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuLabelProps } from './TooltipDemo.vue'
import OkuTooltipComponent from './TooltipDemo.vue'

interface StoryProps extends OkuLabelProps {
}

const meta = {
  title: 'Components/Tooltip',
  component: OkuTooltipComponent,
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
} satisfies Meta<typeof OkuTooltipComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    label: 'Label',
    template: 'Styled',
  },
  render: (args: any) => ({
    components: { OkuTooltipComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuTooltipComponent v-bind="args" />
    `,
  }),
}

export const Controlled: Story = {
  args: {
    label: 'Label',
    template: 'Controlled',
  },
  render: (args: any) => ({
    components: { OkuTooltipComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuTooltipComponent v-bind="args" />
    `,
  }),
}

export const CustomDurations: Story = {
  args: {
    label: 'Label',
    template: 'CustomDurations',
  },
  render: (args: any) => ({
    components: { OkuTooltipComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuTooltipComponent v-bind="args" />
    `,
  }),
}
