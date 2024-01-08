import type { Meta, StoryObj } from '@storybook/vue3'

import type { ICheckBoxProps } from './RovingFocusDemo.vue'
import RovingFocusComponent from './RovingFocusDemo.vue'

interface StoryProps extends ICheckBoxProps {
}

const meta = {
  title: 'Utilities/RovingFocusGroup',
  args: {
    template: '#1',
  },
  component: RovingFocusComponent,

} satisfies Meta<typeof RovingFocusComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Basic: Story = {
  args: {
    template: '#1',
    allshow: true,
  },
  render: (args: any) => ({
    components: { RovingFocusComponent },
    setup() {
      return { args }
    },
    template: `
      <RovingFocusComponent v-bind="args" />
    `,
  }),
}

export const Nested: Story = {
  args: {
    template: '#2',
    allshow: false,
  },
  render: (args: any) => ({
    components: { RovingFocusComponent },
    setup() {
      return { args }
    },
    template: `
      <RovingFocusComponent v-bind="args" />
    `,
  }),
}

export const EdgeCases: Story = {
  args: {
    template: '#3',
    allshow: false,
  },
  render: (args: any) => ({
    components: { RovingFocusComponent },
    setup() {
      return { args }
    },
    template: `
      <RovingFocusComponent v-bind="args" />
    `,
  }),
}
