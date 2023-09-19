import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuAlertDialogProps } from './AlertDialogDemo.vue'
import OkuAlertDialogComponent from './AlertDialogDemo.vue'

interface StoryProps extends OkuAlertDialogProps {
}

const meta = {
  title: 'Components/AlertDialog',
  component: OkuAlertDialogComponent,
  args: {
    template: 'Styled',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
} satisfies Meta<typeof OkuAlertDialogComponent> & {
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
    components: { OkuAlertDialogComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuAlertDialogComponent v-bind="args" />
    `,
  }),
}
