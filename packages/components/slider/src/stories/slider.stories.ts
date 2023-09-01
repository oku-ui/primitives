import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuSliderProps } from './SliderDemo.vue'
import OkuSliderComponent from './SliderDemo.vue'

interface StoryProps extends OkuSliderProps {
}

const meta = {
  title: 'Components/Slider',
  component: OkuSliderComponent,
  args: {
    label: 'Label',
    template: '#1',
  },
  argTypes: {
    label: {
      control: 'text',
    },
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OkuSliderComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    label: 'Label',
    template: '#1',
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

export const WithControl: Story = {
  args: {
    label: 'Label',
    template: '#2',
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
