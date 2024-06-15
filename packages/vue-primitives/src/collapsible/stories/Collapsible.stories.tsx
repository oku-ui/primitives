import { defineComponent, shallowRef } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../index.ts'
import './styles.css'

export default { title: 'Components/Collapsible' }

export function Styled() {
  return (
    <Collapsible class="collapsible_root">
      <CollapsibleTrigger class="collapsible_trigger">Trigger</CollapsibleTrigger>
      <CollapsibleContent class="collapsible_content">Content 1</CollapsibleContent>
    </Collapsible>
  )
}

export function Controlled() {
  return defineComponent({
    setup() {
      const open = shallowRef(false)
      function setOpen(value: boolean) {
        open.value = value
      }

      return () => (
        <Collapsible open={open.value} onUpdate:open={setOpen} class="collapsible_root">
          <CollapsibleTrigger class="collapsible_trigger">
            {open.value ? 'close' : 'open'}
          </CollapsibleTrigger>
          <CollapsibleContent class="collapsible_content" asChild>
            <article>Content 1</article>
          </CollapsibleContent>
        </Collapsible>
      )
    },
  })
}

export function Animated() {
  return (
    <>
      <h1>Closed by default</h1>
      <Collapsible class="collapsible_root">
        <CollapsibleTrigger class="collapsible_trigger">Trigger</CollapsibleTrigger>
        <CollapsibleContent class="collapsible_animatedContent">
          <div style={{ padding: '10px' }}>Content 1</div>
        </CollapsibleContent>
      </Collapsible>

      <h1>Open by default</h1>
      <Collapsible defaultOpen class="collapsible_root">
        <CollapsibleTrigger class="collapsible_trigger">Trigger</CollapsibleTrigger>
        <CollapsibleContent class="collapsible_animatedContent">
          <div style={{ padding: '10px' }}>Content 1</div>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}

export function AnimatedHorizontal() {
  return (
    <Collapsible class="collapsible_root">
      <CollapsibleTrigger class="collapsible_trigger">Trigger</CollapsibleTrigger>
      <CollapsibleContent class="collapsible_animatedWidthContent">
        <div style={{ padding: '10px' }}>Content</div>
      </CollapsibleContent>
    </Collapsible>
  )
};

export function Chromatic() {
  return (
    <>
      <h1>Uncontrolled</h1>
      <h2>Closed</h2>
      <Collapsible class="collapsible_root">
        <CollapsibleTrigger class="collapsible_trigger">Trigger</CollapsibleTrigger>
        <CollapsibleContent class="collapsible_content">Content 1</CollapsibleContent>
      </Collapsible>

      <h2>Open</h2>
      <Collapsible class="collapsible_root" defaultOpen>
        <CollapsibleTrigger class="collapsible_trigger">Trigger</CollapsibleTrigger>
        <CollapsibleContent class="collapsible_content">Content 1</CollapsibleContent>
      </Collapsible>

      <h1>Controlled</h1>
      <h2>Closed</h2>
      <Collapsible class="collapsible_root" open={false}>
        <CollapsibleTrigger class="collapsible_trigger">Trigger</CollapsibleTrigger>
        <CollapsibleContent class="collapsible_content">Content 1</CollapsibleContent>
      </Collapsible>

      <h2>Open</h2>
      <Collapsible class="collapsible_root" open>
        <CollapsibleTrigger class="collapsible_trigger">Trigger</CollapsibleTrigger>
        <CollapsibleContent class="collapsible_content">Content 1</CollapsibleContent>
      </Collapsible>

      <h1>Disabled</h1>
      <Collapsible class="collapsible_root" disabled>
        <CollapsibleTrigger class="collapsible_trigger">Trigger</CollapsibleTrigger>
        <CollapsibleContent class="collapsible_content">Content 1</CollapsibleContent>
      </Collapsible>

      <h1>State attributes</h1>
      <h2>Closed</h2>
      <Collapsible class="collapsible_rootAttr">
        <CollapsibleTrigger class="collapsible_triggerAttr">Trigger</CollapsibleTrigger>
        <CollapsibleContent class="collapsible_contentAttr">Content 1</CollapsibleContent>
      </Collapsible>

      <h2>Open</h2>
      <Collapsible class="collapsible_rootAttr" defaultOpen>
        <CollapsibleTrigger class="collapsible_triggerAttr">Trigger</CollapsibleTrigger>
        <CollapsibleContent class="collapsible_contentAttr">Content 1</CollapsibleContent>
      </Collapsible>

      <h2>Disabled</h2>
      <Collapsible class="collapsible_rootAttr" defaultOpen disabled>
        <CollapsibleTrigger class="collapsible_triggerAttr">Trigger</CollapsibleTrigger>
        <CollapsibleContent class="collapsible_contentAttr">Content 1</CollapsibleContent>
      </Collapsible>
    </>
  )
}
Chromatic.parameters = { chromatic: { disable: false } }
