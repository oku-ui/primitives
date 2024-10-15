<script setup lang="ts">
import RadioGroupControlled from './RadioGroupControlled.vue'
import RadioGroupStyles from './RadioGroupStyles.vue'
import RadioGroupUnset from './RadioGroupUnset.vue'
import RadioGroupWithinForm from './RadioGroupWithinForm.vue'
import RadioGroupAnimated from './RadioGroupAnimated.vue'
import RadioGroupChromatic from './RadioGroupChromatic.vue'

type ITabsProps = {
  template?: 'styled' | 'controlled' | 'unset' | 'within-form' | 'animated' | 'chromatic'
  allshow?: boolean
}

defineProps<ITabsProps>()

</script>

<template>
  <div>
    <div v-if="template === 'styled'">
      <RadioGroupStyles />
    </div>
    <div v-else-if="template === 'controlled'">
      <RadioGroupControlled />
    </div>
    <div v-else-if="template === 'unset'">
      <RadioGroupUnset />
    </div>
    <div v-else-if="template === 'within-form'">
      <RadioGroupWithinForm />
    </div>
    <div v-else-if="template === 'animated'">
      <RadioGroupAnimated />
    </div>
    <div v-else-if="template === 'chromatic'">
      <RadioGroupChromatic />
    </div>
  </div>
</template>

<style>
</style>
