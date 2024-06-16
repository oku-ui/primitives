import { Tabs, TabsContent, TabsList, TabsTrigger } from '../index.ts'
import './styles.css'

export default { title: 'Components/Tabs' }

export function Styled() {
  return (
    <>
      <h1>Horizontal (automatic activation)</h1>
      <Tabs defaultValue="tab1" class="tabs_rootClass">
        <TabsList aria-label="tabs example" class="tabs_listClass">
          <TabsTrigger value="tab1" class="tabs_triggerClass">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" {...{ disabled: true }} class="tabs_triggerClass">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" class="tabs_triggerClass">
            Tab 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" class="tabs_contentClass">
          Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
          integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
          pellentesque volutpat dictum ipsum.
        </TabsContent>
        <TabsContent value="tab2" class="tabs_contentClass">
          You'll never find me!
        </TabsContent>
        <TabsContent value="tab3" class="tabs_contentClass">
          Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
          quam tempus pretium.
        </TabsContent>
      </Tabs>

      <h1>Vertical (manual activation)</h1>
      <Tabs
        defaultValue="tab1"
        class="tabs_rootClass"
        orientation="vertical"
        activationMode="manual"
      >
        <TabsList aria-label="tabs example" class="tabs_listClass">
          <TabsTrigger value="tab1" class="tabs_triggerClass">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" {...{ disabled: true }} class="tabs_triggerClass">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" class="tabs_triggerClass">
            Tab 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" class="tabs_contentClass">
          Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
          integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
          pellentesque volutpat dictum ipsum.
        </TabsContent>
        <TabsContent value="tab2" class="tabs_contentClass">
          You'll never find me!
        </TabsContent>
        <TabsContent value="tab3" class="tabs_contentClass">
          Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
          quam tempus pretium.
        </TabsContent>
      </Tabs>
    </>
  )
}

export function Animated() {
  return (
    <>
      <h1>Horizontal (automatic activation)</h1>
      <Tabs defaultValue="tab1" class="tabs_rootClass">
        <TabsList aria-label="tabs example" class="tabs_listClass">
          <TabsTrigger value="tab1" class="tabs_triggerClass">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" {...{ disabled: true }} class="tabs_triggerClass">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" class="tabs_triggerClass">
            Tab 3
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tab1" class="tabs_animatedContentClass">
          Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
          integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
          pellentesque volutpat dictum ipsum.
        </TabsContent>
        <TabsContent value="tab2" class="tabs_animatedContentClass">
          You'll never find me!
        </TabsContent>
        <TabsContent value="tab3" class="tabs_animatedContentClass">
          Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
          quam tempus pretium.
        </TabsContent>
      </Tabs>

      <h1>Vertical (manual activation)</h1>
      <Tabs
        defaultValue="tab1"
        class="tabs_rootClass"
        orientation="vertical"
        activationMode="manual"
      >
        <TabsList aria-label="tabs example" class="tabs_listClass">
          <TabsTrigger value="tab1" class="tabs_triggerClass">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" {...{ disabled: true }} class="tabs_triggerClass">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" class="tabs_triggerClass">
            Tab 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" class="tabs_animatedContentClass">
          Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
          integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
          pellentesque volutpat dictum ipsum.
        </TabsContent>
        <TabsContent value="tab2" class="tabs_animatedContentClass">
          You'll never find me!
        </TabsContent>
        <TabsContent value="tab3" class="tabs_animatedContentClass">
          Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
          quam tempus pretium.
        </TabsContent>
      </Tabs>
    </>
  )
}

