import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuDialogProps } from './DialogDemo.vue'
import OkuDialogComponent from './DialogDemo.vue'

interface StoryProps extends OkuDialogProps {
}

const meta = {
  title: 'Components/Dialog',
  component: OkuDialogComponent,
  args: {
    template: 'Styled',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OkuDialogComponent> & {
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
    components: { OkuDialogComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDialogComponent v-bind="args" />
    `,
  }),
}
export const NonModal: Story = {
  args: {
    template: 'NonModal',
  },
  render: (args: any) => ({
    components: { OkuDialogComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDialogComponent v-bind="args" />
    `,
  }),
}
export const Controlled: Story = {
  args: {
    template: 'Controlled',
  },
  render: (args: any) => ({
    components: { OkuDialogComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDialogComponent v-bind="args" />
    `,
  }),
}
export const FocusTrap: Story = {
  args: {
    template: 'FocusTrap',
  },
  render: (args: any) => ({
    components: { OkuDialogComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDialogComponent v-bind="args" />
    `,
  }),
}
export const CustomFocus: Story = {
  args: {
    template: 'CustomFocus',
  },
  render: (args: any) => ({
    components: { OkuDialogComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuDialogComponent v-bind="args" />
    `,
  }),
}
