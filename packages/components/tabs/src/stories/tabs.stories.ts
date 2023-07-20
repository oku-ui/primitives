import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuTabs } from '../tabs'
import OkuTabsComponent from './TabsDemo.vue'

const meta = {
  title: 'Components/Tabs',
  component: OkuTabsComponent,
  args: {
    orientation: 'horizontal',
    defaultValue: 'tab1',
  },
  tags: ['autodocs'],
} satisfies Meta<InstanceType<typeof OkuTabs>>

export default meta
type Story = StoryObj<typeof meta>

export const Styled: Story = {
  render: (args: any) => ({
    components: { OkuTabsComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuTabsComponent v-bind="args" />
    `,
  }),
}

export const Indeterminate: Story = {
  render: (args: any) => ({
    components: { OkuTabsComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuTabsComponent v-bind="args" />
    `,
  }),
}
