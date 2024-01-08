import type { Meta, StoryObj } from '@storybook/vue3'

import type { IAspectRatioProps } from './AspectRatioDemo.vue'
import OkuAspectRatio from './AspectRatioDemo.vue'

interface StoryProps extends IAspectRatioProps { }

const meta = {
  title: 'Components/AspectRatio',
  component: OkuAspectRatio,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuAspectRatio> & {
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
    components: { OkuAspectRatio },
    setup() {
      return { args }
    },
    template: `
      <OkuAspectRatio v-bind="args" />
    `,
  }),
}

export const CustomRatios: Story = {
  args: {
    template: 'CustomRatios',
  },
  render: (args: any) => ({
    components: { OkuAspectRatio },
    setup() {
      return { args }
    },
    template: `
      <OkuAspectRatio v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'Chromatic',
  },
  render: (args: any) => ({
    components: { OkuAspectRatio },
    setup() {
      return { args }
    },
    template: `
      <OkuAspectRatio v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false },
  },
}
