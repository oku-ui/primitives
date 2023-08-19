import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuCollectionProps } from './CollectionDemo.vue'
import OkuCollectionComponent from './CollectionDemo.vue'

interface StoryProps extends OkuCollectionProps {
}

const meta = {
  title: 'Utilities/Collection',
  component: OkuCollectionComponent,
  args: {
    template: '#1',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OkuCollectionComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Basic: Story = {
  args: {
    template: '#1',
  },
  render: (args: any) => ({
    components: { OkuCollectionComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuCollectionComponent v-bind="args" />
    `,
  }),
}

export const WithElementInBetween: Story = {
  args: {
    template: '#2',
  },
  render: (args: any) => ({
    components: { OkuCollectionComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuCollectionComponent v-bind="args" />
    `,
  }),
}

export const WithWrappedItem: Story = {
  args: {
    template: '#3',
  },
  render: (args: any) => ({
    components: { OkuCollectionComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuCollectionComponent v-bind="args" />
    `,
  }),
}

export const WithFragment: Story = {
  args: {
    template: '#4',
  },
  render: (args: any) => ({
    components: { OkuCollectionComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuCollectionComponent v-bind="args" />
    `,
  }),
}

export const DynamicInsertion: Story = {
  args: {
    template: '#5',
  },
  render: (args: any) => ({
    components: { OkuCollectionComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuCollectionComponent v-bind="args" />
    `,
  }),
}
