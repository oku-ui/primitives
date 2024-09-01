<template>
  <div :style="{ maxWidth: '400px', display: 'flex', alignItems: 'center' }">
    <div :style="{ width: '60px', height: '60px', backgroundColor: 'white', borderRadius: '100px' }" />
    <div :style="{ marginLeft: 14 }">
      <div :style="{ width: '200px', backgroundColor: 'white', height: '14px', borderRadius: '100px' }" />
      <div
        :style="{
          width: '150px',
          backgroundColor: 'white',
          height: '14px',
          borderRadius: '100px',
          marginTop: '10px',
        }"
      />
    </div>
  </div>
</template>
