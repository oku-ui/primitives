import type { Meta, StoryObj } from '@storybook/vue3'

import type { IScrollAreaProps } from './ScrollAreaDemo.vue'
import OkuScrollArea from './ScrollAreaDemo.vue'

interface StoryProps extends IScrollAreaProps {
}

const meta = {
  title: 'components/ScrollArea',
  component: OkuScrollArea,
  tags: ['autodocs'],
  args: {
    template: 'Basic',
  },
} satisfies Meta<typeof OkuScrollArea> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Basic: Story = {
  args: {
    template: 'Basic',
  },
  render: (args: any) => ({
    components: { OkuScrollArea },
    setup() {
      return { args }
    },
    template: `
      <OkuScrollArea v-bind="args" />
    `,
  }),
}

export const Resizable: Story = {
  args: {
    template: 'Resizable',
  },
  render: (args: any) => ({
    components: { OkuScrollArea },
    setup() {
      return { args }
    },
    template: `
      <OkuScrollArea v-bind="args" />
    `,
  }),
}

export const ContentChange: Story = {
  args: {
    template: 'ContentChange',
  },
  render: (args: any) => ({
    components: { OkuScrollArea },
    setup() {
      return { args }
    },
    template: `
      <OkuScrollArea v-bind="args" />
    `,
  }),
}

export const Animated: Story = {
  args: {
    template: 'Animated',
  },
  render: (args: any) => ({
    components: { OkuScrollArea },
    setup() {
      return { args }
    },
    template: `
      <OkuScrollArea v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'Chromatic',
  },
  render: (args: any) => ({
    components: { OkuScrollArea },
    setup() {
      return { args }
    },
    template: `
      <OkuScrollArea v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false },
  },
}

export const ChromaticDynamicContentBeforeLoaded: Story = {
  args: {
    template: 'ChromaticDynamicContentBeforeLoaded',
  },
  render: (args: any) => ({
    components: { OkuScrollArea },
    setup() {
      return { args }
    },
    template: `
      <OkuScrollArea v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false },
  },
}

export const ChromaticDynamicContentAfterLoaded: Story = {
  args: {
    template: 'ChromaticDynamicContentAfterLoaded',
  },
  render: (args: any) => ({
    components: { OkuScrollArea },
    setup() {
      return { args }
    },
    template: `
      <OkuScrollArea v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false, delay: 2000 },
  },
}
