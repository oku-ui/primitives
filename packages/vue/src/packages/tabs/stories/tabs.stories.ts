import type { Meta, StoryObj } from '@storybook/vue3'

import type { ITabsProps } from './TabsDemo.vue'
import OkuTabsComponent from './TabsDemo.vue'

interface StoryProps extends ITabsProps { }

const meta = {
  title: 'Components/Tabs',
  component: OkuTabsComponent,
  args: {
    template: '#1',
  },

} satisfies Meta<typeof OkuTabsComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta>

export const Styled: Story = {
  args: {
    template: '#1',
    // allshow: true,
  },
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
  args: {
    template: '#2',
    // allshow: true,
  },

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

export const Form: Story = {
  args: {
    template: '#3',
    // allshow: true,
  },

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
