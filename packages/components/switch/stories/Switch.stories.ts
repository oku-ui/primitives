import type { Meta, StoryObj } from '@storybook/vue3'
import type { ISwitchProps } from './SwitchDemo.vue'
import OkuSwitchComponent from './SwitchDemo.vue'

interface StoryProps extends ISwitchProps {}

const meta = {
  title: 'Components/Switch',
  args: {
    template: '#1',
  },
  component: OkuSwitchComponent,

} satisfies Meta<typeof OkuSwitchComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    template: '#1',
    // allshow: true,
  },

  render: (args: any) => ({
    components: { OkuSwitchComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuSwitchComponent v-bind="args" />
    `,
  }),
}

export const Form: Story = {
  args: {
    template: '#3',
    // allshow: true,
  },

  render: (args: any) => ({
    components: { OkuSwitchComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuSwitchComponent v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: '#2',
    allshow: false,
  },
  render: (args: any) => ({
    components: { OkuSwitchComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuSwitchComponent v-bind="args" />
    `,
  }),
}
