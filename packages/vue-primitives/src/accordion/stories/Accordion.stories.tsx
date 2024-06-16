import { defineComponent, shallowRef, watch } from 'vue'
import { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from '../index.ts'
import './styles.css'

export default { title: 'Components/Accordion' }

export function Single() {
  return defineComponent({
    setup() {
      const value = shallowRef('one')
      function setValue(newValue: string) {
        value.value = newValue
      }

      return () => (
        <>
          <h1>Uncontrolled</h1>
          <Accordion type="single" class="accordion_rootClass">
            <AccordionItem class="accordion_itemClass" value="one">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">One</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
                integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
                habitant sed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="two">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Two</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
                porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="three" disabled>
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Three (disabled)</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
                himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="four">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Four</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Odio placerat
                {' '}
                <a href="#">quisque</a>
                {' '}
                sapien sagittis non sociis ligula penatibus
                dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
                <button>Cool</button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h1>Controlled</h1>
          <Accordion
            type="single"
            value={value.value}
            onUpdate:value={setValue}
            class="accordion_rootClass"
          >
            <AccordionItem class="accordion_itemClass" value="one">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">One</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
                integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
                habitant sed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="two">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Two</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
                porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="three" disabled>
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Three (disabled)</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
                himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="four">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Four</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Odio placerat
                {' '}
                <a href="#">quisque</a>
                {' '}
                sapien sagittis non sociis ligula penatibus
                dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
                <button>Cool</button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h1>Collapsible</h1>
          <Accordion type="single" class="accordion_rootClass" defaultValue="one" collapsible>
            <AccordionItem class="accordion_itemClass" value="one">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">One</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
                integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
                habitant sed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="two">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Two</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
                porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="three" disabled>
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Three (disabled)</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
                himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="four">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Four</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Odio placerat
                {' '}
                <a href="#">quisque</a>
                {' '}
                sapien sagittis non sociis ligula penatibus
                dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
                <button>Cool</button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )
    },
  })
}

export function Multiple() {
  return defineComponent({
    setup() {
      const value = shallowRef(['one', 'two'])
      function setValue(newValue: string[]) {
        value.value = newValue
      }

      return () => (
        <>
          <h1>Uncontrolled</h1>
          <Accordion type="multiple" class="accordion_rootClass">
            <AccordionItem class="accordion_itemClass" value="one">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">One</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
                integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
                habitant sed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="two">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Two</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
                porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="three" disabled>
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Three (disabled)</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
                himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="four">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Four</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Odio placerat
                {' '}
                <a href="#">quisque</a>
                {' '}
                sapien sagittis non sociis ligula penatibus
                dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
                <button>Cool</button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h1>Controlled</h1>
          <Accordion
            type="multiple"
            value={value.value}
            onUpdate:value={setValue}
            class="accordion_rootClass"
          >
            <AccordionItem class="accordion_itemClass" value="one">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">One</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
                integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
                habitant sed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="two">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Two</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
                porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="three" disabled>
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Three (disabled)</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat
                himenaeos euismod magna, nec tempor pulvinar eu etiam mattis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="four">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Four</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Odio placerat
                {' '}
                <a href="#">quisque</a>
                {' '}
                sapien sagittis non sociis ligula penatibus
                dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
                <button>Cool</button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )
    },
  })
}

export function Animated() {
  return defineComponent({
    setup() {
      const values = ['One', 'Two', 'Three', 'Four']
      const count = shallowRef(1)
      function setCount(newValue: number) {
        count.value = newValue
      }
      const hasDynamicContent = shallowRef(false)
      function setHasDynamicContent(newValue: boolean) {
        hasDynamicContent.value = newValue
      }
      let timerRef = 0

      watch([hasDynamicContent, count], (_, __, onCleanup) => {
        if (hasDynamicContent.value) {
          timerRef = window.setTimeout(() => {
            const nextCount = count.value < 5 ? count.value + 1 : count.value
            if (nextCount === 5)
              setHasDynamicContent(false)
            count.value = nextCount
          }, 3000)
          onCleanup(() => {
            clearTimeout(timerRef)
          })
        }
      })

      return () => (
        <>
          <label>
            <input
              type="checkbox"
              checked={hasDynamicContent.value}
              onChange={(event) => {
                const checked = (event.target as HTMLInputElement).checked
                if (checked)
                  setCount(1)
                setHasDynamicContent(checked)
              }}
            />
            {' '}
            Dynamic content
          </label>
          <br />
          <br />
          <h1>Closed by default</h1>
          <Accordion type="single" class="accordion_rootClass">
            {values.map(value => (
              <AccordionItem key={value} value={value} class="accordion_itemClass">
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{value}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_animatedContentClass">
                  {[...Array(count.value)].map((_, index) => (
                    <div style={{ padding: '10px' }} key={index}>
                      Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                      viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
                      quam suscipit habitant sed.
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h1>Open by default</h1>
          <Accordion type="single" class="accordion_rootClass" defaultValue="One">
            {values.map(value => (
              <AccordionItem key={value} value={value} class="accordion_itemClass">
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{value}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_animatedContentClass">
                  {[...Array(count.value)].map((_, index) => (
                    <div style={{ padding: '10px' }} key={index}>
                      Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                      viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
                      quam suscipit habitant sed.
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )
    },
  })
}

export function Animated2D() {
  return defineComponent({
    setup() {
      const values = ['One', 'Two', 'Three', 'Four']

      return () => (
        <>
          <Accordion type="single" class="accordion_rootClass">
            {values.map(value => (
              <AccordionItem key={value} value={value} class="accordion_itemClass">
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{value}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_animated2DContentClass">
                  <div style={{ padding: 10, background: 'whitesmoke', overflow: 'hidden' }}>
                    <div style={{ width: 'calc(20em - 20px)', height: 100 }}>
                      Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                      viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque
                      quam suscipit habitant sed.
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )
    },
  })
}

export function AnimatedControlled() {
  return defineComponent({
    setup() {
      const value = shallowRef(['one', 'two', 'three', 'four'])
      function setValue(newVal: string[]) {
        value.value = newVal
      }

      return () => (
        <Accordion type="multiple" value={value.value} onUpdate:value={setValue} class="accordion_rootClass">
          <AccordionItem class="accordion_itemClass" value="one">
            <AccordionHeader class="accordion_headerClass">
              <AccordionTrigger class="accordion_triggerClass">One</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion_animatedContentClass">
              Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
              integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
              habitant sed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="accordion_itemClass" value="two">
            <AccordionHeader class="accordion_headerClass">
              <AccordionTrigger class="accordion_triggerClass">Two</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion_animatedContentClass">
              Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
              porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="accordion_itemClass" value="three">
            <AccordionHeader class="accordion_headerClass">
              <AccordionTrigger class="accordion_triggerClass">Three</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion_animatedContentClass">
              Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat himenaeos
              euismod magna, nec tempor pulvinar eu etiam mattis.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="accordion_itemClass" value="four">
            <AccordionHeader class="accordion_headerClass">
              <AccordionTrigger class="accordion_triggerClass">Four</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion_animatedContentClass">
              Odio placerat
              {' '}
              <a href="#">quisque</a>
              {' '}
              sapien sagittis non sociis ligula penatibus
              dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
              <button>Cool</button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    },
  })
}

export function OutsideViewport() {
  return defineComponent({
    setup() {
      return () => (
        <>
          <p>Scroll down to see tabs</p>
          <div style={{ height: '150vh' }} />
          <p>
            When accordion buttons are focused and the user is navigating via keyboard, the page should
            not scroll unless the next tab is entering the viewport.
          </p>
          <Accordion type="single" class="accordion_rootClass">
            <AccordionItem class="accordion_itemClass" value="one">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">One</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
                integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
                habitant sed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="two">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Two</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
                porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="three" disabled>
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Three (disabled)</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat himenaeos
                euismod magna, nec tempor pulvinar eu etiam mattis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="four">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Four</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Odio placerat
                {' '}
                <a href="#">quisque</a>
                {' '}
                sapien sagittis non sociis ligula penatibus
                dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
                <button>Cool</button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div style={{ height: '150vh' }} />
        </>
      )
    },
  })
}

export function Horizontal() {
  return defineComponent({
    setup() {
      return () => (
        <>
          <h1>Horizontal Orientation</h1>
          <Accordion type="single" class="accordion_rootClass" orientation="horizontal">
            <AccordionItem class="accordion_itemClass" value="one">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">One</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate viverra
                integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam suscipit
                habitant sed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="two">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Two</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis, diam eget bibendum
                porta nascetur ac dictum, leo tellus dis integer platea ultrices mi.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="three" disabled>
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Three (disabled)</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Sociis hac sapien turpis conubia sagittis justo dui, inceptos penatibus feugiat himenaeos
                euismod magna, nec tempor pulvinar eu etiam mattis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem class="accordion_itemClass" value="four">
              <AccordionHeader class="accordion_headerClass">
                <AccordionTrigger class="accordion_triggerClass">Four</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="accordion_contentClass">
                Odio placerat
                {' '}
                <a href="#">quisque</a>
                {' '}
                sapien sagittis non sociis ligula penatibus
                dignissim vitae, enim vulputate nullam semper potenti etiam volutpat libero.
                <button>Cool</button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )
    },
  })
}

export function Chromatic() {
  return defineComponent({
    setup() {
      const items = ['One', 'Two', 'Three', 'Four']

      return () => (
        <>
          <h1>Uncontrolled</h1>
          <h2>Single closed</h2>
          <Accordion type="single" class="accordion_rootClass">
            {items.map(item => (
              <AccordionItem key={item} class="accordion_itemClass" value={item}>
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentClass">
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2>Single open</h2>
          <Accordion type="single" class="accordion_rootClass" defaultValue="Two">
            {items.map(item => (
              <AccordionItem key={item} class="accordion_itemClass" value={item}>
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentClass">
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2>Multiple closed</h2>
          <Accordion type="multiple" class="accordion_rootClass">
            {items.map(item => (
              <AccordionItem key={item} class="accordion_itemClass" value={item}>
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentClass">
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2>Multiple open</h2>
          <Accordion type="multiple" class="accordion_rootClass" defaultValue={['One', 'Two']}>
            {items.map(item => (
              <AccordionItem key={item} class="accordion_itemClass" value={item}>
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentClass">
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h1>Controlled</h1>
          <h2>Single open</h2>
          <Accordion type="single" class="accordion_rootClass" value="Three">
            {items.map(item => (
              <AccordionItem key={item} class="accordion_itemClass" value={item}>
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentClass">
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2>Multiple open</h2>
          <Accordion type="multiple" class="accordion_rootClass" value={['Two', 'Three']}>
            {items.map(item => (
              <AccordionItem key={item} class="accordion_itemClass" value={item}>
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentClass">
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h1>Disabled (whole)</h1>
          <Accordion type="single" class="accordion_rootClass" disabled>
            {items.map(item => (
              <AccordionItem key={item} class="accordion_itemClass" value={item}>
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentClass">
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h1>Disabled (item)</h1>
          <h2>Just item</h2>
          <Accordion type="single" class="accordion_rootClass">
            {items.map(item => (
              <AccordionItem key={item} class="accordion_itemClass" value={item} disabled={item === 'Two'}>
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentClass">
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2>with `disabled=false` on top-level</h2>
          <Accordion type="single" class="accordion_rootClass" disabled={false}>
            {items.map(item => (
              <AccordionItem key={item} class="accordion_itemClass" value={item} disabled={item === 'Two'}>
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentClass">
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h1>Force mounted contents</h1>
          <Accordion type="single" class="accordion_rootClass">
            {items.map(item => (
              <AccordionItem key={item} class="accordion_itemClass" value={item}>
                <AccordionHeader class="accordion_headerClass">
                  <AccordionTrigger class="accordion_triggerClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentClass" forceMount>
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h1>State attributes</h1>
          <h2>Accordion disabled</h2>
          <Accordion type="single" class="accordion_rootAttrClass" defaultValue="Two" disabled>
            {items.map(item => (
              <AccordionItem key={item} class="accordion_itemAttrClass" value={item}>
                <AccordionHeader class="accordion_headerAttrClass">
                  <AccordionTrigger class="accordion_triggerAttrClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentAttrClass">
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2>Accordion enabled with item override</h2>
          <Accordion type="single" class="accordion_rootAttrClass" defaultValue="Two" disabled={false}>
            {items.map(item => (
              <AccordionItem
                key={item}
                class="accordion_itemAttrClass"
                value={item}
                disabled={['Two', 'Four'].includes(item)}
              >
                <AccordionHeader class="accordion_headerAttrClass">
                  <AccordionTrigger class="accordion_triggerAttrClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentAttrClass">
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2>Accordion disabled with item override</h2>
          <Accordion type="single" class="accordion_rootAttrClass" defaultValue="Two" disabled={true}>
            {items.map(item => (
              <AccordionItem
                key={item}
                class="accordion_itemAttrClass"
                value={item}
                disabled={['Two', 'Four'].includes(item) ? false : undefined}
              >
                <AccordionHeader class="accordion_headerAttrClass">
                  <AccordionTrigger class="accordion_triggerAttrClass">{item}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent class="accordion_contentAttrClass">
                  {item}
                  : Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit vulputate
                  viverra integer ullamcorper congue curabitur sociis, nisi malesuada scelerisque quam
                  suscipit habitant sed.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )
    },
  })
}

Chromatic.parameters = { chromatic: { disable: false } }
