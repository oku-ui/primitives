import type { Meta, StoryObj } from '@storybook/vue3'
import type { IPortalProps } from './PortalDemo.vue'
import OkuPortalComponent from './PortalDemo.vue'

interface StoryProps extends IPortalProps {}

const meta = {
  title: 'Utilities/Portal',
  component: OkuPortalComponent,
  args: {
    template: '#1',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OkuPortalComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Base: Story = {
  args: {
    template: '#1',
  },

  render: (args: any) => ({
    components: { OkuPortalComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuPortalComponent v-bind="args" />
    `,
  }),
}
