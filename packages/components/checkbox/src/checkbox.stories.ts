import type { Meta, StoryObj } from '@storybook/vue3'

import { ref } from 'vue'
import type { CheckboxProps } from './checkbox'
import { OkuCheckbox, OkuCheckboxIndicator } from './checkbox'

interface StoryProps extends CheckboxProps {
}

const meta = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  // TODO: `render` TS props same problem as above
  render: (args: StoryProps) => ({
    components: { OkuCheckbox, OkuCheckboxIndicator },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: `
      <div class="max-w-xl mx-auto h-full items-center justify-center">
        <OkuCheckbox 
        class="w-6 h-6 flex bg-gray-300 rounded-md text-red-500 checked:text-red-600"
          id="checkbox"
        > 
          <OkuCheckboxIndicator class="w-6 h-6 flex items-center justify-center text-blue-500" >
              <div class="i-ph-check-bold w-5 h-5">
          </OkuCheckboxIndicator>
        </OkuCheckbox>
      </div>
    `,
  }),
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {

  },
}
