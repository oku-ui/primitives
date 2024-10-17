<script setup lang="ts">
import type { RadioGroupIndicatorProps } from './RadioGroupIndicator'
import { RADIO_GROUP_INDICATOR_NAME } from './constants'
import { useRadioScope } from './Radio'
import RadioIndicator from './RadioIndicator.vue'

defineOptions({
  name: RADIO_GROUP_INDICATOR_NAME,
})

const props = defineProps<RadioGroupIndicatorProps>()
const radioScope = useRadioScope(props.scopeOkuRadioGroup)
</script>

<template>
  <RadioIndicator
    :is="is"
    :as-child="asChild"
    :force-mount="forceMount"
    v-bind="radioScope"
  />
</template>
