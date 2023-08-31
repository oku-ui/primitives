import type { Meta, StoryObj } from '@storybook/vue3'

import type { IToastProps } from './ToastDemo.vue'
import OkuToastComponent from './ToastDemo.vue'

interface StoryProps extends IToastProps { }

const meta = {
  title: 'Components/Toast',
  component: OkuToastComponent,
  tags: ['autodocs'],
  args: {
    template: '#1',
  },
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

export const Controlled: Story = {
  args: {
    template: '#2',
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

// export const FromDialog: Story = {
//   args: {
//     template: '#3',
//   },
//   render: (args: any) => ({
//     components: { OkuToastComponent },
//     setup() {
//       return { args }
//     },
//     template: `
//       <OkuToastComponent v-bind="args" />
//     `,
//   }),
// }

export const Promise: Story = {
  args: {
    template: '#4',
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

export const KeyChange: Story = {
  args: {
    template: '#5',
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

export const PauseResumeProps: Story = {
  args: {
    template: '#6',
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

export const Animated: Story = {
  args: {
    template: '#7',
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

export const Cypress: Story = {
  args: {
    template: '#8',
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
