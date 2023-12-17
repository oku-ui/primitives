import type { Meta, StoryObj } from '@storybook/vue3'

import type { ICheckBoxProps } from './CheckboxDemo.vue'
import OkuCheckbox from './CheckboxDemo.vue'

interface StoryProps extends ICheckBoxProps { }

const meta = {
  title: 'Components/Checkbox',
  component: OkuCheckbox,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuCheckbox> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    template: 'Styled',
  },
  render: (args: any) => ({
    components: { OkuCheckbox },
    setup() {
      return { args }
    },
    template: `
      <OkuCheckbox v-bind="args" />
    `,
  }),
}

export const Controlled: Story = {
  args: {
    template: 'Controlled',
  },
  render: (args: any) => ({
    components: { OkuCheckbox },
    setup() {
      return { args }
    },
    template: `
      <OkuCheckbox v-bind="args" />
    `,
  }),
}

export const Indeterminate: Story = {
  args: {
    template: 'Indeterminate',
  },
  render: (args: any) => ({
    components: { OkuCheckbox },
    setup() {
      return { args }
    },
    template: `
      <OkuCheckbox v-bind="args" />
    `,
  }),
}

export const WithinForm: Story = {
  args: {
    template: 'WithinForm',
  },
  render: (args: any) => ({
    components: { OkuCheckbox },
    setup() {
      return { args }
    },
    template: `
      <OkuCheckbox v-bind="args" />
    `,
  }),
}

export const Animated: Story = {
  args: {
    template: 'Animated',
  },
  render: (args: any) => ({
    components: { OkuCheckbox },
    setup() {
      return { args }
    },
    template: `
      <OkuCheckbox v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'Chromatic',
  },
  render: (args: any) => ({
    components: { OkuCheckbox },
    setup() {
      return { args }
    },
    template: `
      <OkuCheckbox v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false },
  },
}
