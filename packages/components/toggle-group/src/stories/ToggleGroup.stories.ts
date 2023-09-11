import type { Meta, StoryObj } from '@storybook/vue3'

import type { ITabsProps } from './ToggleGroupDemo.vue'
import OkuToggleGroupComponent from './ToggleGroupDemo.vue'

interface StoryProps extends ITabsProps { }

const meta = {
  title: 'Components/ToggleGroup',
  component: OkuToggleGroupComponent,
  args: {
    template: '#1',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OkuToggleGroupComponent> & {
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
    components: { OkuToggleGroupComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuToggleGroupComponent v-bind="args" />
    `,
  }),
}
