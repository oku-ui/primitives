import type { Meta, StoryObj } from '@storybook/vue3'

import { ref } from 'vue'
import type { CheckboxProps } from './checkbox'
import { Checkbox,CheckboxIndicator } from './checkbox'

interface StoryProps extends CheckboxProps {
}

const meta = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  // TODO: `render` TS props same problem as above
  render: (args: StoryProps) => ({
    components: { Checkbox, CheckboxIndicator },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: `
      <div class="max-w-xl mx-auto h-full items-center justify-center">
        <Checkbox 
        class="w-6 h-6 flex bg-gray-300 rounded-md text-red-500 checked:text-red-600"
          :checked="checked"
          id="checkbox"
        > 
          <CheckboxIndicator class="w-6 h-6 flex bg-blue-100 rounded-md text-red-500 checked:text-red-600" >
                xxc
          </CheckboxIndicator>
        </Checkbox>
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
