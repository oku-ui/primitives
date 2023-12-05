<script lang="ts" setup>
/**
 * @credits NuxtLabs <https://nuxtlabs.com/>
 * @see https://github.com/nuxt/nuxt.com/blob/main/components/OgImage/OgImageDocs.vue
 */
import { computed } from 'vue'

const props = withDefaults(defineProps<{ title?: string, description?: string, headline?: string }>(), {
  title: 'title',
  description: 'description',
  headline: 'headline',
})

const title = computed(() => props.title.slice(0, 60))
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center bg-[#212121]">
    <svg class="absolute top-0 right-0" width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g style="mix-blend-mode:overlay" opacity="0.7" filter="url(#filter0_f_448_25)">
        <circle cx="901.5" cy="45.5" r="199.5" fill="#FFA7A7" />
        <circle cx="600.5" cy="216.5" r="199.5" fill="#FFCC49" />
        <circle cx="179.5" cy="317.5" r="199.5" fill="#FFA149" />
      </g>
      <defs>
        <filter id="filter0_f_448_25" x="-240" y="-374" width="1561" height="1111" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="110" result="effect1_foregroundBlur_448_25" />
        </filter>
      </defs>
    </svg>

    <div class="w-[600px] pl-[100px]">
      <p v-if="headline" class="uppercase text-[24px] text-[#FEC476] mb-4 font-semibold">
        Oku - Pergel
      </p>
      <h1 class="w-[600px] m-0 text-[75px] font-semibold mb-4 text-white flex items-center">
        <span>{{ title }}</span>
      </h1>
      <p class="text-[32px] text-[#E4E4E7] leading-tight">
        {{ description.slice(0, 200) }}
      </p>
    </div>

    <svg class="absolute top-[250px] right-[190px]" width="241" height="184" viewBox="0 0 241 184" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_ddd_563_6)">
        <path d="M204.852 126.822C204.852 127.098 204.677 128.114 202.583 129.748C200.551 131.335 197.276 133.034 192.613 134.687C183.325 137.979 169.872 140.62 153.875 142.19C137.92 143.755 120.334 144.166 103.363 143.367C86.3776 142.566 70.8801 140.594 58.8213 137.738C52.7901 136.31 47.8449 134.713 44.0617 133.037C40.1988 131.325 37.891 129.679 36.7621 128.335C36.2309 127.702 36.0703 127.267 36.0227 127.035C35.9829 126.842 35.9842 126.629 36.1192 126.305C36.459 125.488 37.6413 124.038 40.7165 122.28C46.7614 118.823 57.5073 115.641 71.9244 113.359C86.2251 111.096 103.109 109.879 120.426 109.879" stroke="url(#paint0_angular_563_6)" stroke-width="8" />
      </g>
      <g clip-path="url(#clip0_563_6)">
        <g filter="url(#filter1_i_563_6)">
          <path d="M211.514 112.29L209.41 124.066L200.573 115.781L182.897 61.0337C186.772 60.5223 190.442 59.2291 193.777 57.2455L211.514 112.29ZM196.523 35.7822C195.733 40.2018 193.22 44.1268 189.537 46.6936C185.853 49.2604 181.301 50.2588 176.881 49.4691L174.437 49.0324L131.693 103.474L120.534 108.187L122.638 96.4106L165.598 41.721C160.708 33.7969 163.149 23.3421 171.139 18.407C174.615 16.2766 178.781 15.416 182.836 16.1405L184.821 5.03095C186.294 5.29416 187.603 6.13183 188.458 7.35968C189.314 8.58752 189.647 10.105 189.383 11.5782L188.212 18.1328C194.461 21.6568 197.783 28.7276 196.523 35.7822ZM185.413 33.7973C185.677 32.3241 185.344 30.8066 184.488 29.5788C183.633 28.3509 182.324 27.5133 180.851 27.25C179.378 26.9868 177.861 27.3196 176.633 28.1752C175.405 29.0308 174.567 30.3391 174.304 31.8123C174.041 33.2856 174.374 34.803 175.229 36.0308C176.085 37.2587 177.393 38.0964 178.866 38.3596C180.339 38.6228 181.857 38.29 183.085 37.4344C184.313 36.5788 185.15 35.2705 185.413 33.7973Z" fill="url(#paint1_diamond_563_6)" />
        </g>
      </g>
      <defs>
        <filter id="filter0_ddd_563_6" x="-3.8147e-05" y="77.8786" width="240.852" height="105.886" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="3.62319" />
          <feGaussianBlur stdDeviation="7.24638" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.667391 0 0 0 0 0.3625 0 0 0 0.75 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_563_6" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="16" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.854792 0 0 0 0 0.4875 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_563_6" result="effect2_dropShadow_563_6" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="effect2_dropShadow_563_6" result="effect3_dropShadow_563_6" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_563_6" result="shape" />
        </filter>
        <filter id="filter1_i_563_6" x="120.534" y="5.03094" width="94.9804" height="123.035" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="7" dy="5" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_563_6" />
        </filter>
        <radialGradient id="paint0_angular_563_6" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(120.426 126.822) rotate(90) scale(20.943 88.4261)">
          <stop offset="0.0677083" stop-color="#FFE092" />
          <stop offset="0.333333" stop-color="#FFD792" />
          <stop offset="0.666667" stop-color="#FFD192" />
          <stop offset="1" stop-color="#FFAC5F" />
        </radialGradient>
        <radialGradient id="paint1_diamond_563_6" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(303.899 145.741) rotate(-155.036) scale(253.361 239.508)">
          <stop offset="0.333674" stop-color="#FEC479" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </radialGradient>
        <clipPath id="clip0_563_6">
          <rect width="135.426" height="135.426" fill="white" transform="translate(96.5743)" />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>
