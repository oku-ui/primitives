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
  <div class="w-full h-full flex flex-col justify-center bg-[#070809]">
    <svg class="absolute top-0 inset-0 left-0" width="1920" height="960" viewBox="0 0 1920 960" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.8">
        <mask id="mask0_605_5159" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-199" y="-324" width="2271" height="1396">
          <circle opacity="0.8" cx="372.822" cy="14.7198" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="710.05" cy="251.127" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="1012.51" cy="428.433" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="1334.1" cy="650.934" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="1627.87" cy="372.807" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="1162" cy="169.428" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="1753.02" cy="112.064" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="1382.77" cy="59.9154" r="0.869145" fill="white" />
          <circle opacity="0.5" cx="470.165" cy="98.1577" r="0.869145" fill="white" />
          <circle opacity="0.5" cx="1109.86" cy="511.871" r="0.869145" fill="white" />
          <circle opacity="0.5" cx="1431.44" cy="734.372" r="0.869145" fill="white" />
          <circle opacity="0.5" cx="1725.21" cy="456.245" r="0.869145" fill="white" />
          <circle opacity="0.5" cx="1259.35" cy="252.865" r="0.869145" fill="white" />
          <circle opacity="0.5" cx="1850.37" cy="195.502" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="1473.16" cy="859.529" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="1766.93" cy="581.402" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="1301.07" cy="378.023" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="1009.04" cy="110.326" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="1885.13" cy="113.802" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="1892.09" cy="320.659" r="0.869145" fill="white" />
          <circle cx="710.05" cy="459.722" r="0.869145" fill="white" />
          <circle cx="1334.1" cy="859.529" r="0.869145" fill="white" />
          <circle cx="1627.87" cy="581.402" r="0.869145" fill="white" />
          <circle cx="1162" cy="378.023" r="0.869145" fill="white" />
          <circle cx="869.971" cy="110.326" r="0.869145" fill="white" />
          <circle cx="1746.07" cy="113.802" r="0.869145" fill="white" />
          <circle cx="1753.02" cy="320.659" r="0.869145" fill="white" />
          <circle cx="1382.77" cy="268.51" r="0.869145" fill="white" />
          <circle opacity="0.3" cx="219.853" cy="153.783" r="0.869145" fill="white" />
          <circle opacity="0.3" cx="557.081" cy="390.19" r="0.869145" fill="white" />
          <circle opacity="0.3" cx="859.541" cy="567.496" r="0.869145" fill="white" />
          <circle opacity="0.3" cx="1181.13" cy="789.997" r="0.869145" fill="white" />
          <circle opacity="0.3" cx="1474.9" cy="511.871" r="0.869145" fill="white" />
          <circle opacity="0.3" cx="1009.04" cy="308.491" r="0.869145" fill="white" />
          <circle opacity="0.3" cx="717.002" cy="40.7943" r="0.869145" fill="white" />
          <circle opacity="0.3" cx="1593.1" cy="44.2708" r="0.869145" fill="white" />
          <circle opacity="0.3" cx="1600.05" cy="251.127" r="0.869145" fill="white" />
          <circle opacity="0.3" cx="1229.8" cy="198.979" r="0.869145" fill="white" />
          <circle opacity="0.67" cx="150.32" cy="0.813512" r="0.869145" fill="white" />
          <circle opacity="0.67" cx="487.55" cy="237.221" r="0.869145" fill="white" />
          <circle opacity="0.67" cx="790.013" cy="414.526" r="0.869145" fill="white" />
          <circle opacity="0.67" cx="1405.36" cy="358.901" r="0.869145" fill="white" />
          <circle opacity="0.67" cx="1530.52" cy="98.1577" r="0.869145" fill="white" />
          <circle opacity="0.67" cx="1160.27" cy="46.0089" r="0.869145" fill="white" />
          <circle opacity="0.9" cx="275.476" cy="70.3451" r="0.869145" fill="white" />
          <circle opacity="0.9" cx="612.707" cy="306.753" r="0.869145" fill="white" />
          <circle opacity="0.9" cx="915.167" cy="484.058" r="0.869145" fill="white" />
          <circle opacity="0.9" cx="1530.52" cy="428.433" r="0.869145" fill="white" />
          <circle opacity="0.9" cx="1064.66" cy="225.053" r="0.869145" fill="white" />
          <circle opacity="0.9" cx="1655.68" cy="167.689" r="0.869145" fill="white" />
          <circle opacity="0.9" cx="1285.42" cy="115.541" r="0.869145" fill="white" />
          <circle opacity="0.8" cx="26.655" cy="224.806" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="363.883" cy="461.213" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="666.346" cy="638.519" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="987.929" cy="861.02" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="1281.7" cy="582.894" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="815.837" cy="379.514" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="1399.9" cy="115.293" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="1406.86" cy="322.15" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="1036.6" cy="270.001" r="2.3604" fill="white" />
          <circle opacity="0.5" cx="123.998" cy="308.244" r="2.3604" fill="white" />
          <circle opacity="0.5" cx="763.689" cy="721.957" r="2.3604" fill="white" />
          <circle opacity="0.5" cx="1085.27" cy="944.458" r="2.3604" fill="white" />
          <circle opacity="0.5" cx="1379.05" cy="666.332" r="2.3604" fill="white" />
          <circle opacity="0.5" cx="913.183" cy="462.951" r="2.3604" fill="white" />
          <circle opacity="0.5" cx="621.15" cy="195.255" r="2.3604" fill="white" />
          <circle opacity="0.5" cx="1093.96" cy="59.6684" r="2.3604" fill="white" />
          <circle opacity="0.5" cx="1497.25" cy="198.732" r="2.3604" fill="white" />
          <circle opacity="0.5" cx="1504.2" cy="405.588" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="1420.77" cy="791.489" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="954.902" cy="588.109" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="662.87" cy="320.411" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="1538.97" cy="323.888" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="1545.92" cy="530.745" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="593.337" cy="122.247" r="2.3604" fill="white" />
          <circle opacity="0.8" cx="1724.96" cy="96.1723" r="2.3604" fill="white" />
          <circle cx="363.883" cy="669.808" r="2.3604" fill="white" />
          <circle cx="1281.7" cy="791.488" r="2.3604" fill="white" />
          <circle cx="815.837" cy="588.109" r="2.3604" fill="white" />
          <circle cx="523.805" cy="320.411" r="2.3604" fill="white" />
          <circle cx="996.619" cy="184.825" r="2.3604" fill="white" />
          <circle cx="1399.9" cy="323.888" r="2.3604" fill="white" />
          <circle cx="1406.86" cy="530.745" r="2.3604" fill="white" />
          <circle cx="1036.6" cy="478.596" r="2.3604" fill="white" />
          <circle cx="454.274" cy="122.247" r="2.3604" fill="white" />
          <circle cx="1585.9" cy="96.1723" r="2.3604" fill="white" />
          <circle opacity="0.3" cx="210.913" cy="600.276" r="2.3604" fill="white" />
          <circle opacity="0.3" cx="513.376" cy="777.582" r="2.3604" fill="white" />
          <circle opacity="0.3" cx="1128.73" cy="721.957" r="2.3604" fill="white" />
          <circle opacity="0.3" cx="662.87" cy="518.577" r="2.3604" fill="white" />
          <circle opacity="0.3" cx="370.835" cy="250.88" r="2.3604" fill="white" />
          <circle opacity="0.3" cx="843.65" cy="115.293" r="2.3604" fill="white" />
          <circle opacity="0.3" cx="1246.93" cy="254.357" r="2.3604" fill="white" />
          <circle opacity="0.3" cx="1253.89" cy="461.213" r="2.3604" fill="white" />
          <circle opacity="0.3" cx="883.631" cy="409.064" r="2.3604" fill="white" />
          <circle opacity="0.3" cx="301.305" cy="52.715" r="2.3604" fill="white" />
          <circle opacity="0.3" cx="1015.74" cy="42.2851" r="2.3604" fill="white" />
          <circle opacity="0.3" cx="1432.93" cy="26.6406" r="2.3604" fill="white" />
          <circle opacity="0.67" cx="141.383" cy="447.307" r="2.3604" fill="white" />
          <circle opacity="0.67" cx="443.844" cy="624.613" r="2.3604" fill="white" />
          <circle opacity="0.67" cx="1059.2" cy="568.987" r="2.3604" fill="white" />
          <circle opacity="0.67" cx="1177.4" cy="101.387" r="2.3604" fill="white" />
          <circle opacity="0.67" cx="1184.36" cy="308.244" r="2.3604" fill="white" />
          <circle opacity="0.67" cx="814.099" cy="256.095" r="2.3604" fill="white" />
          <circle opacity="0.9" cx="266.537" cy="516.839" r="2.3604" fill="white" />
          <circle opacity="0.9" cx="569" cy="694.144" r="2.3604" fill="white" />
          <circle opacity="0.9" cx="1184.36" cy="638.519" r="2.3604" fill="white" />
          <circle opacity="0.9" cx="718.494" cy="435.139" r="2.3604" fill="white" />
          <circle opacity="0.9" cx="426.461" cy="167.442" r="2.3604" fill="white" />
          <circle opacity="0.9" cx="899.276" cy="31.8556" r="2.3604" fill="white" />
          <circle opacity="0.9" cx="1302.56" cy="170.919" r="2.3604" fill="white" />
          <circle opacity="0.9" cx="1309.51" cy="377.775" r="2.3604" fill="white" />
          <circle opacity="0.9" cx="939.257" cy="325.626" r="2.3604" fill="white" />
        </mask>
        <g mask="url(#mask0_605_5159)">
          <circle cx="1003.68" cy="411.708" r="761.914" fill="url(#paint0_radial_605_5159)" />
        </g>
      </g>
      <defs>
        <radialGradient id="paint0_radial_605_5159" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1003.68 411.708) rotate(90) scale(761.914)">
          <stop stop-color="#D9D9D9" />
          <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>

    <svg class="absolute top-0 inset-0" width="920" height="660" viewBox="0 0 1920 960" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.3" filter="url(#filter0_f_504_217)">
        <rect x="500.221" y="-5.00562" width="595.989" height="1375.25" transform="rotate(-30 500.221 -5.00562)" fill="url(#paint0_linear_504_217)" />
      </g>
      <g opacity="0.1" filter="url(#filter1_f_504_217)">
        <rect x="1229.23" y="-32.0611" width="346.942" height="1375.25" transform="rotate(-30 1229.23 -32.0611)" fill="url(#paint1_linear_504_217)" />
      </g>
      <g opacity="0.1" filter="url(#filter2_f_504_217)">
        <rect x="-42" y="-91.7605" width="275.571" height="1375.25" transform="rotate(-30 -42 -91.7605)" fill="url(#paint2_linear_504_217)" />
      </g>
      <defs>
        <filter id="filter0_f_504_217" x="369.942" y="-433.278" width="1464.33" height="1749.56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="65.1392" result="effect1_foregroundBlur_504_217" />
        </filter>
        <filter id="filter1_f_504_217" x="1098.95" y="-335.81" width="1248.64" height="1625.03" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="65.1392" result="effect1_foregroundBlur_504_217" />
        </filter>
        <filter id="filter2_f_504_217" x="-172.278" y="-359.824" width="1186.84" height="1589.35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="65.1392" result="effect1_foregroundBlur_504_217" />
        </filter>
        <linearGradient id="paint0_linear_504_217" x1="798.215" y1="-5.00562" x2="798.215" y2="1370.25" gradientUnits="userSpaceOnUse">
          <stop stop-color="#D9D9D9" stop-opacity="0.4" />
          <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear_504_217" x1="1402.7" y1="-32.0611" x2="1402.7" y2="1343.19" gradientUnits="userSpaceOnUse">
          <stop stop-color="#D9D9D9" stop-opacity="0.4" />
          <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="paint2_linear_504_217" x1="95.7855" y1="-91.7605" x2="95.7855" y2="1283.49" gradientUnits="userSpaceOnUse">
          <stop stop-color="#D9D9D9" stop-opacity="0.4" />
          <stop offset="1" stop-color="#D9D9D9" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>

    <div class="w-[600px] pl-[100px]">
      <p v-if="headline" class="uppercase text-[24px] text-[#e9e8e6] mb-4 font-semibold">
        Oku - Primitives
      </p>
      <h1 class="w-[600px] m-0 text-[75px] font-semibold mb-4 text-white flex items-center">
        <span>{{ title }}</span>
      </h1>
      <p class="text-[32px] text-[#E4E4E7] leading-tight">
        {{ description.slice(0, 200) }}
      </p>
    </div>

    <svg class="absolute top-[240px] right-[260px]" width="120" height="156" viewBox="0 0 120 156" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M88.6736 85.4393C75.2813 75.6093 60.9796 59.8823 57.3626 42.5526C57.0896 46.3968 57.091 50.2498 57.7792 54.2525C59.0102 61.4298 61.7596 68.2374 65.6138 74.3783C69.5599 80.6645 74.6219 85.9388 80.1179 90.8429C85.2849 95.4522 90.1491 100.183 91.2522 107.362C96.919 108.731 102.204 111.396 106.289 115.835C110.392 120.292 112.479 125.819 112.438 131.427C114.46 126.536 115.307 121.262 113.771 115.047C110.425 101.519 99.2347 93.1904 88.6736 85.4393Z" fill="white" />
      <path d="M60.0448 70.6308C55.7382 61.9317 52.7044 50.1681 54.6351 39.952C51.2996 49.4772 50.1459 59.741 51.344 69.8539C52.9185 83.1435 58.9029 100.509 71.5151 106.947C73.6743 106.667 75.8131 106.418 77.9103 106.292C81.2201 106.093 84.6074 106.209 87.9214 106.714C85.952 98.3159 77.9033 93.5512 72.2176 87.6818C67.3581 82.6631 63.1578 76.917 60.0448 70.6308Z" fill="white" />
      <path d="M43.3044 17.74C41.3308 12.0346 38.0986 6.86198 34.0622 2.40214C33.6427 1.93882 33.2116 1.46286 32.7692 0.977905C33.2202 1.67331 33.657 2.37011 34.0764 3.05399C36.9092 7.66611 39.2735 12.6095 40.7763 17.8316C43.7956 28.3233 42.1209 38.7456 40.0164 49.2288C37.6002 61.2524 35.7614 73.3341 40.884 84.9699C45.2021 94.7797 53.1731 101.806 63.0589 105.044C54.1599 96.6043 49.6437 82.8112 48.1655 71.2012C47.3467 64.767 47.4184 58.2865 48.3321 51.945C47.9213 40.3702 47.1687 28.9027 43.3044 17.74Z" fill="white" />
      <path d="M28.3654 37.9624C24.8 47.2785 20.8813 56.7424 20.2636 66.8293C19.926 72.3635 20.5566 78.0619 22.628 83.2286C23.1997 84.6571 23.8964 85.9782 24.6693 87.2383C30.5876 93.0221 35.384 100.046 42.3468 104.539C48.469 108.489 55.3255 108.738 62.2623 108.091C43.7229 102.48 33.0138 83.4913 34.5395 64.1319C35.4401 52.7195 39.567 41.737 39.6244 30.2318C39.6691 21.1293 36.5951 13.2402 32.2754 5.8667C32.8615 7.71351 33.3169 9.605 33.5957 11.5417C34.9305 20.8095 31.6651 29.3414 28.4145 37.834L28.3654 37.9624Z" fill="white" />
      <path d="M66.8281 155.161C77.3217 156.162 89.2058 155.256 98.2801 149.349C108.457 142.725 112.859 129.326 104.664 119.235C88.874 99.7916 63.5644 117.936 44.2968 109.498C34.8936 105.38 29.5801 96.0606 22.2051 89.3809C17.0035 84.6715 10.8784 81.2757 4.32368 79.1926C6.26438 80.203 8.15335 81.328 9.96764 82.6028C16.5439 87.218 21.1119 93.2833 25.815 99.7161C31.7203 107.792 39.3007 113.104 49.221 114.706C57.659 116.07 67.1197 114.688 75.0347 118.453C80.5005 121.053 84.8546 127.307 82.6597 133.539C80.4347 139.855 72.962 143.227 66.933 144.378C51.0096 147.421 36.5298 137.728 27.2787 125.394C21.0717 117.117 16.9992 107.702 12.5289 98.4284C10.1587 93.5083 7.21389 89.3042 3.07107 85.7589C2.08132 84.9109 1.05137 84.1228 -0.000143051 83.3647C8.85437 93.909 12.8535 108.575 18.5693 121.169C27.6135 141.097 45.2808 153.103 66.8281 155.161Z" fill="white" />
      <path d="M11.5144 87.2233C8.02231 84.256 4.14954 81.904 0.0311241 80.0923C2.56365 81.7458 4.94679 83.6361 7.08572 85.6642C12.7929 91.0765 15.5854 98.1567 18.9554 105.129C25.8721 119.432 35.2452 134.621 51.0522 139.885C58.5681 142.388 67.4311 142.186 74.3063 137.919C78.3469 135.41 81.3162 131.039 78.7306 126.314C76.2009 121.69 70.8341 120.241 66.0235 119.628C58.4057 118.66 50.6588 119.035 43.2291 116.776C37.0882 114.907 31.5118 111.323 27.2167 106.51C21.6402 100.266 17.9772 92.7126 11.5144 87.2233Z" fill="white" />
      <path d="M102.624 150.41C107.244 154.302 114.833 151.37 118.027 146.737C121.425 141.814 120.234 135.254 115.982 131.427C114.393 135.862 111.866 140.031 108.762 143.603C107.083 146.259 104.994 148.514 102.624 150.41Z" fill="white" />
    </svg>
  </div>
</template>
