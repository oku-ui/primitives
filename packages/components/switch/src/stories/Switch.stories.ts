import type { Meta, StoryObj } from '@storybook/vue3'
import type { ISwitchProps } from './SwitchDemo.vue'
import OkuSwitchComponent from './SwitchDemo.vue'

interface StoryProps extends ISwitchProps {}

const meta = {
  title: 'Components/Switch',
  args: {
    template: '#1',
  },
  component: OkuSwitchComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof OkuSwitchComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    template: '#1',
    // allShow: true,
  },

  render: (args: any) => ({
    components: { OkuSwitchComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuSwitchComponent v-bind="args" />
    `,
  }),
}
