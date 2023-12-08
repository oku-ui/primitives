import type { Meta, StoryObj } from '@storybook/vue3'

import type { IContextMenuProps } from './ContextMenuDemo.vue'
import OkuContextMenu from './ContextMenuDemo.vue'

interface StoryProps extends IContextMenuProps {
}

const meta = {
  title: 'components/ContextMenu',
  component: OkuContextMenu,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuContextMenu> & {
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
    components: { OkuContextMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuContextMenu v-bind="args" />
    `,
  }),
}

export const Modality: Story = {
  args: {
    template: 'Modality',
  },
  render: (args: any) => ({
    components: { OkuContextMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuContextMenu v-bind="args" />
    `,
  }),
}

export const Submenus: Story = {
  args: {
    template: 'Submenus',
  },
  render: (args: any) => ({
    components: { OkuContextMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuContextMenu v-bind="args" />
    `,
  }),
}

export const WithLabels: Story = {
  args: {
    template: 'WithLabels',
  },
  render: (args: any) => ({
    components: { OkuContextMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuContextMenu v-bind="args" />
    `,
  }),
}

export const CheckboxItems: Story = {
  args: {
    template: 'CheckboxItems',
  },
  render: (args: any) => ({
    components: { OkuContextMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuContextMenu v-bind="args" />
    `,
  }),
}

export const RadioItems: Story = {
  args: {
    template: 'RadioItems',
  },
  render: (args: any) => ({
    components: { OkuContextMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuContextMenu v-bind="args" />
    `,
  }),
}

export const PreventClosing: Story = {
  args: {
    template: 'PreventClosing',
  },
  render: (args: any) => ({
    components: { OkuContextMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuContextMenu v-bind="args" />
    `,
  }),
}

export const Multiple: Story = {
  args: {
    template: 'Multiple',
  },
  render: (args: any) => ({
    components: { OkuContextMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuContextMenu v-bind="args" />
    `,
  }),
}

export const Nested: Story = {
  args: {
    template: 'Nested',
  },
  render: (args: any) => ({
    components: { OkuContextMenu },
    setup() {
      return { args }
    },
    template: `
      <OkuContextMenu v-bind="args" />
    `,
  }),
}
