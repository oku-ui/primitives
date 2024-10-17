import type { Meta, StoryObj } from '@storybook/vue3'

import type { ISeparatorProps } from './SeparatorDemo.vue'
import OkuSeparator from './SeparatorDemo.vue'

interface StoryProps extends ISeparatorProps { }

const meta = {
  title: 'Components/Separator',
  component: OkuSeparator,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuSeparator> & {
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
    components: { OkuSeparator },
    setup() {
      return { args }
    },
    template: `
      <OkuSeparator v-bind="args" />
    `,
  }),
}
