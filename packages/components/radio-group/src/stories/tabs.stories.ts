import type { Meta, StoryObj } from '@storybook/vue3'

import type { ITabsProps } from './RadioGroupDemo.vue'
import OkuTabsComponent from './RadioGroupDemo.vue'

interface StoryProps extends ITabsProps { }

const meta = {
  title: 'Components/RadioGroup',
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
