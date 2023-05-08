import type { Meta, StoryObj } from '@storybook/vue3'

import type { ICheckBoxProps } from './CheckboxDemo.vue'
import OkuCheckboxComponent from './CheckboxDemo.vue'

interface StoryProps extends ICheckBoxProps {
}

const meta = {
  title: 'Components/Checkbox',
  args: {
    template: '#1',
  },
  component: OkuCheckboxComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof OkuCheckboxComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    template: '#1',
    allshow: true,
  },
  render: (args: any) => ({
    components: { OkuCheckboxComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuCheckboxComponent v-bind="args" />
    `,
  }),
}
