import type { PropsWithChildren } from 'react'
import React from 'react'
import type { DocsContainerProps as BaseContainerProps } from '@storybook/blocks'
import { DocsContainer as BaseContainer } from '@storybook/blocks'
import { themes } from '@storybook/theming'
import { useDarkMode } from 'storybook-dark-mode'

export function DocsContainer(props: PropsWithChildren<BaseContainerProps>) {
  const dark = useDarkMode()
  return (
    <BaseContainer
      context={props.context}
      theme={dark ? themes.dark : themes.light}
    >
      {props.children}
    </BaseContainer>
  )
}
