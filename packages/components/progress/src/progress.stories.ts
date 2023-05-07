import type { Meta, StoryObj } from '@storybook/vue3'

import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { ProgressProps } from './progress'
import { OkuProgress, OkuProgressIndicator } from './progress'

interface StoryProps extends ProgressProps {
}

const meta = {
  title: 'Components/OkuProgress',
  tags: ['autodocs'],
  // TODO: `render` TS props same problem as above
  render: (args: StoryProps) => ({
    components: { OkuProgress, OkuProgressIndicator },
    setup() {
      const value = ref(13)
      const style = computed(() => {
        return {
          transform: `translateX(-${100 - value.value}%)`,
        }
      })

      const startTimer = () => {
        return setTimeout(() => {
          value.value = 66
        }, 500)
      }
      let timer: any = null

      onMounted(() => {
        timer = startTimer()
      })

      onUnmounted(() => {
        clearTimeout(timer)
      })

      return { value, style }
    },
    template: `
      <div class="max-w-xl mx-auto h-full items-center justify-center">
        <OkuProgress class="relative overflow-hidden bg-gray-300 rounded-full w-300px h-25px transform translate-z-0" :value="value">
          <OkuProgressIndicator class="bg-blue-500 h-full transition-transform duration-660 ease-out" :style=style />
        </OkuProgress>
      </div>
    `,
  }),
} satisfies Meta<typeof OkuProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {

  },
}
