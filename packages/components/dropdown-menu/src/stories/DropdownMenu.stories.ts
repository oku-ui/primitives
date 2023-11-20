import type { Meta, StoryObj } from '@storybook/vue3'

import type { IDropdownMenuProps } from './DropdownMenuDemo.vue'
import OkuDropdownMenu from './DropdownMenuDemo.vue'

interface StoryProps extends IDropdownMenuProps {
}

const meta = {
  title: 'Components/DropdownMenu',
  component: OkuDropdownMenu,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuDropdownMenu> & {
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
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
    `,
  }),
}

export const Modality: Story = {
  args: {
    template: 'Modality',
  },
  render: (args: any) => ({
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
    `,
  }),
}

export const Submenus: Story = {
  args: {
    template: 'Submenus',
  },
  render: (args: any) => ({
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
    `,
  }),
}

export const WithLabels: Story = {
  args: {
    template: 'WithLabels',
  },
  render: (args: any) => ({
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
      `,
  }),
}

export const NestedComposition: Story = {
  args: {
    template: 'NestedComposition',
  },
  render: (args: any) => ({
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
    `,
  }),
}

export const SingleItemAsDialogTrigger: Story = {
  args: {
    template: 'SingleItemAsDialogTrigger',
  },
  render: (args: any) => ({
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
    `,
  }),
}

export const MultipleItemsAsDialogTriggers: Story = {
  args: {
    template: 'MultipleItemsAsDialogTriggers',
  },
  render: (args: any) => ({
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
    `,
  }),
}

export const CheckboxItems: Story = {
  args: {
    template: 'CheckboxItems',
  },
  render: (args: any) => ({
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
    `,
  }),
}

export const RadioItems: Story = {
  args: {
    template: 'RadioItems',
  },
  render: (args: any) => ({
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
    `,
  }),
}

export const PreventClosing: Story = {
  args: {
    template: 'PreventClosing',
  },
  render: (args: any) => ({
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
    `,
  }),
}

export const WithTooltip: Story = {
  args: {
    template: 'WithTooltip',
  },
  render: (args: any) => ({
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
    `,
  }),
}

export const InPopupWindow: Story = {
  args: {
    template: 'InPopupWindow',
  },
  render: (args: any) => ({
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'Chromatic',
  },
  render: (args: any) => ({
    components: { OkuDropdownMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuDropdownMenu v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false },
  },
}
