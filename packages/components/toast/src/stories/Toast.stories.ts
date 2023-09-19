import type { Meta, StoryObj } from '@storybook/vue3'

import type { IToastProps } from './ToastDemo.vue'
import OkuToastComponent from './ToastDemo.vue'

interface StoryProps extends IToastProps { }

const meta = {
  title: 'Components/Toast',
  component: OkuToastComponent,
  tags: ['autodocs'],
  args: {
    template: 'Styled',
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
    template: 'Styled',
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
    template: 'Controlled',
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

export const FromDialog: Story = {
  args: {
    template: 'FromDialog',
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

export const Promise: Story = {
  args: {
    template: 'Promise',
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
    template: 'KeyChange',
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
    template: 'PauseResumeProps',
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
    template: 'Animated',
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
    template: 'Cypress',
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
    template: 'Chromatic',
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
