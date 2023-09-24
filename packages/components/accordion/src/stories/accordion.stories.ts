import type { Meta, StoryObj } from '@storybook/vue3'

import type { OkuAccordionProps } from './AccordionDemo.vue'
import OkuAccordionComponent from './AccordionDemo.vue'

interface StoryProps extends OkuAccordionProps {
}

const meta = {
  title: 'Components/Accordion',
  component: OkuAccordionComponent,
  args: {
    template: 'Single',
  },
  argTypes: {
    template: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OkuAccordionComponent> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Single: Story = {
  args: {
    template: 'Single',
  },
  render: (args: any) => ({
    components: { OkuAccordionComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuAccordionComponent v-bind="args" />
    `,
  }),
}
export const Multiple: Story = {
  args: {
    template: 'Multiple',
  },
  render: (args: any) => ({
    components: { OkuAccordionComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuAccordionComponent v-bind="args" />
    `,
  }),
}
export const Animated: Story = {
  args: {
    template: 'Animated',
  },
  render: (args: any) => ({
    components: { OkuAccordionComponent },
    setup() {
      return { args }
    },
    template: `
      <OkuAccordionComponent v-bind="args" />
    `,
  }),
}
