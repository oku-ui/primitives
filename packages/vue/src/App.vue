<template>
  <h1>Default ratio</h1>
  <div :style="{ width: '300px' }">
    <OkuAspectRatio class="aspect-ratio">
      <p>Default ratio (1/1)</p>
    </OkuAspectRatio>
  </div>

  <h1>Custom ratios</h1>
  <div :style="{ display: 'flex', gap: '20px' }">
    <div :style="{ width: '200px' }">
      <OkuAspectRatio :ratio="1 / 2">
        <img
          src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
          alt="A house in a forest" :style="{ objectFit: 'cover', width: '100%', height: '100%' }"
        >
      </OkuAspectRatio>
    </div>
    <div :style="{ width: '200px' }">
      <OkuAspectRatio>
        <img
          src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
          alt="A house in a forest" :style="{ objectFit: 'cover', width: '100%', height: '100%' }"
        >
      </OkuAspectRatio>
    </div>
    <div :style="{ width: '200px' }">
      <OkuAspectRatio :ratio="16 / 9">
        <img
          src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
          alt="A house in a forest" :style="{ objectFit: 'cover', width: '100%', height: '100%' }"
        >
      </OkuAspectRatio>
    </div>
    <div :style="{ width: '200px' }">
      <OkuAspectRatio :ratio="2 / 1">
        <img
          src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
          alt="A house in a forest" :style="{ objectFit: 'cover', width: '100%', height: '100%' }"
        >
      </OkuAspectRatio>
    </div>
  </div>
</template>
