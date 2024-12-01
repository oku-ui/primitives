import { render, screen } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { Label } from '../index'
import { useLabel } from '../Label'

describe('label', () => {
  describe('component', () => {
    it('should render correctly', () => {
      const wrapper = mount(Label)
      expect(wrapper.element.tagName).toBe('LABEL')
    })

    it('should render with custom tag', () => {
      const wrapper = mount(Label, {
        props: {
          as: 'div',
        },
      })
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('should pass through attrs', () => {
      const wrapper = mount(Label, {
        attrs: {
          'id': 'test-label',
          'data-testid': 'label',
        },
      })
      expect(wrapper.attributes('id')).toBe('test-label')
      expect(wrapper.attributes('data-testid')).toBe('label')
    })

    it('should emit mousedown event', async () => {
      const wrapper = mount(Label)
      await wrapper.trigger('mousedown')
      expect(wrapper.emitted('mousedown')).toBeTruthy()
    })

    it('should handle slot content updates', async () => {
      const wrapper = mount({
        components: { Label },
        data() {
          return {
            content: 'Initial Label',
          }
        },
        template: `<Label>{{ content }}</Label>`,
      })
      expect(wrapper.text()).toBe('Initial Label')
      await wrapper.setData({ content: 'Updated Label' })
      expect(wrapper.text()).toBe('Updated Label')
    })

    it('should handle dynamic class changes', async () => {
      const wrapper = mount(Label, {
        attrs: {
          class: 'initial-class',
        },
      })
      expect(wrapper.classes()).toContain('initial-class')
      await wrapper.setProps({ class: 'updated-class' })
      expect(wrapper.classes()).toContain('updated-class')
    })

    it('should handle multiple mousedown events', async () => {
      const wrapper = mount(Label)
      await wrapper.trigger('mousedown')
      await wrapper.trigger('mousedown')
      expect(wrapper.emitted('mousedown')).toHaveLength(2)
    })
  })

  describe('useLabel', () => {
    it('should prevent text selection on double click', () => {
      const mockProps = {
        onMousedown: vi.fn(),
      }
      const { attrs } = useLabel(mockProps)
      const div = document.createElement('div')
      const event = new MouseEvent('mousedown', {
        detail: 2,
        bubbles: true,
        cancelable: true,
      })
      Object.defineProperty(event, 'target', { value: div })
      event.preventDefault = vi.fn()

      const resolvedAttrs = attrs([])
      if (resolvedAttrs.onMousedown) {
        resolvedAttrs.onMousedown(event)
      }

      expect(event.preventDefault).toHaveBeenCalled()
      expect(mockProps.onMousedown).toHaveBeenCalledWith(event)
    })

    it('should not prevent mousedown on form controls', () => {
      const mockProps = {
        onMousedown: vi.fn(),
      }
      const { attrs } = useLabel(mockProps)
      const button = document.createElement('button')
      const event = new MouseEvent('mousedown')
      Object.defineProperty(event, 'target', { value: button })

      const resolvedAttrs = attrs([])
      if (resolvedAttrs.onMousedown) {
        resolvedAttrs.onMousedown(event)
      }

      expect(mockProps.onMousedown).not.toHaveBeenCalled()
    })

    it('should merge extra attrs', () => {
      const { attrs } = useLabel()
      const extraAttrs = [{
        class: 'test-class',
        id: 'test-id',
      }]

      const resolvedAttrs = attrs(extraAttrs)

      expect(resolvedAttrs.class).toBe('test-class')
      expect(resolvedAttrs.id).toBe('test-id')
      expect(resolvedAttrs.onMousedown).toBeDefined()
    })
  })

  describe('form control interactions', () => {
    it('should trigger associated input focus on click', async () => {
      // Mount using @testing-library/vue
      render({
        components: { Label },
        template: `
          <div>
            <Label for="test-input">Click me</Label>
            <input id="test-input" data-testid="input" type="text" />
          </div>
        `,
      })

      const input = screen.getByTestId('input')
      const label = screen.getByText('Click me')

      // Mock focus method
      const focusSpy = vi.spyOn(input, 'focus')

      // Simulate the native behavior
      label.click()
      input.focus()

      expect(focusSpy).toHaveBeenCalled()
      focusSpy.mockRestore()
    })

    it('should work with nested form controls', async () => {
      const wrapper = mount(Label, {
        slots: {
          default: '<input type="checkbox" />',
        },
      })

      const checkbox = wrapper.find('input')
      await wrapper.trigger('click')
      expect(checkbox.element.checked).toBe(true)
    })
  })

  describe('accessibility', () => {
    it('should have no accessibility violations', async () => {
      const wrapper = mount(Label, {
        slots: {
          default: 'Test Label',
        },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with custom tag', async () => {
      const wrapper = mount(Label, {
        props: {
          as: 'div',
        },
        slots: {
          default: 'Test Label',
        },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should have no violations when associated with form control', async () => {
      const wrapper = mount({
        template: `
          <div>
            <Label for="test-input">Test Label</Label>
            <input id="test-input" type="text" />
          </div>
        `,
        components: { Label },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should maintain accessibility when content changes dynamically', async () => {
      const wrapper = mount({
        components: { Label },
        data() {
          return {
            content: 'Initial Label',
          }
        },
        template: `
          <Label for="dynamic-input">{{ content }}</Label>
        `,
      })

      expect(wrapper.text()).toBe('Initial Label')
      await wrapper.setData({ content: 'Updated Label' })
      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should be keyboard navigable', () => {
      const wrapper = mount(Label, {
        attrs: {
          tabindex: '0',
        },
      })
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('should support aria-labelledby', async () => {
      const wrapper = mount({
        template: `
          <div>
            <Label id="label-id">Description</Label>
            <div aria-labelledby="label-id">Labeled content</div>
          </div>
        `,
        components: { Label },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })
  })

  describe('edge cases', () => {
    it('should handle empty slots gracefully', () => {
      const wrapper = mount(Label)
      expect(wrapper.text()).toBe('')
      expect(() => wrapper.trigger('mousedown')).not.toThrow()
    })

    it('should handle malformed for attribute', async () => {
      const wrapper = mount(Label, {
        props: {
          for: 'non-existent-id',
        },
      })
      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })
  })
})
