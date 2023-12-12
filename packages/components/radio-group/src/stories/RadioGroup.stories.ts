import type { Meta, StoryObj } from '@storybook/vue3'

import type { IRadioGroupProps } from './RadioGroupDemo.vue'
import OkuRadioGroup from './RadioGroupDemo.vue'

interface StoryProps extends IRadioGroupProps { }

const meta = {
  title: 'Components/RadioGroup',
  component: OkuRadioGroup,
  args: {
    template: 'Styled',
  },
} satisfies Meta<typeof OkuRadioGroup> & {
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
    components: { OkuRadioGroup },
    setup() {
      return { args }
    },
    template: `
      <OkuRadioGroup v-bind="args" />
    `,
  }),
}

export const Controlled: Story = {
  args: {
    template: 'Controlled',
  },
  render: (args: any) => ({
    components: { OkuRadioGroup },
    setup() {
      return { args }
    },
    template: `
      <OkuRadioGroup v-bind="args" />
    `,
  }),
}

export const Unset: Story = {
  args: {
    template: 'Unset',
  },
  render: (args: any) => ({
    components: { OkuRadioGroup },
    setup() {
      return { args }
    },
    template: `
      <OkuRadioGroup v-bind="args" />
    `,
  }),
}

export const WithinForm: Story = {
  args: {
    template: 'WithinForm',
  },
  render: (args: any) => ({
    components: { OkuRadioGroup },
    setup() {
      return { args }
    },
    template: `
      <OkuRadioGroup v-bind="args" />
    `,
  }),
}

export const Animated: Story = {
  args: {
    template: 'Animated',
  },
  render: (args: any) => ({
    components: { OkuRadioGroup },
    setup() {
      return { args }
    },
    template: `
      <OkuRadioGroup v-bind="args" />
    `,
  }),
}

export const Chromatic: Story = {
  args: {
    template: 'Chromatic',
  },
  render: (args: any) => ({
    components: { OkuRadioGroup },
    setup() {
      return { args }
    },
    template: `
      <OkuRadioGroup v-bind="args" />
    `,
  }),
  parameters: {
    chromatic: { disable: false },
  },
}
