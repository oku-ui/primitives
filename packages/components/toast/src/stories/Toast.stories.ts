import type { Meta, StoryObj } from '@storybook/vue3'

import type { IToastProps } from './ToastDemo.vue'
import OkuToastComponent from './ToastDemo.vue'

interface StoryProps extends IToastProps {}

const meta = {
  title: 'Components/Toast',
  args: {
    template: '#1',
  },
  component: OkuToastComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof OkuToastComponent> & {
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
    components: { OkuToastComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuToastComponent v-bind="args" />
    `,
  }),
}

export const Form: Story = {
  args: {
    template: '#3',
    // allShow: true,
  },

  render: (args: any) => ({
    components: { OkuToastComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuToastComponent v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: '#2',
    allshow: false,
  },
  render: (args: any) => ({
    components: { OkuToastComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuToastComponent v-bind="args" />
    `,
  }),
}
