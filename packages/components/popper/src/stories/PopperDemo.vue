<script setup lang="ts">
import Styled from './Styled.vue'

export interface IPopperProps {
  template?: 'Styled'
  allshow?: boolean
}

withDefaults(defineProps<IPopperProps>(), {})
</script>

<template>
  <div
    v-if="template === 'Styled'"
    class="h-[200vh] flex justify-center items-center"
  >
    <Styled />
  </div>

  <!-- <div v-if="template === '#2'" class="flex justify-center items-center">
    <OkuPopper>
      <OkuPopperAnchor class="h-10 w-10 flex items-center">
        <button class="bg-blue-500" @click="setPressed(!pressed)">
          Toggle
        </button>
      </OkuPopperAnchor>
      <Teleport to="body">
        <Transition name="fade">
          <OkuPopperContent
            v-show="pressed"
            :side-offset="5"
            side="right"
            align="start"
          >
            <button @click="setPressed(!pressed)">
              close
            </button>
            <OkuPopperArrow as-child class="bg-gray-200" offset="20">
              <div class="w-20 h-5 rounded-bl-xl rounded-br-xl bg-red-500" />
            </OkuPopperArrow>
          </OkuPopperContent>
        </Transition>
      </Teleport>
    </OkuPopper>
  </div> -->
</template>

<!-- const RECOMMENDED_CSS__POPPER__CONTENT = {
  transformOrigin: 'var(--radix-popper-transform-origin)',
};

const contentClass = css({
  ...RECOMMENDED_CSS__POPPER__CONTENT,
  backgroundColor: '$gray100',
  padding: 10,
  borderRadius: 10,

  variants: {
    size: {
      small: { width: 100, height: 50 },
      large: { width: 300, height: 150 },
    },
  },
  defaultVariants: {
    size: 'large',
  },
});
const anchorClass = css({
  backgroundColor: 'hotpink',

  variants: {
    size: {
      small: { width: 50, height: 50 },
      large: { width: 100, height: 100 },
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

const arrowClass = css({
  fill: '$gray100',
});

const rotateIn = keyframes({
  '0%': { transform: 'scale(0) rotateZ(calc(var(--direction, 0) * 45deg))' },
  '100%': { transform: 'scale(1)' },
});

const animatedContentClass = css(contentClass, {
  '&[data-side="top"]': { '--direction': '1' },
  '&[data-side="bottom"]': { '--direction': '-1' },
  animation: `${rotateIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
}); -->

<style lang="postcss">
.contentClass {
  transform-origin: var(--oku-popper-transform-origin);
  background-color: #f9fafb;
  padding: 10px;
  border-radius: 10px;
  width: 300px;
  height: 150px;
  background-color: #f9fafb;
  padding: 10px;
  border-radius: 10px;

  &.size-small {
    width: 100px;
    height: 50px;
  }

  &.size-large {
    width: 300px;
    height: 150px;
  }

  &.default {
    width: 300px;
    height: 150px;
  }
}

.anchorClass {
  background-color: hotpink;
  width: 100px;
  height: 100px;

  &.size-small {
    width: 50px;
    height: 50px;
  }

  &.size-large {
    width: 100px;
    height: 100px;
  }

  &.default {
    width: 100px;
    height: 100px;
  }
}

.arrowClass {
  fill: #f9fafb;
}

@keyframes rotateIn {
  0% {
    transform: scale(0) rotateZ(calc(var(--direction, 0) * 45deg));
  }
  100% {
    transform: scale(1);
  }
}

.animatedContentClass {
  --direction: 1;

  &[data-side='top'] {
    --direction: 1;
  }

  &[data-side='bottom'] {
    --direction: -1;
  }

  animation: rotateIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
