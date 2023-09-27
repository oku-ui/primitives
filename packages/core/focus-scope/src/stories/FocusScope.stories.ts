import type { Meta, StoryObj } from '@storybook/vue3'

// import type { FocusScopeProps } from './FocusScopeDemo.vue'
import type { IFocusScopeProps } from './FocusScopeDemo.vue'
import FocusScopeDemoComponent from './FocusScopeDemo.vue'

interface StoryProps extends IFocusScopeProps {
}

const meta = {
  title: 'Utilities/FocusScope',
  component: FocusScopeDemoComponent,

  args: {
    template: '#1',
  },
} satisfies Meta<typeof FocusScopeDemoComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Basic: Story = {
  args: {
    template: '#1',
  },
  render: (args: any) => ({
    components: { FocusScopeDemoComponent },
    setup() {
      return { args }
    },
    template: `
      <FocusScopeDemoComponent v-bind="args" />
    `,
  }),
}

export const Multiple: Story = {
  args: {
    template: '#2',
  },
  render: (args: any) => ({
    components: { FocusScopeDemoComponent },
    setup() {
      return { args }
    },
    template: `
      <FocusScopeDemoComponent v-bind="args" />
    `,
  }),
}

export const WithOptions: Story = {
  args: {
    template: '#3',
  },
  render: (args: any) => ({
    components: { FocusScopeDemoComponent },
    setup() {
      return { args }
    },
    template: `
      <FocusScopeDemoComponent v-bind="args" />
    `,
  }),
}
