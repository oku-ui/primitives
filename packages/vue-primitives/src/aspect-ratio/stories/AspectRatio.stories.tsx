import { AspectRatio } from '../index.ts'
import './styles.css'

export default { title: 'Components/AspectRatio' }

const image = (
  <img
    src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
    alt="A house in a forest"
    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
  />
)

export function Styled() {
  return (
    <div style={{ width: '500px' }}>
      <AspectRatio class="asperRation__root">
        <h1>Default ratio (1/1)</h1>
      </AspectRatio>
    </div>
  )
}

export function CustomRatios() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ width: '200px' }}>
        <AspectRatio ratio={1 / 2}>{image}</AspectRatio>
      </div>
      <div style={{ width: '200px' }}>
        <AspectRatio>{image}</AspectRatio>
      </div>
      <div style={{ width: '200px' }}>
        <AspectRatio ratio={16 / 9}>{image}</AspectRatio>
      </div>
      <div style={{ width: '200px' }}>
        <AspectRatio ratio={2 / 1}>{image}</AspectRatio>
      </div>
    </div>
  )
}

export function Chromatic() {
  return (
    <>
      <h1>Default ratio</h1>
      <div style={{ width: '300px' }}>
        <AspectRatio class="asperRation__root">
          <p>Default ratio (1/1)</p>
        </AspectRatio>
      </div>

      <h1>Custom ratios</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ width: '200px' }}>
          <AspectRatio ratio={1 / 2}>{image}</AspectRatio>
        </div>
        <div style={{ width: '200px' }}>
          <AspectRatio>{image}</AspectRatio>
        </div>
        <div style={{ width: '200px' }}>
          <AspectRatio ratio={16 / 9}>{image}</AspectRatio>
        </div>
        <div style={{ width: '200px' }}>
          <AspectRatio ratio={2 / 1}>{image}</AspectRatio>
        </div>
      </div>
    </>
  )
}
Chromatic.parameters = { chromatic: { disable: false } }