export function Chromatic() {
  return (
    <>
      <h1>Uncontrolled</h1>
      <Tabs defaultValue="tab3" class="tabs_rootClass">
        <TabsList aria-label="tabs example" class="tabs_listClass">
          <TabsTrigger value="tab1" class="tabs_triggerClass">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" {...{ disabled: true }} class="tabs_triggerClass">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" class="tabs_triggerClass">
            Tab 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" class="tabs_contentClass">
          Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
          integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
          pellentesque volutpat dictum ipsum.
        </TabsContent>
        <TabsContent value="tab2" class="tabs_contentClass">
          You'll never find me!
        </TabsContent>
        <TabsContent value="tab3" class="tabs_contentClass">
          Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
          quam tempus pretium.
        </TabsContent>
      </Tabs>

      <h1>Controlled</h1>
      <Tabs value="tab3" class="tabs_rootClass">
        <TabsList aria-label="tabs example" class="tabs_listClass">
          <TabsTrigger value="tab1" class="tabs_triggerClass">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" {...{ disabled: true }} class="tabs_triggerClass">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" class="tabs_triggerClass">
            Tab 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" class="tabs_contentClass">
          Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
          integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
          pellentesque volutpat dictum ipsum.
        </TabsContent>
        <TabsContent value="tab2" class="tabs_contentClass">
          You'll never find me!
        </TabsContent>
        <TabsContent value="tab3" class="tabs_contentClass">
          Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
          quam tempus pretium.
        </TabsContent>
      </Tabs>

      <h1>Vertical</h1>
      <Tabs
        defaultValue="tab3"
        class="tabs_rootClass"
        orientation="vertical"
        activationMode="manual"
      >
        <TabsList aria-label="tabs example" class="tabs_listClass">
          <TabsTrigger value="tab1" class="tabs_triggerClass">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" {...{ disabled: true }} class="tabs_triggerClass">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" class="tabs_triggerClass">
            Tab 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" class="tabs_contentClass">
          Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
          integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
          pellentesque volutpat dictum ipsum.
        </TabsContent>
        <TabsContent value="tab2" class="tabs_contentClass">
          You'll never find me!
        </TabsContent>
        <TabsContent value="tab3" class="tabs_contentClass">
          Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
          quam tempus pretium.
        </TabsContent>
      </Tabs>

      <h1>Direction</h1>
      <h2>Prop</h2>
      <Tabs defaultValue="tab3" dir="rtl" class="tabs_rootClass">
        <TabsList aria-label="tabs example" class="tabs_listClass">
          <TabsTrigger value="tab1" class="tabs_triggerClass">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" {...{ disabled: true }} class="tabs_triggerClass">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" class="tabs_triggerClass">
            Tab 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" class="tabs_contentClass">
          Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
          integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
          pellentesque volutpat dictum ipsum.
        </TabsContent>
        <TabsContent value="tab2" class="tabs_contentClass">
          You'll never find me!
        </TabsContent>
        <TabsContent value="tab3" class="tabs_contentClass">
          Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
          quam tempus pretium.
        </TabsContent>
      </Tabs>

      <h2>Inherited Wip:DirectionProvider</h2>
      {/* <DirectionProvider dir="rtl"> */}
      <Tabs defaultValue="tab3" class="tabs_rootClass">
        <TabsList aria-label="tabs example" class="tabs_listClass">
          <TabsTrigger value="tab1" class="tabs_triggerClass">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" {...{ disabled: true }} class="tabs_triggerClass">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" class="tabs_triggerClass">
            Tab 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" class="tabs_contentClass">
          Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem
          himenaeos integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida
          elementum pellentesque volutpat dictum ipsum.
        </TabsContent>
        <TabsContent value="tab2" class="tabs_contentClass">
          You'll never find me!
        </TabsContent>
        <TabsContent value="tab3" class="tabs_contentClass">
          Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
          quam tempus pretium.
        </TabsContent>
      </Tabs>
      {/* </DirectionProvider> */}

      <h1>Animated</h1>
      <p>Should not animate on initial mount</p>
      <Tabs value="tab1" class="tabs_rootClass">
        <TabsList aria-label="tabs example" class="tabs_listClass">
          <TabsTrigger value="tab1" class="tabs_triggerClass">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" {...{ disabled: true }} class="tabs_triggerClass">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" class="tabs_triggerClass">
            Tab 3
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="tab1"
          class="tabs_animatedContentClass"
          style={{ animationDuration: '3000ms' }}
        >
          Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
          integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
          pellentesque volutpat dictum ipsum.
        </TabsContent>
        <TabsContent value="tab2" class="tabs_animatedContentClass">
          You'll never find me!
        </TabsContent>
        <TabsContent value="tab3" class="tabs_animatedContentClass">
          Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
          quam tempus pretium.
        </TabsContent>
      </Tabs>

      <h1>Force mounted contents</h1>
      <Tabs class="tabs_rootClass">
        <TabsList aria-label="tabs example" class="tabs_listClass">
          <TabsTrigger value="tab1" class="tabs_triggerClass">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" class="tabs_triggerClass">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" class="tabs_triggerClass">
            Tab 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" class="tabs_contentClass" forceMount>
          Tab 1 content
        </TabsContent>
        <TabsContent value="tab2" class="tabs_contentClass" forceMount>
          Tab 2 content
        </TabsContent>
        <TabsContent value="tab3" class="tabs_contentClass" forceMount>
          Tab 3 content
        </TabsContent>
      </Tabs>

      <h1>State attributes</h1>
      <Tabs defaultValue="tab3" class="tabs_rootAttrClass">
        <TabsList aria-label="tabs example" class="tabs_listAttrClass">
          <TabsTrigger value="tab1" class="tabs_triggerAttrClass">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" {...{ disabled: true }} class="tabs_triggerAttrClass">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" class="tabs_triggerAttrClass">
            Tab 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" class="tabs_contentAttrClass">
          Dis metus rhoncus sit convallis sollicitudin vel cum, hac purus tincidunt eros sem himenaeos
          integer, faucibus varius nullam nostra bibendum consectetur mollis, gravida elementum
          pellentesque volutpat dictum ipsum.
        </TabsContent>
        <TabsContent value="tab2" class="tabs_contentAttrClass">
          You'll never find me!
        </TabsContent>
        <TabsContent value="tab3" class="tabs_contentAttrClass">
          Ut nisi elementum metus semper mauris dui fames accumsan aenean, maecenas ac sociis dolor
          quam tempus pretium.
        </TabsContent>
      </Tabs>
    </>
  )
}

Chromatic.parameters = { chromatic: { disable: false } }
