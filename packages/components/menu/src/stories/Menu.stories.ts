import type { Meta, StoryObj } from '@storybook/vue3'

import type { IMenuProps } from './MenuDemo.vue'
import OkuMenu from './MenuDemo.vue'

interface StoryProps extends IMenuProps {
}

const meta = {
  title: 'Utilities/Menu',
  component: OkuMenu,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuMenu> & {
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
    components: { OkuMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuMenu v-bind="args" />
    `,
  }),
}

export const Submenus: Story = {
  args: {
    template: 'Submenus',
  },
  render: (args: any) => ({
    components: { OkuMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuMenu v-bind="args" />
    `,
  }),
}

export const WithLabels: Story = {
  args: {
    template: 'WithLabels',
  },
  render: (args: any) => ({
    components: { OkuMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuMenu v-bind="args" />
    `,
  }),
}

export const Typeahead: Story = {
  args: {
    template: 'Typeahead',
  },
  render: (args: any) => ({
    components: { OkuMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuMenu v-bind="args" />
    `,
  }),
}

export const CheckboxItems: Story = {
  args: {
    template: 'CheckboxItems',
  },
  render: (args: any) => ({
    components: { OkuMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuMenu v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false },
  },
}

export const RadioItems: Story = {
  args: {
    template: 'RadioItems',
  },
  render: (args: any) => ({
    components: { OkuMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuMenu v-bind="args" />
    `,
  }),
}

export const Animated: Story = {
  args: {
    template: 'Animated',
  },
  render: (args: any) => ({
    components: { OkuMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuMenu v-bind="args" />
    `,
  }),
}
