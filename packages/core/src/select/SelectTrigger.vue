<script setup lang="ts">
import { DEFAULT_SELECT_TRIGGER_PROPS, type SelectTriggerProps } from './SelectTrigger'

defineOptions({
  name: 'SelectTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SelectTriggerProps>(), DEFAULT_SELECT_TRIGGER_PROPS)
</script>
