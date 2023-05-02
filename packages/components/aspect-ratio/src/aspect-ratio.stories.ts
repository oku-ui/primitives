import type { Meta, StoryObj } from '@storybook/vue3'

import type { AspectRatioProps } from './AspectRatio.vue'
import OkuAspectRatio from './AspectRatio.vue'

interface StoryProps extends AspectRatioProps {
  imageurl: string
}

const meta = {
  title: 'Components/OkuAspectRatio',
  component: OkuAspectRatio,
  tags: ['autodocs'],
  argTypes: {
    // TODO: ratio number '16 / 9' not working how to send a string? with storybook controls
    ratio: { type: 'number', defaultValue: '1' },
  },
  // TODO: ratio number '16 / 9' not working how to send a string? with storybook controls
  args: { ratio: '1' },
  // TODO: `render` ts props same problem as above
  render: (args: StoryProps) => ({
    components: { OkuAspectRatio },
    setup() {
      return { args }
    },
    // TODO: if ratio hot reload fixed, remove this {{ args.ratio }}
    // TODO: ratio change not working hot reload
    template: `
      {{ args.ratio }}
      <div class="max-w-xl mx-auto h-full items-center justify-center">
        <OkuAspectRatio :ratio="args.ratio">
          <img
            class="object-cover w-full h-full rounded-lg"
            :src="args.imageurl"
            alt="Landscape photograph by Tobias Tullius"
          >
        </OkuAspectRatio>
      </div>
    `,
  }),
} satisfies Meta<typeof OkuAspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    ratio: '1',
    imageurl: 'https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80',
  },
}
