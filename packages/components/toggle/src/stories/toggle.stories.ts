import type { Meta, StoryObj } from '@storybook/vue3'

import type { IToggleProps } from './ToggleDemo.vue'

import OkuToggleComponent from './ToggleDemo.vue'

interface StoryProps extends IToggleProps {

}

const meta = {
  title: 'Components/Toggle',
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

export const Template1: Story = {
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
