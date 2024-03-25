import type { Meta, StoryObj } from '@storybook/vue3'
import OkuTabsComponent from './RadioGroupDemo.vue'

const meta = {
  title: 'Components/RadioGroup',
  component: OkuTabsComponent,
  args: {
    template: 'styled',
  },

} satisfies Meta<typeof OkuTabsComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Styled: Story = {
  args: {
    template: 'styled',
    // allshow: true,
  },
  render: (args: any) => ({
    components: { OkuTabsComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuTabsComponent v-bind="args" />
    `,
  }),
}
export const Controlled: Story = {
  args: {
    template: 'controlled',
    // allshow: true,
  },
  render: (args: any) => ({
    components: { OkuTabsComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuTabsComponent v-bind="args" />
    `,
  }),
}

export const Unset: Story = {
  args: {
    template: 'unset',
    // allshow: true,
  },
  render: (args: any) => ({
    components: { OkuTabsComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuTabsComponent v-bind="args" />
    `,
  }),
}

export const WithinForm: Story = {
  args: {
    template: 'within-form',
    // allshow: true,
  },
  render: (args: any) => ({
    components: { OkuTabsComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuTabsComponent v-bind="args" />
    `,
  }),
}

export const Animated: Story = {
  args: {
    template: 'animated',
    // allshow: true,
  },
  render: (args: any) => ({
    components: { OkuTabsComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuTabsComponent v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'chromatic',
    // allshow: true,
  },
  render: (args: any) => ({
    components: { OkuTabsComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuTabsComponent v-bind="args" />
    `,
  }),
}
