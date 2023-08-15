<script setup lang="ts">
import {
  OkuRadioGroup,
  OkuRadioGroupIndicator,
  OkuRadioGroupItem,
} from '@oku-ui/radio-group'
import {
  OkuLabel,
} from '@oku-ui/Label'

export interface ITabsProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

defineProps<ITabsProps>()
</script>

<template>
  <div v-if="template === '#1' || allshow">
    <h1>Horizontal (automatic activation)</h1>
    <OkuLabel>
      Favourite pet
      <OkuRadioGroup default-value="1">
        <OkuLabel>
          <OkuRadioGroupItem value="1">
            <OkuRadioGroupIndicator />
          </OkuRadioGroupItem>
          Cat
        </OkuLabel>{' '}
        <OkuLabel>
          <OkuRadioGroupItem value="2">
            <OkuRadioGroupIndicator />
          </OkuRadioGroupItem>
          Dog
        </OkuLabel>{' '}
        <OkuLabel>
          <OkuRadioGroupItem value="3">
            <OkuRadioGroupIndicator />
          </OkuRadioGroupItem>
          Rabbit
        </OkuLabel>
      </OkuRadioGroup>
    </OkuLabel>
  </div>
</template>
