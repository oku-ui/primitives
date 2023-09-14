import type { Meta, StoryObj } from '@storybook/vue3'

import type { Props } from './PopperDemo.vue'

import OkuToggleComponent from './PopperDemo.vue'

interface StoryProps extends Props {

}

const meta = {
  title: 'Utilities/Popper',
  args: {
    template: 'Styled',
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
    template: 'Styled',
    allshow: true,
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

export const WithCustomArrow: Story = {
  args: {
    template: 'WithCustomArrow',
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

export const Animated: Story = {
  args: {
    template: 'Animated',
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
