import type { Meta, StoryObj } from '@storybook/vue3'
import type { IVisuallyHiddenProps } from './VisuallyHiddenDemo.vue'
import OkuVisuallyHiddenComponent from './VisuallyHiddenDemo.vue'

interface StoryProps extends IVisuallyHiddenProps {}

const meta = {
  title: 'Utilities/VisuallyHidden',
  component: OkuVisuallyHiddenComponent,
  args: {
    template: '#1',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },

} satisfies Meta<typeof OkuVisuallyHiddenComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    template: '#1',
    // allshow: true,
  },

  render: (args: any) => ({
    components: { OkuVisuallyHiddenComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuVisuallyHiddenComponent v-bind="args" />
    `,
  }),
}
