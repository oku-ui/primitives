import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuSliderProps } from './SliderDemo.vue'
import OkuSliderComponent from './SliderDemo.vue'

interface StoryProps extends OkuSliderProps {
}

const meta = {
  title: 'Components/Slider',
  component: OkuSliderComponent,
  args: {
    template: 'Styled',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },

} satisfies Meta<typeof OkuSliderComponent> & {
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
    components: { OkuSliderComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuSliderComponent v-bind="args" />
    `,
  }),
}

export const OnValueCommit: Story = {
  args: {
    template: 'OnValueCommit',
  },
  render: (args: any) => ({
    components: { OkuSliderComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuSliderComponent v-bind="args" />
    `,
  }),
}

export const Vertical: Story = {
  args: {
    template: 'Vertical',
  },
  render: (args: any) => ({
    components: { OkuSliderComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuSliderComponent v-bind="args" />
    `,
  }),
}
