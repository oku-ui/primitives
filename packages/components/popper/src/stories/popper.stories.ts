import type { Meta, StoryObj } from '@storybook/vue3'

import type { IPopperProps } from './PopperDemo.vue'

import OkuToggleComponent from './PopperDemo.vue'

interface StoryProps extends IPopperProps {

}

const meta = {
  title: 'Components/Popper',
  args: {
    template: '#1',
  },
  component: OkuToggleComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof OkuToggleComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    template: '#1',
    allShow: true,
  },

  render: (args: any) => ({
    components: { OkuToggleComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuToggleComponent v-bind="args" />
    `,
  }),
}

export const CustomArrow: Story = {
  args: {
    template: '#2',
  },

  render: (args: any) => ({
    components: { OkuToggleComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuToggleComponent v-bind="args" />
    `,
  }),
}
