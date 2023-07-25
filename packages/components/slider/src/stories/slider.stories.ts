import type { Meta, StoryObj } from '@storybook/vue3'
import type { SliderProps } from '../Slider'
import OkuSlider from './SliderDemo.vue'

interface StoryProps extends SliderProps { }

const meta = {
  title: 'Components/Slider',
  args: {
  },
  component: OkuSlider,
  tags: ['defaultSlider'],
} satisfies Meta<typeof OkuSlider> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Default: Story = {
  args: {
    min: 0,
    max: 200,
    step: 1,
  },

  render: (args: any) => ({
    components: { OkuSlider },
    setup() {
      return { args }
    },
    template: `
      <OkuSlider />
    `,
  }),
}
