import type { Meta, StoryObj } from '@storybook/vue3'

import type { AvatarProps } from './avatar'
import { OkuAvatar,OkuAvatarImage,OkuAvatarFallback } from './avatar'

interface StoryProps extends AvatarProps {
}

const meta = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  // TODO: `render` TS props same problem as above
  render: (args: StoryProps) => ({
    components: { OkuAvatar },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-xl mx-auto h-full items-center justify-center">
        <OkuAvatar class="w-40 h-40 bg-gray-400 items-center inline-block overflow-hidden rounded-full">
          <OkuAvatarImage
            class="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          />
          <OkuAvatarFallback
            class="flex items-center text-white font-medium text-2xl h-full w-full justify-center"
            :delayms="500"
          >
            CT
          </OkuAvatarFallback>
      </OkuAvatar>
      </div>
    `,
  }),
} satisfies Meta<typeof OkuAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {

  },
}
