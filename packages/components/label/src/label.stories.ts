import type { Meta, StoryObj } from '@storybook/vue3'

import type { LabelProps } from './label'
import { OkuLabel } from './label'

interface StoryProps extends LabelProps {
}

const meta = {
  title: 'Components/Label',
  component: OkuLabel,
  tags: ['autodocs'],
  // TODO: `render` TS props same problem as above
  render: (args: StoryProps) => ({
    components: { OkuLabel },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-xl mx-auto h-full items-center justify-center">
          <OkuLabel class="block text-sm font-medium leading-6 text-gray-900" for="email">
            Email
          </OkuLabel>
          <div class="mt-2">
            <input type="email" name="email" id="email" class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
          </div>
      </div>
    `,
  }),
} satisfies Meta<typeof OkuLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {

  },
}
