import type { Meta, StoryObj } from '@storybook/vue3'

import type { IToastProps } from './ToastDemo.vue'
import OkuToast from './ToastDemo.vue'

interface StoryProps extends IToastProps { }

const meta = {
  title: 'Components/Toast',
  component: OkuToast,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuToast> & {
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
  render: args => ({
    components: { OkuToast },
    setup() {
      return { args }
    },
    template: `
      <OkuToast v-bind="args" />
    `,
  }),
}

export const Controlled: Story = {
  args: {
    template: 'Controlled',
  },
  render: args => ({
    components: { OkuToast },
    setup() {
      return { args }
    },
    template: `
      <OkuToast v-bind="args" />
    `,
  }),
}

export const FromDialog: Story = {
  args: {
    template: 'FromDialog',
  },
  render: args => ({
    components: { OkuToast },
    setup() {
      return { args }
    },
    template: `
      <OkuToast v-bind="args" />
    `,
  }),
}

export const Promise: Story = {
  args: {
    template: 'Promise',
  },
  render: args => ({
    components: { OkuToast },
    setup() {
      return { args }
    },
    template: `
      <OkuToast v-bind="args" />
    `,
  }),
}

export const KeyChange: Story = {
  args: {
    template: 'KeyChange',
  },
  render: args => ({
    components: { OkuToast },
    setup() {
      return { args }
    },
    template: `
      <OkuToast v-bind="args" />
    `,
  }),
}

export const PauseResumeProps: Story = {
  args: {
    template: 'PauseResumeProps',
  },
  render: args => ({
    components: { OkuToast },
    setup() {
      return { args }
    },
    template: `
      <OkuToast v-bind="args" />
    `,
  }),
}

export const Animated: Story = {
  args: {
    template: 'Animated',
  },
  render: args => ({
    components: { OkuToast },
    setup() {
      return { args }
    },
    template: `
      <OkuToast v-bind="args" />
    `,
  }),
}

export const Cypress: Story = {
  args: {
    template: 'Cypress',
  },
  render: args => ({
    components: { OkuToast },
    setup() {
      return { args }
    },
    template: `
      <OkuToast v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'Chromatic',
  },
  render: args => ({
    components: { OkuToast },
    setup() {
      return { args }
    },
    template: `
      <OkuToast v-bind="args" />
    `,
  }),
}
