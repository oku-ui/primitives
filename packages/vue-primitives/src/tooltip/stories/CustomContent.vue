<script setup lang="ts">
import './styles.css'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useTooltipProvider } from '../index.ts'

useTooltipProvider()
</script>

<template>
  <div :style="{ display: 'flex', gap: '20px', padding: '100px' }">
    <TooltipRoot>
      <TooltipTrigger>Heading</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="tooltip_contentClass" :side-offset="5">
          <h1>Some heading</h1>
          <TooltipArrow class="tooltip_arrowClass" :offset="10" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>

    <TooltipRoot>
      <TooltipTrigger>Paragraph</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="tooltip_contentClass" :side-offset="5">
          <p>Some paragraph</p>
          <TooltipArrow class="tooltip_arrowClass" :offset="10" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>

    <TooltipRoot>
      <TooltipTrigger>List</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="tooltip_contentClass" :side-offset="5">
          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>
          <TooltipArrow class="tooltip_arrowClass" :offset="10" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>

    <TooltipRoot>
      <TooltipTrigger>Article</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="tooltip_contentClass" :side-offset="5">
          <article>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, quae qui. Magnam
            delectus ex totam repellat amet distinctio unde, porro architecto voluptatibus nemo et
            nisi, voluptatem eligendi earum autem fugit.
          </article>
          <TooltipArrow class="tooltip_arrowClass" :offset="10" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>

    <TooltipRoot>
      <TooltipTrigger>Figure</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="tooltip_contentClass" :side-offset="5">
          <figure :style="{ margin: 0 }">
            <img
              src="https://pbs.twimg.com/profile_images/864164353771229187/Catw6Nmh_400x400.jpg"
              alt=""
              :width="100"
            >
            <figcaption>Colm Tuite</figcaption>
          </figure>
          <TooltipArrow class="tooltip_arrowClass" :offset="10" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>

    <TooltipRoot>
      <TooltipTrigger>Time</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="tooltip_contentClass" :side-offset="5">
          <time datetime="2017-10-31T11:21:00+02:00">Tuesday, 31 October 2017</time>
          <TooltipArrow class="tooltip_arrowClass" :offset="10" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>

    <TooltipRoot>
      <TooltipTrigger>Link</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="tooltip_contentClass" :side-offset="5">
          View in <a href="https://workos.com">WorkOS</a>
          <TooltipArrow class="tooltip_arrowClass" :offset="10" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>

    <TooltipRoot>
      <TooltipTrigger>Form</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="tooltip_contentClass" :side-offset="5">
          <form>
            <label for="fname">First name:</label>
            <br>
            <input id="fname" type="text" name="fname">
            <br>
            <label for="lname">Last name:</label>
            <br>
            <input id="lname" type="text" name="lname">
          </form>
          <TooltipArrow class="tooltip_arrowClass" :offset="10" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>

    <TooltipRoot>
      <TooltipTrigger>Mini layout</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="tooltip_contentClass" :side-offset="5">
          <p
            :style="{
              margin: 0,
              textAlign: 'center',
              fontFamily: 'apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif',
              fontSize: '14px',
            }"
          >
            Start video call
            <span :style="{ display: 'block', color: '#999' }">
              press{{ ' ' }}
              <kbd
                :style="{
                  fontFamily: 'apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif',
                  fontWeight: 'bold',
                  color: 'white',
                }"
                aria-label="c key"
              >
                c
              </kbd>
            </span>
          </p>
          <TooltipArrow class="tooltip_arrowClass" :offset="10" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </div>
</template>
