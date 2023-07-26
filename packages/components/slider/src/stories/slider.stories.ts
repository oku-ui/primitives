import type { Meta, StoryObj } from '@storybook/vue3'
import type { ISliderProps } from './SliderDemo.vue'
import OkuSliderComponent from './SliderDemo.vue'

interface StoryProps extends ISliderProps { }

const meta = {
  title: 'Components/Slider',
  args: {
    template: '#1',
  },
  component: OkuSliderComponent,
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

export const FloatStep: Story = {
  args: {
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

export const Form: Story = {
  args: {
    template: '#3',
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

export const Chromatic: Story = {
  args: {
    template: '#4',
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
