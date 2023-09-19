import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuHoverCardProps } from './HoverCardDemo.vue'
import HoverCardDemo from './HoverCardDemo.vue'

interface StoryProps extends OkuHoverCardProps {
}

const meta = {
  title: 'Components/HoverCard',
  component: HoverCardDemo,
  args: {
    template: 'Nested',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },

} satisfies Meta<typeof HoverCardDemo> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Basic: Story = renderStory('Basic')
export const ContainTextSelection: Story = renderStory('ContainTextSelection')
export const AsyncUpdate: Story = renderStory('AsyncUpdate')
export const CustomDurations: Story = renderStory('CustomDurations')
export const Controlled: Story = renderStory('Controlled')
export const Layerable: Story = renderStory('Layerable')
export const Animated: Story = renderStory('Animated')
export const ForcedMount: Story = renderStory('ForcedMount')
export const Nested: Story = renderStory('Nested')
export const NonPortal: Story = renderStory('NonPortal')
export const WithSlottedTrigger: Story = renderStory('WithSlottedTrigger')
export const WithSlottedContent: Story = renderStory('WithSlottedContent')

function renderStory(templateName: OkuHoverCardProps['template']) {
  return {
    args: {
      template: templateName,
    },
    render: (args: any) => ({
      components: { HoverCardDemo },
      setup() {
        return { args }
      },
      template: `
        <HoverCardDemo v-bind="args" />
      `,
    }),
  }
}
