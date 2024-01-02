import type { Meta, StoryObj } from '@storybook/vue3'

import type { IVisuallyHiddenProps } from './VisuallyHiddenDemo.vue'
import OkuVisuallyHidden from './VisuallyHiddenDemo.vue'

interface StoryProps extends IVisuallyHiddenProps { }

const meta = {
  title: 'utilities/visuallyHidden',
  component: OkuVisuallyHidden,
  args: {
    template: 'Basic',
  },
} satisfies Meta<typeof OkuVisuallyHidden> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Basic: Story = {
  args: {
    template: 'Basic',
  },
  render: args => ({
    components: { OkuVisuallyHidden },
    setup() {
      return { args }
    },
    template: `
      <OkuVisuallyHidden v-bind="args" />
    `,
  }),
}
