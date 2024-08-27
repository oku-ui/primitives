<script setup lang="ts">
import { Label } from '../../label/index.ts'
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from '../index.ts'
import './styles.css'
</script>

<template>
  <Label>
    Favourite pet
    <RadioGroupRoot class="radioGroup_rootClass" default-value="1">
      <Label>
        <RadioGroupItem class="radioGroup_itemClass" value="1">
          <RadioGroupIndicator class="radioGroup_indicatorClass" />
        </RadioGroupItem>
        Cat
      </Label>{{ ' ' }}
      <Label>
        <RadioGroupItem class="radioGroup_itemClass" value="2" disabled>
          <RadioGroupIndicator class="radioGroup_indicatorClass" />
        </RadioGroupItem>
        Dog
      </Label>{{ ' ' }}
      <Label>
        <RadioGroupItem class="radioGroup_itemClass" value="3">
          <RadioGroupIndicator class="radioGroup_indicatorClass" />
        </RadioGroupItem>
        Rabbit
      </Label>
    </RadioGroupRoot>
  </Label>
</template>
